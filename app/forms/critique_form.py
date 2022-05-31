from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, NumberRange
from app.models import Estate, Critique
from .custom_validators import user_exists, estate_exists

class CritiqueForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired(), estate_exists])
    estate_id = IntegerField('estate_id', validators=[DataRequired(), estate_exists])
    comment = TextAreaField('comment', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired(), NumberRange(1,5)])
