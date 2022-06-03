from operator import truediv
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from datetime import datetime

from app.models import Charter

def charter_exists_start(form, field):
  print('top of the -------------------')
  print('-*/-*/-*/-*/-beforeall charters*/-*/-*/')
  start_date = field.data

  all_charters = Charter.query.filter(Charter.estate_id == form.data['estate_id']).all()


  def charter_date_checker(start_date):
    for charter in all_charters:
      if charter.start_date <= start_date <= charter.end_date:
        print('-*/-*/-*/-*/-*/-*/-*/')
        print(charter)
        print('-*/-*/-*/-*/-*/-*/-*/')
        return True

    return False

  if charter_date_checker(start_date):
    print('-------failreure')
    raise ValidationError(f'Date range unavailable for this estate. Please choose another date range.')

def charter_exists_end(form, field):
  print('top of the -------------------')
  end_date = field.data

  print('-*/-*/-*/-*/-beforeall charters*/-*/-*/')
  all_charters = Charter.query.filter(Charter.estate_id == form.data['estate_id']).all()
  
  print('-*/-*/-*/-*/-*/-*/-*/')
  print(all_charters)
  print('-*/-*/-*/-*/-*/-*/-*/')

  def charter_date_checker(end_date):
    for charter in all_charters:
      if charter.start_date <= end_date <= charter.end_date:
        print('charter-id---------------',charter.id)
        return True

    return False

  if charter_date_checker(end_date):
    print('-------failreure')
    raise ValidationError('Date range unavailable for this estate. Please choose another date range.')


def charter_start_today_or_after(form, field):
  start_date = field.data
  today = datetime.now().date()


  if (start_date < today):
    raise ValidationError('Start date must be on or after today')
  # print('-*//*-/*-*-//*-/*-*/-/*-/*-*/-*/-*/-/*-/*-/*-/*-*/-*/-*/-/*-/*-*/-/*-/*-')
  # print(start_date)
  # print('type ^^', type(start_date))
  # print(today)
  # print('type ^^', type(today))

  # print('start <= today', start_date <= today)
  # print('start < today', start_date < today)
  # # print('start = today', start_date <= today)
  # print('-*//*-/*-*-//*-/*-*/-/*-/*-*/-*/-*/-/*-/*-/*-/*-*/-*/-*/-/*-/*-*/-/*-/*-')


class CharterForm(FlaskForm):
  user_id = IntegerField('user_id', validators=[DataRequired()])
  estate_id = IntegerField('estate_id', validators=[DataRequired()])
  guest_num = IntegerField('guest_num', validators=[DataRequired()])
  start_date = DateField('start_date', validators=[DataRequired(), charter_exists_start, charter_start_today_or_after])
  end_date = DateField('end_date', validators=[DataRequired(), charter_exists_end])
