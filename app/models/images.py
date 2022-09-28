from .db import db
from sqlalchemy.sql import func

# should only be three types of images for now. User, tweet, and comment

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(40), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey('tweets.id'))
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())

    user = db.relationship(
        'User', back_populates='user_images', foreign_keys=[user_id])

    tweet = db.relationship(
        'Tweet', back_populates='tweet_images', foreign_keys=[tweet_id])

    comment = db.relationship(
        'Comment', back_populates='comment_images', foreign_keys=[comment_id])

    @property
    def tweet_details(self):
        return self.to_dict()

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
        }
