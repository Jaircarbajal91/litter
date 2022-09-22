from .db import db
from flask_login import UserMixin
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Float, DateTime, Date
from app.models import User


class Comment(db.Model, UserMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(280), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey(
        'tweets.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=db.func.now(), onupdate=db.func.now())

    user = db.relationship(
        'User', back_populates='user_comments', foreign_keys=[user_id])

    tweet = db.relationship(
        'Tweet', back_populates='tweet_comments', foreign_keys=[tweet_id])

    # comment_likes = db.relationship('Like', back_populates='comment', cascade='all, delete')

    @property
    def tweet_details(self):
        return self.to_dict()


    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'tweet_id': self.tweet_id,
            'created_at': self.created_at
        }
