from app.models import db, Comment

def seed_comments():
  c1 = Comment(content="I'm just a demo user", user_id=1, tweet_id=1)
  c2 = Comment(content="Meow meow! I heard you had food!", user_id=1, tweet_id=2)
  c3 = Comment(content="You better not be a dog!", user_id=2, tweet_id=2)
  c4 = Comment(content="I prefer wet food", user_id=2, tweet_id=3)
  c5 = Comment(content="Portugal the man is a cool band. Meow!", user_id=3, tweet_id=3)
  c6 = Comment(content="I'm just a demo user", user_id=3, tweet_id=1)
  c7 = Comment(content="Meow meow! I heard you had food!", user_id=4, tweet_id=2)
  c8 = Comment(content="You better not be a dog!", user_id=4, tweet_id=2)
  c9 = Comment(content="I prefer wet food", user_id=4, tweet_id=3)
  c10 = Comment(content="Portugal the man is a cool band. Meow!", user_id=3, tweet_id=3)
  c11 = Comment(content="I'm just a demo user", user_id=2, tweet_id=4)
  c12 = Comment(content="Meow meow! I heard you had food!", user_id=2, tweet_id=4)
  c13 = Comment(content="You better not be a dog!", user_id=1, tweet_id=5)
  c14 = Comment(content="I prefer wet food", user_id=1, tweet_id=5)
  c15 = Comment(content="Portugal the man is a cool band. Meow!", user_id=4, tweet_id=6)
  c16 = Comment(content="I'm just a demo user", user_id=4, tweet_id=6)
  c17 = Comment(content="Meow meow! I heard you had food!", user_id=4, tweet_id=7)
  c18 = Comment(content="You better not be a dog!", user_id=5, tweet_id=7)
  c19 = Comment(content="I prefer wet food", user_id=5, tweet_id=8)
  c20 = Comment(content="Portugal the man is a cool band. Meow!", user_id=3, tweet_id=8)

  db.session.add(c1)
  db.session.add(c2)
  db.session.add(c3)
  db.session.add(c4)
  db.session.add(c5)
  db.session.add(c6)
  db.session.add(c7)
  db.session.add(c8)
  db.session.add(c9)
  db.session.add(c10)
  db.session.add(c11)
  db.session.add(c12)
  db.session.add(c13)
  db.session.add(c14)
  db.session.add(c15)
  db.session.add(c16)
  db.session.add(c17)
  db.session.add(c18)
  db.session.add(c19)
  db.session.add(c20)

  db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
