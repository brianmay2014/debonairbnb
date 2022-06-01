from ..models import db, Charter
import datetime

charters = [
    {
        "user_id": 1,
        "estate_id": 1,
        "guest_num": 5,
        "start_date": datetime.date(2022, 6, 5),
        "end_date": datetime.date(2022, 6, 12)
    },
    {
        "user_id": 2,
        "estate_id": 1,
        "guest_num": 2,
        "start_date": datetime.date(2022, 6, 13),
        "end_date": datetime.date(2022, 6, 20)
    },
    {
        "user_id": 3,
        "estate_id": 1,
        "guest_num": 10,
        "start_date": datetime.date(2022, 6, 21),
        "end_date": datetime.date(2022, 6, 28)
    },
        {
        "user_id": 4,
        "estate_id": 1,
        "guest_num": 3,
        "start_date": datetime.date(2022, 7, 1),
        "end_date": datetime.date(2022, 7, 15)
    },
        {
        "user_id": 1,
        "estate_id": 2,
        "guest_num": 4,
        "start_date": datetime.date(2022, 6, 21),
        "end_date": datetime.date(2022, 6, 28)
    }
]


def seed_charters():
    seeder = [Charter.seed(charter) for charter in charters]
    db.session.add_all(seeder)
    db.session.commit()


def undo_charters():
    db.session.execute('TRUNCATE estates RESTART IDENTITY CASCADE;')
    db.session.commit()
