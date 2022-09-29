from flask import Blueprint, request
from app.models import db, Image
from flask_login import current_user, login_required
from .s3_image_upload import (
    upload_file_to_s3, allowed_file, get_unique_filename)

image_routes = Blueprint("images", __name__)


@image_routes.route("/", methods=["POST"])
@image_routes.route("", methods=["POST"])
@login_required
def upload_image():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]
    type = request.form.get('type')

    data = request.json
    if not allowed_file(image.filename):
        return {"errors": f"file type not permitted {data}"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    if type == 'tweet':
      tweet_id = int(request.form.get('tweet_id'))
      new_image = Image(user=current_user, url=url, type=type, tweet_id=tweet_id)
      db.session.add(new_image)
      db.session.commit()
      return {"url": url}
    if type == 'comment':
      comment_id = int(request.form.get('comment_id'))
      new_image = Image(user=current_user, url=url, type=type, comment_id=comment_id)
      db.session.add(new_image)
      db.session.commit()
      return {"url": url}
    if type == 'user':
      user_id = int(request.form.get('user_id'))
      new_image = Image(user=current_user, url=url, type=type, user_id=user_id)
      db.session.add(new_image)
      db.session.commit()
      return {"url": url}
