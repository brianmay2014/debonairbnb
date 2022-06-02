from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Estate
from app.forms import EstateForm
from ..utils.geoutils import EstateLocationData

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<int:owner_id>/estates/<int:estate_id>/', methods=["DELETE"])
@login_required
def del_user_estate(owner_id, estate_id):
    """
    Deletes an estate from the database
    """
    estate = Estate.query.get(estate_id)
    db.session.delete(estate)
    db.session.commit()

    return f'estate number {estate_id} deleted';


@user_routes.route('/<int:id>/estates', methods=["POST"])
@login_required
def post_new_estate(id):
    """
    Creates a new estate
    """
    form = EstateForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # create a geolocation data from input string
        data = EstateLocationData.from_string(form.data['address'])
        # print('*-/*/-/*-*/-/-*/*/--/*-/**-/*-/*-//*-*/-')
        # print(isinstance(data, EstateLocationData))
        if not isinstance(data, EstateLocationData):
            return {'errors': data }
        else:

        # print('------==-=-=--==--=-==-=-=--==-=-=-=-=-=-=--==-=-=--==-=--=-=-=-==-=--=')
        # print(data)
        # print('------==-=-=--==--=-==-=-=--==-=-=-=-=-=-=--==-=-=--==-=--=-=-=-==-=--=')
            estate = Estate(
                title=form.data['title'],
                nightly_rate=form.data['nightly_rate'],
                type_id=form.data['type_id'],
                # type_id=5,
                description=form.data['description'],
                owner_id=form.data['owner_id'],
                # extract all the details from geolocation
                address=data.address,
                city=data.city,
                state=data.state,
                country=data.country,
                postal_code=data.postal_code,
                latitude=data.latitude,
                longitude=data.longitude
            )
            
            db.session.add(estate)
            db.session.commit()

            return estate.to_dict()
    else: 
    # print(form.errors)
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        return {'errors': form.errors}, 403


@user_routes.route('/<int:owner_id>/estates/<int:estate_id>', methods=["PATCH"])
@login_required
def patch_estate(owner_id, estate_id):
    """
    Edits an estate
    """
    estate = Estate.query.get(estate_id)
    if not estate:
        return {"errors": f"No estate with id {estate_id} exists"}, 404
    else:
        form = EstateForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        form['owner_id'].data = owner_id
        if form.validate_on_submit():
            # create a geolocation data from input string
            data = EstateLocationData.from_string(form.data['address'])
            if not isinstance(data, EstateLocationData):
                return {'errors': data }
            if not data.latitude:
                return {'errors': "geolocation failed"}, 403
            estate.address=data.address,
            estate.city=data.city,
            estate.state=data.state,
            estate.country=data.country,
            estate.postal_code=data.postal_code,
            estate.latitude=data.latitude,
            estate.longitude=data.longitude
            form.populate_obj(estate)       
            db.session.add(estate)
            db.session.commit()

            return estate.to_dict()
        # print(form.errors)
        # return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        return {'errors': form.errors}, 403


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
