import types
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms.critique_form import CritiqueForm
from app.models import db, Estate, EstateImage, Critique, EstateType
from app.forms import EstateForm
from ..utils.s3utils import  upload_file_to_s3, allowed_file, get_unique_filename
from ..utils.geoutils import EstateLocationData
from ..config import Config
from ..seeds.estate_types import estate_types

estate_routes = Blueprint('estates', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

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

@login_required
@estate_routes.route('/key')
def api():
    return Config.REACT_APP_GOOGLE_MAPS_API_KEY;


@estate_routes.route('/<int:id>/critiques')
@login_required
def critiques(id):
    estate = estate = Estate.query.get(id)
    if not estate:
        return {"errors": f"No estate with id {id} exists"}, 404
    else:
        critiques = estate.critiques
        return {"critiques" : [critique.to_dict() for critique in critiques]}

@estate_routes.route('/<int:id>/critiques', methods=["POST"])
@login_required
def post_critique(id):
    estate = Estate.query.get(id)
    if not estate:
        return {"errors": f"No estate with id {id} exists"}, 404
    else:
        form = CritiqueForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            critique = Critique()
            form.populate_obj(critique)
            db.session.add(critique)
            db.session.commit()
            estate = Estate.query.get(id)
            critiques = estate.critiques
            return {"critiques" : [critique.to_dict() for critique in critiques]}
        else:
            return {"errors": form.errors}, 403

@estate_routes.route('/<int:estate_id>/critiques/<int:critique_id>', methods=["PATCH"])
@login_required
def patch_critique(estate_id, critique_id):
    critique = Critique.query.get(critique_id)
    if not critique:
        return {"errors": f"No critique with id {critique_id} exists"}, 404
    else:
        form = CritiqueForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            # print(critique)
            # print(form.data)
            form.populate_obj(critique)
            # print(critique)
            db.session.add(critique)
            db.session.commit()
            estate = Estate.query.get(estate_id)
            critiques = estate.critiques
            return {"critiques" : [critique.to_dict() for critique in critiques]}
        else:
            # print(form.errors);
            return {"errors": form.errors}, 403

@estate_routes.route('/<int:estate_id>/critiques/<int:critique_id>', methods=["DELETE"])
@login_required
def delete_critique(estate_id, critique_id):
    critique = Critique.query.get(critique_id)
    if not critique:
        return {"errors": f"No critique with id {critique_id} exists"}, 404
    else:
        db.session.delete(critique)
        db.session.commit()
        estate = Estate.query.get(estate_id)
        critiques = estate.critiques
        return {"critiques" : [critique.to_dict() for critique in critiques]}

@estate_routes.route('/<int:estate_id>/images/<int:image_id>', methods=["DELETE"])
@login_required
def delete_image(estate_id, image_id):
    image = EstateImage.query.get(image_id)
    if not image:
        return {"errors": f"No image with id {image_id} exists"}, 404
    else:
        db.session.delete(image)
        db.session.commit()
        estates = Estate.query.all();
        return {"estates" : [estate.to_dict() for estate in estates]}


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
        # print(url)
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

@estate_routes.route('/types')
def estate_types():
    types = EstateType.query.all()
    return {'estate_types': [type.to_dict() for type in types]}


# @estate_routes.route('/new', methods=["POST"])
# @login_required
# def post_new_estate():
#     """
#     Creates a new estate
#     """
#     form = EstateForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         # create a geolocation data from input string
#         data = EstateLocationData.from_string(form.data['address'])
#         estate = Estate(
#             title=form.data['title'],
#             nightly_rate=form.data['nightly_rate'],
#             type_id=form.data['type_id'],
#             # type_id=5,
#             description=form.data['description'],
#             owner_id=form.data['owner_id'],
#             # extract all the details from geolocation
#             address=data.address,
#             city=data.city,
#             state=data.state,
#             country=data.country,
#             postal_code=data.postal_code,
#             latitude=data.latitude,
#             longitude=data.longitude
#         )

#         db.session.add(estate)
#         db.session.commit()

#         return estate.to_dict()
#     # print(form.errors)
#     # return {'errors': validation_errors_to_error_messages(form.errors)}, 401
#     return {'errors': 'woops'}, 401
