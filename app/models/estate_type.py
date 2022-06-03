from ..models.db import db, auto_str
from .creation_mixin import CrUpMixin

@auto_str
class EstateType(db.Model, CrUpMixin):
    __tablename__ = "estate_types"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    #relationships
    #has many
    estates = db.relationship("Estate", back_populates="type", lazy='joined')

    @staticmethod
    def new(type):
        return EstateType(name=type)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "estate_ids": [estate.id for estate in self.estates]
        }
