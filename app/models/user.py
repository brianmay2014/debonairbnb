from .db import db
from .favourited_estate import favourited_estates
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    #relationships
    #has many
    estates = db.relationship("Estate", back_populates="owner")
    critiques = db.relationship("Critique", back_populates="author")
    charters = db.relationship("Charter", back_populates="user")
    # sent_missives = db.relationship("Missive", back_populates="sender")
    # received_missives = db.relationship("Missive", back_populates="recipient")

    # many to many
    favourites = db.relationship("Estate", back_populates="fans", secondary=favourited_estates)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
