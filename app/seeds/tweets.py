from app.models import db, Tweet

def seed_tweets():
    t1 = Tweet(content="I'm just a demo user", user_id=1)
    t2 = Tweet(content="Boy, there sure are a lot of cats here!", user_id=1)
    t3 = Tweet(content="Cats are always nice and never not nice", user_id=1)
    t4 = Tweet(content="I don't know why my master named me Demo", user_id=1)
    t5 = Tweet(content="I'm just here for the cuddles.", user_id=1)
    t6 = Tweet(content="Marnie was my grandpa's name too!", user_id=2)
    t7 = Tweet(content="There's a poop in your shoe and I want you to try to guess which one of us did it?", user_id=2)
    t8 = Tweet(content="It's been exactly 13 minutes since I was last fed. I can feel the icy grip of death.", user_id=2)
    t9 = Tweet(content="You didn't HAVE to pay all that money for a new bed I won't use. I did say the small piece of paper on the table was fine…", user_id=2)
    t10 = Tweet(content="I am standing on your face because it's time to wake up and feed me!", user_id=2)
    t11 = Tweet(content="Since you are a despicable hunter, I have left a bird on your pillow. And don't worry, I took the liberty of killing it for you.", user_id=3)
    t12 = Tweet(content="I can't believe I'm STILL awake! I've been up for 20 minutes today.", user_id=3)
    t13 = Tweet(content="I absolutely will not let you put me in the bath, what kind of monster are you!?", user_id=3)
    t14 = Tweet(content="Hello, I am very pleased to see you, allow me to give you a front row view of my butt!", user_id=3)
    t15 = Tweet(content="No, you're not allowed to walk there!", user_id=3)
    t16 = Tweet(content="How dare you exist Boba.", user_id=4)
    t17 = Tweet(content="I left a present for you on your bed. Sorry, not sorry.", user_id=4)
    t18 = Tweet(content="Meow, mom! Meow, hey mom! Meoowwwwmmm! MOOMMM!!", user_id=4)
    t19 = Tweet(content="I only cuddle on my terms.", user_id=4)
    t20 = Tweet(content="Boba is the worst!", user_id=4)
    t21 = Tweet(content="I'm so hungry, I can eat all the wires in the house!", user_id=5)
    t22 = Tweet(content="I know it's 2am, but ZOOM ZOOM!", user_id=5)
    t23 = Tweet(content="Ahhhhh!! Don't sneeze like that!", user_id=5)
    t24 = Tweet(content="I love Smokey, but she wants nothing to do with me </3", user_id=5)
    t25 = Tweet(content="I know I just used the litter box, but I just love your pillow.", user_id=5)


    db.session.add(t1)
    db.session.add(t2)
    db.session.add(t3)
    db.session.add(t4)
    db.session.add(t5)
    db.session.add(t6)
    db.session.add(t7)
    db.session.add(t8)
    db.session.add(t9)
    db.session.add(t10)
    db.session.add(t11)
    db.session.add(t12)
    db.session.add(t13)
    db.session.add(t14)
    db.session.add(t15)
    db.session.add(t16)
    db.session.add(t17)
    db.session.add(t18)
    db.session.add(t19)
    db.session.add(t20)
    db.session.add(t21)
    db.session.add(t22)
    db.session.add(t23)
    db.session.add(t24)
    db.session.add(t25)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tweets():
    db.session.execute('TRUNCATE tweets RESTART IDENTITY CASCADE;')
    db.session.commit()
