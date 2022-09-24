from crypt import methods
from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import db, User
from .auth_routes import validation_errors_to_error_messages

follows_routes = Blueprint('follows', __name__)


@follows_routes.route('/<int:id>/', methods=["POST"])
@follows_routes.route('/<int:id>', methods=["POST"])
@login_required
def follow_user(id):
    user = User.query.get(int(id))

    if user:
        if user.id == current_user.id:
          return {'message': 'Cannot follow yourself'}, 400

        if current_user not in user.followers:
            user.followers.append(current_user)
            db.session.commit()
            return {'user': user.to_dict()}
        else:
          return {"message": "You already follow this user"}
    else:
        return {"error": "User not found"}, 400


@follows_routes.route('/unfollow/<int:id>/', methods=["POST"])
@follows_routes.route('/unfollow/<int:id>', methods=["POST"])
@login_required
def unfollow_user(id):
    user = User.query.get(int(id))

    if user:
      if user.id == current_user.id:
          return {'message': 'Cannot unfollow yourself'}, 400

      if current_user in user.followers:
        user.followers.remove(current_user)
        db.session.commit()
        return {'user': user.to_dict()}
      else:
          return {'message': 'You were not following this user'}, 400
    else:
        return {"error": "User not found"}, 400
