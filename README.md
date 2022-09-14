# Litter

Welcome to Litter! Litter is a pixel perfect social media clone of [Twitter](https://twitter.com/) made specially for cats (No dogs allowed)! Users can create a profile and tweet what's on their mind and also reply to other tweets! A user will also be able to view their profile or other users profile, which will display current profiles tweets. Users also have the option to update and delete their own tweets.

Checkout the live site here: [Litter](https://litter-twitter.herokuapp.com/)


### Languages
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### Backend
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-100000?style=for-the-badge&logo=sql&logoColor=BA1212&labelColor=AD0000&color=A90000) ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

### Hosting
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)


## Wiki Links:

- [API Doctumentation](https://github.com/Jaircarbajal91/litter-twitter/wiki/API-Documentation)
- [DB Schema](https://github.com/Jaircarbajal91/litter-twitter/wiki/DB-Schema)
- [Features List](https://github.com/Jaircarbajal91/litter-twitter/wiki/Features)
- [User Stories](https://github.com/Jaircarbajal91/litter-twitter/wiki/User-Stories)
- [WireFrames](https://github.com/Jaircarbajal91/litter-twitter/wiki/Wireframes)

## Landing page
![spashpage](./react-app/src/assets/images/splashpage.png)

## Sign up Form
![signup](./react-app/src/assets/images/signup.png)

## Sign in Form
![signin](./react-app/src/assets/images/signin.png)

## Home Page
![home](./react-app/src/assets/images/homepage.png)

## New Tweet Modal
![newtweet](./react-app/src/assets/images/newtweetform.png)

## Single Tweet / Reply Form
![singletweet](./react-app/src/assets/images/singletweet.png)

## Update Pop Up
![updatepopup](./react-app/src/assets/images/updateComment.png)

## Current Profile
![currentProfile](./react-app/src/assets/images/currentProfile.png)

## Steps to clone locally:
1. Clone this repository:
```bash
git clone https://github.com/Jaircarbajal91/litter-twitter.git
```

2. Install backend dependencies:

```bash
pipenv install -r requirements.txt
```

3. Create a `.env` file based on the example with proper settings for development environment:
```
SECRET_KEY=INSERT_SECRET_KEY_HERE
DATABASE_URL=sqlite:///dev.db
```

4. Start pipenv, migrate database, seed database, and run Flask app:

```bash
pipenv shell
flask db upgrade
flask seed all
flask run
```

5. Install frontend dependencies:

```bash
cd react-app/
npm install
npm start
```


## Future Improvements/Goals:
- Add media queries to make UI dynamic for all screen sizes
- Implement Likes, Retweet, and Followers features
- Allow the site to post and view images, which would require AWS implementation
- Make home tweets display only tweets that the user is following.
