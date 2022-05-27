from ..models.db import db, auto_str

@auto_str
class EstateType(db.Model):
    __tablename__ = "estate_types"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    #relationships
    #has many
    estates = db.relationship("Estate", back_populates="type")

    @staticmethod
    def new(type):
        return EstateType(name=type)
