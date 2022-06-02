from wtforms.validators import ValidationError
from ..models import User, Estate


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email provided not found.')

def estate_exists(form, field):
    # Checking if user exists
    id = field.data
    estate = Estate.query.get(id)
    if not estate:
        raise ValidationError('Estate does not exist.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')

def nightly_rate_enough(form, field):
    # Ensuring nightly_rate is over $300
    nightly_rate = field.data
    if nightly_rate < 300:
        raise ValidationError('Nightly Rate must be over $300')