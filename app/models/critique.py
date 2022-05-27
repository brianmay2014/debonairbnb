from ..models.db import db, auto_str

@auto_str
class Critique(db.Model):
    __tablename__ = "critiques"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    estate_id = db.Column(db.Integer, db.ForeignKey("estates.id"), nullable=False)
    rating = db.Column(db.Integer)
    comment = db.Column(db.Text, nullable=False)

    #relationships
    # belongs to 
    estate = db.relationship("Estate", back_populates="critiques")
    author = db.relationship("User", back_populates="critiques")
