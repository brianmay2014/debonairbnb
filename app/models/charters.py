from ..models.db import db, auto_str

@auto_str
class Charter(db.Model):
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
