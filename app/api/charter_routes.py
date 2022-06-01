from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Charter
from app.forms import CharterForm


charter_routes = Blueprint('charters', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


@charter_routes.route('/')
@login_required
def charters():
    all_charters = Charter.query.all()

    return {'charters': [charter.to_dict() for charter in all_charters]}


@charter_routes.route('/', methods=['POST'])
@login_required
def charter_form_submit():
    form = CharterForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    params = {
        "user_id": form.data['user_id'],
        "estate_id": form.data['estate_id'],
        "guest_num": form.data['guest_num'],
        "start_date": form.data['start_date'],
        "end_date": form.data['end_date']
    }

    if form.validate_on_submit():
        charter = Charter(**params)
        db.session.add(charter)
        db.session.commit()
        return charter.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@charter_routes.route('/<int:id>', methods=["PATCH"])
@login_required
def charter_update(id):
    charter = Charter.query.get(id)
    form = CharterForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    params = {
        "user_id": form.data['user_id'],
        "estate_id": form.data['estate_id'],
        "guest_num": form.data['guest_num'],
        "start_date": form.data['start_date'],
        "end_date": form.data['end_date']
    }

    if form.validate_on_submit():
      charter.user_id = form.data['user_id']
      charter.estate_id = form.data['estate_id']
      charter.guest_num = form.data['guest_num']
      charter.start_date = form.data['start_date']
      charter.end_date = form.data['end_date']
      db.session.commit()
      return charter.to_dict()
    else:
      print(form.errors)
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401
