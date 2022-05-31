from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, ValidationError

from app.models import Charter

def charter_exists_start(form, field):
  start_date = field.data
  charter = Charter.query.filter(Charter.start_date <= start_date <= Charter.end_date)

class CharterForm(FlaskForm):
  user_id = IntegerField('user_id', validators=[DataRequired()])
  estate_id = IntegerField('estate_id', validators=[DataRequired()])
  guest_num = IntegerField('guest_num', validators=[DataRequired()])
  start_date = DateField('start_date', validators=[DataRequired()])
  end_date = DateField('end_date', validators=[DataRequired()])
