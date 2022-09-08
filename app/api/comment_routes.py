from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Tweet, db, User, Comment
from app.forms import CommentForm
from .auth_routes import validation_errors_to_error_messages


comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/')
@comment_routes.route('')
@login_required
def get_all_comments():
    comments = Comment.query.all()
    result = [comment.to_dict() for comment in comments]
    return {"comments": result}


#id is for tweet
@comment_routes.route('/<int:id>/', methods=['POST'])
@comment_routes.route('/<int:id>', methods=['POST'])
@login_required
def post_new_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            content=form.data['content'],
            user_id=int(current_user.get_id()),
            tweet_id=int(id)
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400



@comment_routes.route('/<int:id>/', methods=['PUT'])
@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_comment(id):
    comment = Comment.query.get(id)
    if comment is not None:
        comment_dict = comment.to_dict()
        if comment_dict['user_id'] != int(current_user.get_id()):
            return {'errors': 'You are unauthorized to update this comment'}, 403
        else:
            user = User.query.filter(User.id == comment_dict["user_id"]).first()
            form = CommentForm()
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                comment.content = form.data["content"]
                result = comment.to_dict()
                result["user"] = user.to_dict()
                db.session.commit()
                return result
            return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    else:
        return {'errors': 'Tweet not found'}, 404


@comment_routes.route('/<int:id>/', methods=['DELETE'])
@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    if comment is not None:
        comment_dict = comment.to_dict()
        if comment_dict['user_id'] != int(current_user.get_id()):
            return {'errors': 'You are unauthorized to delete this comment'}, 403
        else:
            form = CommentForm()
            form['csrf_token'].data = request.cookies['csrf_token']
            db.session.delete(comment)
            db.session.commit()
            return {"message": "Comment successfully deleted"}
    return {'errors': 'Tweet not found'}, 404
