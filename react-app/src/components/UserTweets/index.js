import { useState, useEffect } from "react"
import { getUserTweetsThunk } from "../../store/tweets"
import { useParams, useHistory } from "react-router-dom"
import Tweet from "../HomeTweets/Tweet"
import { useDispatch, useSelector } from "react-redux"
import { Modal } from "../../context/Modal"
import DeleteTweet from "../DeleteTweet"
import UpdateTweetForm from "../UpdateTweetForm"
import sadCatIcon from '../../assets/images/sadCat.svg'
import './UserTweets.css'

const UserTweets = ({ sessionUser }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [users, setUsers] = useState([]);
  const [tweet, setTweet] = useState({})
  const [showUpdateTweetForm, setShowUpdateTweetForm] = useState(false)
  const [showDeleteTweet, setShowDeleteTweet] = useState(false)
  const dispatch = useDispatch()
  const { username } = useParams()
  const history = useHistory()
  const userTweets = useSelector(state => state.tweets.userTweets?.userTweetsList)
  useEffect(() => {
    (async function () {
      setIsLoaded(false)
      const data = await dispatch(getUserTweetsThunk(username))
      if (!data) {
        history.push('/home')
      } else {
        setIsLoaded(true)
      }
    }())
  }, [dispatch, userTweets?.length, tweet?.content, username])

  useEffect(() => {
    async function fetchData() {
      if (sessionUser) {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
      }
    }
    fetchData();
  }, []);

  const user = users.find(user => user.username === username)
  let email, firstName, lastName, profileImage;
  if (user) {
    email = user.email
    firstName = user.firstName
    lastName = user.lastName
    profileImage = user.profileImage
  }

  return isLoaded && (
    <div className="home user profile tweets container">
      {showUpdateTweetForm && <Modal onClose={() => setShowUpdateTweetForm(false)}>
        <UpdateTweetForm tweet={tweet} sessionUser={sessionUser} setShowUpdateTweetForm={setShowUpdateTweetForm} />
      </Modal>}
      {showDeleteTweet && <Modal onClose={() => setShowDeleteTweet(false)}>
        <DeleteTweet username={username} tweet={tweet} setShowDeleteTweet={setShowDeleteTweet} />
      </Modal>}
      <div className="user-profile tweet">
        <div className="header-container user">
          <h2>{firstName} {lastName}</h2>
          <p className="tweets count">{userTweets?.length} Tweets</p>
        </div>
        <div className="middle container user tweet">
          <div className="user-profile info container">
            <img className='profile-image user-profile ' src={profileImage} alt="" />
            <h3>{firstName} {lastName}</h3>
            <span>@{username}</span>
          </div>
          {/* <button>Follow</button> */}
        </div>
      </div>
      {userTweets?.length > 0 ? userTweets.map(tweet => (
        <Tweet setTweet={setTweet} key={tweet.id} sessionUser={sessionUser} tweet={tweet} setShowUpdateTweetForm={setShowUpdateTweetForm}  setShowDeleteTweet={setShowDeleteTweet}/>
      )) : (
        <div className="no-tweets">
          <h3>This user currently has no tweets</h3>
          <img src={sadCatIcon} alt="" />
        </div>
      )}
    </div>
  )
}

export default UserTweets
