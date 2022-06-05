from ..models.db import db, auto_str
from .creation_mixin import CrUpMixin

@auto_str
class Charter(db.Model, CrUpMixin):
    __tablename__ = "charters"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    estate_id = db.Column(db.Integer, db.ForeignKey("estates.id"), nullable=False)
    guest_num = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)


    #relationships
    # belongs to
    estate = db.relationship("Estate", back_populates="charters")
    user = db.relationship("User", back_populates="charters")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'estate_id': self.estate_id,
            'guest_num': self.guest_num,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    @staticmethod
    def seed(charter_data):
        charter = Charter()
        charter.user_id = charter_data.get("user_id")
        charter.estate_id = charter_data.get("estate_id")
        charter.guest_num = charter_data.get("guest_num")
        charter.start_date = charter_data.get("start_date")
        charter.end_date = charter_data.get("end_date")


        return charter
