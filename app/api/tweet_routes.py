from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

tweet_routes = Blueprint('tweets', __name__)
