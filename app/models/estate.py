from ..models.db import db, auto_str
from statistics import mean
from .favourited_estate import favourited_estates
from ..utils.geoutils import EstateLocationData

@auto_str
class Estate(db.Model):
    __tablename__ = "estates"
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    address = db.Column(db.Text)
    city = db.Column(db.String(100))
    state = db.Column(db.String(100))
    country = db.Column(db.String(100))
    postal_code = db.Column(db.String(100))
    latitude = db.Column(db.Float(precision=32), nullable=False)
    longitude = db.Column(db.Float(precision=32), nullable=False)
    nightly_rate= db.Column(db.Integer)
    type_id = db.Column(db.Integer, db.ForeignKey("estate_types.id"))

    #relationships
    # belongs to one
    owner = db.relationship("User", back_populates="estates", lazy="joined")
    type = db.relationship("EstateType", back_populates="estates", lazy="joined")

    # has many
    images = db.relationship("EstateImage", back_populates="estate", cascade="all, delete-orphan", lazy="joined")
    critiques = db.relationship("Critique", back_populates="estate", cascade="all, delete-orphan", lazy="joined")
    charters = db.relationship("Charter", back_populates="estate", cascade="all, delete-orphan")

    #many to many
    fans = db.relationship("User", back_populates="favourites", secondary=favourited_estates)

    @property
    def rating(self):
        ratings =  [critique.rating for critique in self.critiques if getattr(critique, "rating", None) is not None]
        if not ratings:
            return None
        else:
            return mean(ratings)

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'title': self.title,
            'description': self.description,
            'nightly_rate': self.nightly_rate,
            'type_id' : self.type_id,
            'type': self.type.name,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'postal_code': self.postal_code,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'critique_ids': [critique.id for critique in self.critiques],
            'image_ids': [image.id for image in self.images],
            'images': self.images,
            'rating': self.rating,
        }


    @staticmethod
    def seed(estate_data):
        data = EstateLocationData.from_string(estate_data.get("address"))
        estate = Estate()
        estate.owner_id = estate_data.get("owner_id")
        estate.title = estate_data.get("title")
        estate.description = estate_data.get("description")
        estate.nightly_rate = estate_data.get("nightly_rate")
        estate.type_id = estate_data.get("type_id")

        estate.address = data.address
        estate.city = data.city
        estate.state = data.state
        estate.country = data.country
        estate.postal_code = data.postal_code
        estate.latitude = data.latitude
        estate.longitude = data.longitude
        return estate
