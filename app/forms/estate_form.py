from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Estate
from ..seeds.estate_types import estate_types


# def user_exists(form, field):
#     # Checking if user exists
#     email = field.data
#     user = User.query.filter(User.email == email).first()
#     if user:
#         raise ValidationError('Email address is already in use.')


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')


class EstateForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    nightlyRate = IntegerField('nightlyRate')
    type = SelectField('type', choices=estate_types)
    description = StringField('description')
    ownerId = IntegerField('ownerId', validators=[DataRequired()])

