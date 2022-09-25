import { useState, useEffect } from "react"
import { getUserTweetsThunk } from "../../store/tweets"
import { useParams, useHistory } from "react-router-dom"
import Tweet from "../HomeTweets/Tweet"
import { useDispatch, useSelector } from "react-redux"
import { Modal } from "../../context/Modal"
import DeleteTweet from "../DeleteTweet"
import UpdateTweetForm from "../UpdateTweetForm"
import sadCatIcon from '../../assets/images/sadCat.svg'
import { followUserThunk, unfollowUserThunk } from "../../store/session"
import { getAllTweetsThunk } from "../../store/tweets"
import cats from '../../assets/images/cats.png'
import './UserTweets.css'
import { set } from "date-fns"

const UserTweets = ({ sessionUser }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [followersCount, setFollowersCount] = useState(0)
  const [followingCount, setFollowingCount] = useState(0)
  const [tweet, setTweet] = useState({})
  const [isFollowing, setIsFollowing] = useState(false)
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

  useEffect(() => {
    setIsFollowing(sessionUser.following.some(id => id === user?.id))
    setFollowersCount(user?.followers?.length)
    setFollowingCount(user?.following?.length)
  }, [user?.id])

  const foundUser = users.find(user => user.username === username)
  useEffect(() => {
    setUser(foundUser)
    setEmail(user?.email)
    setFirstName(user?.firstName)
    setLastName(user?.lastName)
    setProfileImage(user?.profileImage)
    setFollowersCount(user?.followers?.length)
    setFollowingCount(user?.following?.length)
  }, [user, email, firstName, lastName, profileImage, foundUser])

  const handleFollow = async (e) => {
    if (!isFollowing) {
      const res = await dispatch(followUserThunk(user.id));
      setIsFollowing(true)
      setFollowersCount((prev) => prev + 1)
    } else {
      const res = await dispatch(unfollowUserThunk(user.id));
      setIsFollowing(false)
      setFollowersCount((prev) => prev - 1)
    }
  }
  console.log(user)
  return isLoaded && (
    <div className="home user profile tweets container">
      {showUpdateTweetForm && <Modal onClose={() => setShowUpdateTweetForm(false)}>
        <UpdateTweetForm tweet={tweet} sessionUser={sessionUser} setShowUpdateTweetForm={setShowUpdateTweetForm} />
      </Modal>}
      {showDeleteTweet && <Modal onClose={() => setShowDeleteTweet(false)}>
        <DeleteTweet username={username} tweet={tweet} setShowDeleteTweet={setShowDeleteTweet} />
      </Modal>}
      <div className="profile info wrapper" style={{
        backgroundImage: `url(${cats})`
      }}>
        <div className="header-container user">
          <h2>{firstName} {lastName}</h2>
          <p className="tweets count">{userTweets?.length} Tweets</p>
        </div>
        <div className="user-profile tweet">
          <div className="middle container user tweet">
            <div className="user-profile info container">
              <img className='profile-image user-profile ' src={profileImage} alt="" />
              <h3>{firstName} {lastName}</h3>
              <span>@{username}</span>
            </div>
            <div className="follow button container">
              {sessionUser.id !== user?.id && <button onClick={handleFollow}>{isFollowing ? "Unfollow" : "Follow"}</button>}
            </div>
          </div>
          <div className="followers-content-container">
            <strong>{followingCount}</strong><span>Following</span>
            <strong>{followersCount}</strong><span>Followers</span>
          </div>
        </div>
      </div>
      {userTweets?.length > 0 ? userTweets.map(tweet => (
        <Tweet setTweet={setTweet} key={tweet.id} sessionUser={sessionUser} tweet={tweet} setShowUpdateTweetForm={setShowUpdateTweetForm} setShowDeleteTweet={setShowDeleteTweet} />
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
