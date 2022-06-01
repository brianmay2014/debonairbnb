from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Charter
from app.forms import CharterForm



charter_routes = Blueprint('charters', __name__)

@charter_routes.route('/')
@login_required
def charters():
  all_charters = Charter.query.all()
  print(all_charters, "==================")
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
    print(form.errors, 'ERROR')
