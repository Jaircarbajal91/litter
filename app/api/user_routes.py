from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Tweet
from .auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<path:username>')
@user_routes.route('/<path:username>/')
@login_required
def get_all_user_tweets(username):
    user = User.query.filter(User.username == username).first()
    if user:
        id = user.to_dict()["id"]
        tweets = Tweet.query.filter(Tweet.user_id == id).all()
        result = [tweet.to_dict() for tweet in tweets]
        return {'tweets': result}
    return {"error": "username not found"}, 404


@user_routes.route('/home')
@user_routes.route('/home/')
def get_all_tweets():
    tweets = Tweet.query.all()
    result = [tweet.to_dict() for tweet in tweets]
    return {'tweets': result}
