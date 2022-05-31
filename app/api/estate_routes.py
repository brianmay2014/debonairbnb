from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms.critique_form import CritiqueForm
from app.models import db, Estate, EstateImage, Critique
from ..utils.s3utils import  upload_file_to_s3, allowed_file, get_unique_filename

estate_routes = Blueprint('estates', __name__)


@estate_routes.route('/')
def estates():
    all_estates = Estate.query.all()
    return {'estates': [estate.to_dict() for estate in all_estates]}

# @estate_routes.route('/<int:id>/critiques')
# def critiques(id):
#     estate = estate = Estate.query.get(id)
#     if not estate:
#         return {"errors": f"No estate with id {id} exists"}, 404
#     else:
#         critiques = estate.critiques
#         return [critique.to_dict() for critique in critiques]

@estate_routes.route('/<int:id>/critiques')
def critiques(id):
    estate = estate = Estate.query.get(id)
    if not estate:
        return {"errors": f"No estate with id {id} exists"}, 404
    else:
        critiques = estate.critiques
        print ("hello")
        print (critiques);
        return {"critiques" : [critique.to_dict() for critique in critiques]}

@estate_routes.route('/<int:id>/critiques', methods=["POST"])
def post_critique(id):
    estate = estate = Estate.query.get(id)
    if not estate:
        return {"errors": f"No estate with id {id} exists"}, 404
    else:
        form = CritiqueForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            critique = Critique()
            form.populate_obj(Critique)
            db.session.add(critique)
            db.session.commit()
            return critique.to_dict()
        else:
            return form.errors, 400


@estate_routes.route('/<int:id>', methods=["PATCH"])
@login_required
def estate_create_or_update(id):
    estate = Estate.query.get(id)
    if not estate:
        return {"errors": "No estate"}, 404
    if "image" in request.files:
        image = request.files["image"]
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            # then the upload le failed, oh no!
            return upload, 400
        url = upload["url"]
        print(url)
        new_image = EstateImage(estate=estate, title=estate.title, url=url)
        db.session.add(new_image)
        db.session.commit()
    db.session.add(estate)
    db.session.commit()
    estate = Estate.query.get(id)
    return estate.to_dict();



@estate_routes.route('/<int:id>')
@login_required
def estate(id):
    estate = Estate.query.get(id)
    return estate.to_dict()
