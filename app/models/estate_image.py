from ..models.db import db, auto_str

@auto_str
class EstateImage(db.Model):
    __tablename__ = "estate_images"
    id = db.Column(db.Integer, primary_key=True)
    estate_id = db.Column(db.Integer, db.ForeignKey("estates.id"), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(100))

    #relationships
    # belongs to one
    estate = db.relationship("Estate", back_populates="images")

    def to_dict(self):
        return {
            "id": self.id,
            "estate_id": self.estate_id,
            "url": self.url,
            "title": self.title,
        }

    @staticmethod
    def seed(data):
        return EstateImage(
            estate_id=data.get("estate_id"),
            url=data.get("url"),
            title=data.get("title"),
        )