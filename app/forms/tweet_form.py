from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, Length


class TweetForm(FlaskForm):
  content = StringField('content', validators=[DataRequired(), Length(min=1, max=280)])
  user_id = IntegerField('user_id')
  created_at = DateTimeField('create_at')
  updated_at = DateTimeField('updated_at')
