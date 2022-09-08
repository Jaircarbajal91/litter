from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, Length


class CommentForm(FlaskForm):
  content = StringField('content', validators=[DataRequired(), Length(min=1, max=280)])
  user_id = IntegerField('user_id')
  tweet_it = IntegerField('tweet_id')
