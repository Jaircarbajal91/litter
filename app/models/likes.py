from .db import db
from flask_login import UserMixin

class Like(db.Model, UserMixin):
  __tablename__ = 'likes'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  tweet_id = db.Column(db.Integer, db.ForeignKey('tweets.id'))
#   comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
  created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())

  user = db.relationship(
        'User', back_populates='user_likes', foreign_keys=[user_id])

  tweet = db.relationship(
        'Tweet', back_populates='tweet_likes', foreign_keys=[tweet_id])

#   comment = db.relationship(
#         'Comment', back_populates='comment_likes', foreign_keys=[comment_id])


  @property
  def comment_details(self):
      return self.to_dict()


  def to_dict(self):
      return {
          'id': self.id,
          'user_id': self.user_id,
          'tweet_id': self.tweet_id,
      #     'comment_id': self.comment_id,
          'created_at': self.created_at
      }
