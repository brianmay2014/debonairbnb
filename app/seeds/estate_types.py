from ..models import db, EstateType

estate_types = [
    "Castle",
    "Chateau",
    "Country House",
    "Historic",
    "Island",
    "Manor",
    "Mansion",
    "Palace",
    "Villa",
    "Vineyard",
]

def seed_estate_types():
    seeder = [EstateType.new(t) for t in estate_types]
    db.session.add_all(seeder)
    db.session.commit()

def undo_estate_types():
    db.session.execute('TRUNCATE estate_types RESTART IDENTITY CASCADE;')
    db.session.commit()
