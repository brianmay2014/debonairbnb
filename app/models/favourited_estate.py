from .db import db

favourited_estates = db.Table(
    "favourited_estates",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("estate_id", db.Integer, db.ForeignKey("estates.id"), primary_key=True),
)
