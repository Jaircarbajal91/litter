from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo', email='demo@aa.io', first_name='Demo', last_name='User',  password='password', profile_image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661910820/litter-twitter/VIER_20PFOTEN_2016-07-08_011-4993x3455-1920x1329_ri4djn.jpg')
    marnie = User(
        username='marnie', email='marnie@aa.io',first_name='Marnie', last_name='Cat', password='password', profile_image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661911946/litter-twitter/kitten-510651_drjtik.jpg')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', first_name='Bobbie', last_name='Kitty', password='password', profile_image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661911991/litter-twitter/GettyImages-1175550351_scmi8q.jpg')
    smokey = User(
        username='smokey', email='smokey@cat.cat', first_name='Smokey', last_name='Cat', password='password', profile_image="https://res.cloudinary.com/dvkihdv0n/image/upload/v1661911772/litter-twitter/IMG_3343_jegahi.jpg")
    boba = User(
        username='boba', email='boba@cat.cat', first_name='Boba', last_name='Cat', password='password', profile_image='https://res.cloudinary.com/dvkihdv0n/image/upload/v1661911888/litter-twitter/IMG_3481_ardwaa.jpg')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(smokey)
    db.session.add(boba)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
