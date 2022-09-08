from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Tweet, db, User, Comment
from app.forms import TweetForm
from .auth_routes import validation_errors_to_error_messages


comment_routes = Blueprint('comments', __name__)


# @comment_routes.route()
