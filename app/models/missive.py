from ..models.db import db, auto_str
from .creation_mixin import CrUpMixin

@auto_str
class Missive(db.Model, CrUpMixin):
    __tablename__ = "missives"
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    seen = db.Column(db.Boolean, nullable=False)

    #relationships
    # belongs to one
    sender = db.relationship("User", backref="sent_missives", foreign_keys=[sender_id])
    recipient = db.relationship("User", backref="received_missives", foreign_keys=[recipient_id])
