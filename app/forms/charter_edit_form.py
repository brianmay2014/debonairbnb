from operator import truediv
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from datetime import datetime

from app.models import Charter, Estate

def get_charters( data ):
  all_charters = Estate.query.get(data['estate_id']).charters

  return [charter for charter in all_charters if charter.id is not data.get('charter_id')]

def charter_exists_start(form, field):
  start_date = field.data

  all_charters = get_charters(form.data)

  def charter_date_checker(start_date):
    for charter in all_charters:
      if charter.start_date <= start_date <= charter.end_date:
        return True

    return False

  if charter_date_checker(start_date):
    raise ValidationError('Date range unavailable for this estate. Please choose another date range.')

def charter_exists_end(form, field):
  end_date = field.data
  all_charters = get_charters(form.data)

  def charter_date_checker(end_date):
    for charter in all_charters:
      if charter.start_date <= end_date <= charter.end_date:
        # print
        return True

    return False

  if charter_date_checker(end_date):
    raise ValidationError('Date range unavailable for this estate. Please choose another date range.')

class CharterEditForm(FlaskForm):
  user_id = IntegerField('user_id', validators=[DataRequired()])
  estate_id = IntegerField('estate_id', validators=[DataRequired()])
  guest_num = IntegerField('guest_num', validators=[DataRequired()])
  start_date = DateField('start_date', validators=[DataRequired(), charter_exists_start])
  end_date = DateField('end_date', validators=[DataRequired(), charter_exists_end])
  charter_id = IntegerField('charter_id')

