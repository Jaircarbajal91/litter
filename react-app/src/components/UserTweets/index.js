import { useState, useEffect } from "react"
import { getUserTweetsThunk } from "../../store/tweets"
import { useParams, useHistory } from "react-router-dom"
import Tweet from "../HomeTweets/Tweet"
import { useDispatch, useSelector } from "react-redux"
import './UserTweets.css'

const UserTweets = ({ sessionUser }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const dispatch = useDispatch()
  const { username } = useParams()
  const history = useHistory()
  const userTweets = useSelector(state => state.tweets.userTweets?.userTweetsList)
  useEffect(() => {
    (async function () {
      const data = await dispatch(getUserTweetsThunk(username))
      if (!data) {
        history.push('/home')
      } else {
        setIsLoaded(true)
      }
    }())
  }, [dispatch])

  if (userTweets?.length === 0) {
    return (
      <div>User currently has no tweets</div>
    )
  }

  const user = userTweets?.[0].user
  let email, firstName, lastName, profileImage;
  if (user) {
    email = user.email
    firstName = user.firstName
    lastName = user.lastName
    profileImage = user.profileImage
  }

  return isLoaded && (
    <div className="home user profile tweets container">
      <div className="user-profile tweet">
        <div className="header-container user">
          <h2>{firstName} {lastName}</h2>
          <p className="tweets count">{userTweets.length} Tweets</p>
        </div>
        <div className="middle container user tweet">
          <div className="user-profile info container">
            <img className='profile-image user-profile' src={profileImage} alt="" />
            <h3>{firstName} {lastName}</h3>
            <span>@{username}</span>
          </div>
          <button>Follow</button>
        </div>
      </div>
      {userTweets.map(tweet => (
        <Tweet key={tweet.id} sessionUser={sessionUser} tweet={tweet} />
      ))}
    </div>
  )
}

export default UserTweets
