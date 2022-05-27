from ..models.db import db, auto_str

@auto_str
class Missive(db.Model):
    __tablename__ = "missives"
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    seen = db.Column(db.Boolean, nullable=False)

    #relationships
    # belongs to one
    sender = db.relationship("User", back_populates="sent_missives")
    recipient = db.relationship("User", back_populates="received_missives")
