from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Tweet, comments, db, User, Comment, Like
from app.forms import TweetForm
from .auth_routes import validation_errors_to_error_messages


tweet_routes = Blueprint('tweets', __name__)


@tweet_routes.route('/<path:username>/')
@tweet_routes.route('/<path:username>')
@login_required
def get_all_user_tweets(username):
    user = User.query.filter(User.username == username).first()
    if user:
        id = user.to_dict()["id"]
        tweets = Tweet.query.filter(Tweet.user_id == id).all()
        tweets_details = []
        if tweets is not None and len(tweets) > 0:
            for tweet in tweets:
                user = tweet.user.to_dict()
                tweet = tweet.to_dict()
                tweet['user'] = user
                # comments = Comment.query.filter(Comment.tweet_id == tweet["id"]).all()
                # if comments is not None and len(comments) > 0:
                #     comments_result = [comment.to_dict() for comment in comments]
                #     tweet["comments"] = comments_result
                # else:
                #     tweet["comments"] = []
                tweets_details.append(tweet)
        return {'tweets': tweets_details}
    return {"error": "username not found"}, 404


@tweet_routes.route('/home/')
@tweet_routes.route('/home')
@login_required
def get_all_tweets():
    tweets = db.session.query(Tweet) \
        .options(db.joinedload(Tweet.user)).all()
    if tweets is not None and len(tweets) > 0:
        tweets_details = []
        for tweet in tweets:
            user = tweet.user.to_dict()
            tweet = tweet.to_dict()
            tweet['user'] = user
            # comments = Comment.query.filter(Comment.tweet_id == tweet["id"]).all()
            # if comments is not None and len(comments) > 0:
            #     comments_result = [comment.to_dict() for comment in comments]
            #     tweet["comments"] = comments_result
            # else:
            #     tweet["comments"] = []
            tweets_details.append(tweet)
    return {'tweets': tweets_details}


@tweet_routes.route('/', methods=['POST'])
@tweet_routes.route('', methods=['POST'])
@login_required
def post_new_tweet():
    form = TweetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_tweet = Tweet(
            content=form.data['content'],
            user_id=int(current_user.get_id())
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
            user = User.query.filter(User.id == tweet_dict["user_id"]).first()
            comments = Comment.query.filter(Comment.tweet_id == tweet_dict["id"]).all()
            form = TweetForm()
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                tweet.content = form.data["content"]
                result = tweet.to_dict()
                result["user"] = user.to_dict()
                if comments is not None and len(comments) > 0:
                    comments_result = [comment.to_dict() for comment in comments]
                    result["comments"] = comments_result
                else:
                    result["comments"] = []
                db.session.commit()
                return result
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


@tweet_routes.route('/<int:id>/like/', methods=['POST'])
@tweet_routes.route('/<int:id>/like', methods=['POST'])
def like_tweet(id):
    tweet = Tweet.query.get(id)
    if tweet is not None:
        tweet_dict = tweet.to_dict()
        likes_list = tweet_dict["tweet_likes"]
        user_likes = [x for x in likes_list if x["user_id"] == int(current_user.get_id())]
        if len(user_likes) > 0:
            return {"message": "Cannot like a tweet more than once"}, 400
        new_like = Like(
            user_id = int(current_user.get_id()),
            tweet_id = id
        )
        db.session.add(new_like)
        db.session.commit()
        return new_like.to_dict()
    else:
        return {"message": "Tweet does not exist"}, 404
