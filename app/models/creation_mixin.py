from datetime import datetime
from ..models.db import db

class CrUpMixin(object):
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
