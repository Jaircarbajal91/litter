import { useState, useEffect } from "react"
import { getUserTweetsThunk } from "../../store/tweets"
import { useParams, useHistory } from "react-router-dom"
import Tweet from "../HomeTweets/Tweet"
import { useDispatch, useSelector } from "react-redux"

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
  return isLoaded && (
    <div className="home user tweets container">
      {userTweets.map(tweet => (
        <Tweet key={tweet.id} sessionUser={sessionUser} tweet={tweet} />
      ))}
    </div>
  )
}

export default UserTweets
