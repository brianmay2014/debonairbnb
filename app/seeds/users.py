from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demopatron', email='demo@demo.com', password='password')
        #firstName='Demonstration', lastName='Patron', bio='May I act as a demonstration of the extravagancies contained inside debonairbnb.com'
    amancio = User(
        username='zaraman', email='amancio@zara.com', password='password')
        #firstName='Amancio', lastName='Ortega', bio='I just want to see the closets'

    andrew = User(
        username='downunderminer', email='andrew@google.com', password='password')
        #firstName='Andrew', lastName='Forrest', bio='Just trying to relax when I can'

    jerrey = User(
        username='jerreybez', email='jerrey@amazon.com', password='password')
        #firstName='Jerrey', lastName='Bezos', bio='Always in my brother's shadow'

    db.session.add(demo)
    db.session.add(amancio)
    db.session.add(andrew)
    db.session.add(jerrey)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
