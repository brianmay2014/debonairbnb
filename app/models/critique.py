from ..models.db import db, auto_str
from .creation_mixin import CrUpMixin

@auto_str
class Critique(db.Model, CrUpMixin):
    __tablename__ = "critiques"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    estate_id = db.Column(db.Integer, db.ForeignKey("estates.id"), nullable=False)
    rating = db.Column(db.Integer)
    comment = db.Column(db.Text, nullable=False)

    #relationships
    # belongs to
    estate = db.relationship("Estate", back_populates="critiques")
    author = db.relationship("User", back_populates="critiques", lazy="joined")

    @staticmethod
    def seed(data):
        return Critique(
            user_id=data.get("user_id"),
            estate_id=data.get("estate_id"),
            rating=data.get("rating"),
            comment=data.get("comment"),
        )

    def to_dict(self):
        return {
            "id" : self.id,
            "user_id" : self.user_id,
            "username": self.author.username,
            "estate_id" : self.estate_id,
            "rating" : self.rating,
            "comment" : self.comment,
            "created_at" : self.created_at.timestamp(),
            "updated_at" : self.updated_at.timestamp(),
        }
