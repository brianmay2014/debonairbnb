from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import db, Estate, EstateType
from ..seeds.estate_types import estate_types
from .custom_validators import nightly_rate_enough


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')

#query all for estate types, choices are the tuples

# test = Estate.query.all()
# print('-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/')
# print(types)
# print('-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/-*/')
# test = EstateType()

class EstateForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    nightly_rate = IntegerField('nightly_rate', validators=[DataRequired(), nightly_rate_enough])
    type_id = IntegerField('type_id', validators=[DataRequired()])
    # type_id = SelectField('type_id', choices=[], validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    owner_id = IntegerField('owner_id', validators=[DataRequired()])

