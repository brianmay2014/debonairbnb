from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Estate, EstateImage
from ..utils.s3utils import  upload_file_to_s3, allowed_file, get_unique_filename

estate_routes = Blueprint('estates', __name__)


@estate_routes.route('/')
def estates():
    all_estates = Estate.query.all()
    return {'estates': [estate.to_dict() for estate in all_estates]}

@estate_routes.route('/<int:id>/images', methods=["POST"])
@login_required
def post_image(id):
    if "image" not in request.files:
        return {"errors": "image required"}, 400
    image = request.files["image"]
    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400
    estate = Estate.query.get(id)
    if not estate:
        return {"errors": "cannot add images to an estate that doesn't exist!"}, 404

    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # then the upload le failed, oh no!
        return upload, 400

    url = upload["url"]
    new = EstateImage(estate=estate, title=request.title)
    db.session.add(new)
    db.session.commit()
    return {"url": url}


@estate_routes.route('/<int:id>')
@login_required
def estate(id):
    user = Estate.query.get(id)
    return Estate.to_dict()
