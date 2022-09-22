from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Tweet, comments, db, User, Comment, Like
from .auth_routes import validation_errors_to_error_messages

tweet_like_routes = Blueprint('likes', __name__)

@tweet_like_routes.route('/<int:id>/', methods=['DELETE'])
@tweet_like_routes.route('/<int:id>', methods=['DELETE'])
def delete_like(id):
    like = Like.query.get(id)
    if like is not None:
        like_dict = like.to_dict()
        if (like_dict['user_id'] == int(current_user.get_id())):
            db.session.delete(like)
            db.session.commit()
            return {"message": "Like has been successfully deleted"}
        else:
            return {"message": "You are not the owner of this like."}
    else:
        return {"message": "Like does not exist"}, 404
