import os

print(__name__)

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
    # (only 'postgresql') but heroku's postgres add-on automatically sets the
    # url in the hidden config vars to start with postgres.
    # so the connection uri must be updated here
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL').replace('postgres://', 'postgresql://')
    SQLALCHEMY_ECHO = True
    GOOGLE_MAPS_API_KEY = os.environ.get('GOOGLE_MAPS_API_KEY')
    AWS_S3_ACCESS_KEY = os.environ.get('AWS_S3_ACCESS_KEY')
    AWS_S3_SECRET_ACCESS_KEY = os.environ.get('AWS_S3_SECRET_ACCESS_KEY')
    AWS_S3_BUCKET =  os.environ.get('AWS_S3_BUCKET')
