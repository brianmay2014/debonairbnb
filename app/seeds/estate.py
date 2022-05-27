from ..models import db, Estate

estates = [
    {
        "address": "19 skyline dr bolton landing ny 12814",
        "owner_id": 1,
        "title": "Highlands Castle",
        "nightly_rate": 8295,
        "type_id": 1,
        "description": "Poised on a graceful mountaintop overlooking majestic Lake George, your castle awaits... From the moment you arrive, you'll sense the tranquility that surrounds this enchanting property and you’ll be captivated by the most spectacular view in the world! The intrigue and allure of the castle are matched only by the breathtaking vista",
    },
    {
        "address": "1803 travis dr leander tx 78645",
        "owner_id": 2,
        "title": "Lago Castille",
        "nightly_rate": 5491,
        "type_id": 1,
        "description": "The Above Lago Castille an estate of gorgeous French Provencal architecture with touches of Mediterranean is stunning from the front gates down to the private dock. The home sits amongst unrivaled landscaping and unmatched views. of Lake Travis.",
    },
]

def seed_estates():
    seeder = [Estate.seed(estate) for estate in estates]
    db.session.add_all(seeder)
    db.session.commit()

def undo_estates():
    db.session.execute('TRUNCATE estates RESTART IDENTITY CASCADE;')
    db.session.commit()
