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
    owner = db.relationship("User", back_populates="estates")
    type = db.relationship("EstateType", back_populates="estates")

    # has many
    images = db.relationship("EstateImage", back_populates="estate", cascade="all, delete-orphan")
    critiques = db.relationship("Critique", back_populates="estate", cascade="all, delete-orphan")
    charters = db.relationship("Charter", back_populates="estate", cascade="all, delete-orphan")

    #many to many
    fans = db.relationship("User", back_populates="favourites", secondary=favourited_estates)

    @property
    def rating(self):
        return mean(
            [critique.rating for critique in self.critiques if critique.getattr("rating", None) is not None]
        )

    @staticmethod
    def seed(estate_data):
        print(estate_data)
        print(estate_data.get("address"));
        data = EstateLocationData.from_string(estate_data.get("address"))
        print(data);
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
