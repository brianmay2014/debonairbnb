from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Charter
from app.forms import CharterForm


charter_routes = Blueprint('charters', __name__)

@charter_routes.route('', methods=['POST'])
@login_required
def charter():
  print(request, "====================")
