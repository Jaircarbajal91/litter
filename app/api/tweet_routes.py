from crypt import methods
from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Tweet, db, User
from app.forms import TweetForm
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime, timezone
from tzlocal import get_localzone


today = datetime.now(timezone.utc)

tweet_routes = Blueprint('tweets', __name__)


@tweet_routes.route('/<path:username>/')
@tweet_routes.route('/<path:username>')
@login_required
def get_all_user_tweets(username):
    user = User.query.filter(User.username == username).first()
    if user:
        id = user.to_dict()["id"]
        tweets = Tweet.query.filter(Tweet.user_id == id).all()
        result = [tweet.to_dict() for tweet in tweets]
        return {'tweets': result}
    return {"error": "username not found"}, 404


@tweet_routes.route('/home/')
@tweet_routes.route('/home')
@login_required
def get_all_tweets():
    tweets = Tweet.query.all()
    result = [tweet.to_dict() for tweet in tweets]
    return {'tweets': result}



@tweet_routes.route('/', methods=['POST'])
@tweet_routes.route('', methods=['POST'])
@login_required
def post_new_tweet():
    form = TweetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_tweet = Tweet(
            content=form.data['content'],
            user_id=int(current_user.get_id()),
            created_at=today.astimezone(get_localzone()),
            updated_at=today.astimezone(get_localzone())
        )
        db.session.add(new_tweet)
        db.session.commit()
        return new_tweet.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@tweet_routes.route('/<int:id>/', methods=['PUT'])
@tweet_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_tweet(id):
    tweet = Tweet.query.get(id)
    if tweet is not None:
        tweet_dict = tweet.to_dict()
        if tweet_dict['user_id'] != int(current_user.get_id()):
            return {'errors': 'You are unauthorized to update this tweet'}, 403
        else:
            form = TweetForm()
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                tweet.content = form.data["content"]
                tweet.updated_at = today.astimezone(get_localzone())
                db.session.commit()
                return tweet.to_dict()
            return {'errors': validation_errors_to_error_messages(form.errors)}, 400
    else:
        return {'errors': 'Tweet not found'}, 404


@tweet_routes.route('/<int:id>/', methods=['DELETE'])
@tweet_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_tweet(id):
  tweet = Tweet.query.get(id)
  if tweet is not None:
    tweet_dict = tweet.to_dict()
    if tweet_dict['user_id'] != int(current_user.get_id()):
            return {'errors': 'You are unauthorized to delete this tweet'}, 403
    else:
      form = TweetForm()
      form['csrf_token'].data = request.cookies['csrf_token']
      db.session.delete(tweet)
      db.session.commit()
      return {"message": "Tweet successfully deleted"}
  return {'errors': 'Tweet not found'}, 404
