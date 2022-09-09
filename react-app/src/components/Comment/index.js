import { useState, useEffect } from "react";
import { format, formatDistanceToNow } from 'date-fns'
import { useHistory } from "react-router-dom";
import commentIcon from '../../assets/images/commentIcon.svg'
import heartIcon from '../../assets/images/heartIcon.svg'
import litter from '../../assets/images/litter.svg'
import stretch from '../../assets/images/stretch.png'
import stretch2 from '../../assets/images/stretch2.png'
import './Comment.css'

const Comment = ({ comment, sessionUser, tweetOwner }) => {
  const [users, setUsers] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const history = useHistory()

  useEffect(() => {
    async function fetchData() {
      setIsLoaded(false)
      if (sessionUser) {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
        setIsLoaded(true)
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!showDropDown) return;
    const closeMenu = () => {
      setShowDropDown(false);
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showDropDown]);

  const newDate = Date.parse(comment.created_at);
  const formattedDate = formatDistanceToNow(newDate, { includeSeconds: true })
  console.log(comment)
  const user = users.find(user => user.id === comment.user_id)
  return isLoaded && (
    <div className="tweet-container comment">
      <div className='tweet-left-container'>
        <img onClick={(e) => {
          e.stopPropagation()
          history.push(`/${user.username}`)
        }} className='profile-image' src={user.profileImage} alt="" />
      </div>
      <div className='tweet-right-container'>
        <div className='top-tweet-container'>
          <div className='tweet-user-info'>
            <span onClick={(e) => {
              e.stopPropagation()
              history.push(`/${user.username}`)
            }} className='tweet-name'>{user.firstName} {user.lastName}</span>
            <span onClick={(e) => {
              e.stopPropagation()
              history.push(`/${user.username}`)
            }} className='tweet username'> @{user.username} </span>
            <span className='tweet created-at'>• {formattedDate} ago</span>
          </div>
          {sessionUser.id === comment.user_id && <div className='tweet-delete-container'>
            <img onClick={(e) => {
              e.stopPropagation()
              setShowDropDown(prev => !prev)
            }} className="tweet icon delete" src={litter} alt="delete-icon" />
            {showDropDown && <div className='drop-down tweet'>
              <div onClick={(e) => {
                e.stopPropagation()
                // setTweet(tweet)
                // setShowUpdateTweetForm(true)
              }} className='drop-down item'>
                <img className='drop-down icon' src={stretch} alt="strech icon" />
                <span className='drop-down text'>Update Comment</span>
              </div>
              <div onClick={(e) => {
                e.stopPropagation()
                // setTweet(tweet)
                // setShowDeleteTweet(true)
              }} className='drop-down item'>
                <span className='drop-down text'>Delete Comment</span>
                <img className='drop-down icon' src={stretch2} alt="strech icon" />
              </div>
            </div>}
          </div>}
        </div>
        <div className='middle-tweet-container'>
          <span className='tweet-content comment'>{comment.content}</span>
        </div>
        {/* <div className='bottom-tweet-container comment'>
          <div onClick={(e) => {
            e.stopPropagation()
            // history.push(`/tweets/${tweet.id}`)
          }} className='comment-info-container'>
            <div className='comment-icon-container'>
              <img className='tweet icon comment' src={commentIcon} alt="comment-icon" />
            </div >
              <div className='comment-counter'>
                {/* <span>{tweet.tweet_comments.length}</span> */}
        {/* </div>
          </div>
          <div className='heart-icon-container'>
            <img className='tweet icon heart' src={heartIcon} alt="heart-icon" />
          </div> */}
        {/* // </div> */}
      </div>
    </div>
  )
}

export default Comment
