import { format, formatDistanceToNow } from 'date-fns'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import commentIcon from '../../../assets/images/commentIcon.svg'
import heartIcon from '../../../assets/images/heartIcon.svg'
import litter from '../../../assets/images/litter.svg'
import stretch from '../../../assets/images/stretch.png'
import stretch2 from '../../../assets/images/stretch2.png'
import { Modal } from '../../../context/Modal'
import UpdateTweetForm from '../../UpdateTweetForm'
import DeleteTweet from '../../DeleteTweet'
import './Tweet.css'

const Tweet = ({ setTweet, tweet, sessionUser, setShowDeleteTweet, setShowUpdateTweetForm }) => {
  const [showDropDown, setShowDropDown] = useState(false)
  const newDate = Date.parse(tweet.created_at);
  const formattedDate = formatDistanceToNow(newDate, { includeSeconds: true })
  const history = useHistory()
  const { user } = tweet
  const { email, firstName, lastName, profileImage, username, id } = user

  useEffect(() => {
    if (!showDropDown) return;
    const closeMenu = () => {
      setShowDropDown(false);
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showDropDown]);

  return (
    <div onClick={() => history.push(`/tweets/${tweet.id}`)} className='tweet-container'>
      <div className='tweet-left-container'>
        <img onClick={(e) => {
          e.stopPropagation()
          history.push(`/${username}`)
        }} className='profile-image' src={profileImage} alt="" />
      </div>
      <div className='tweet-right-container'>
        <div className='top-tweet-container'>
          <div className='tweet-user-info'>
            <span onClick={(e) => {
              e.stopPropagation()
              history.push(`/${username}`)
            }} className='tweet-name'>{firstName} {lastName}</span>
            <span onClick={(e) => {
              e.stopPropagation()
              history.push(`/${username}`)
            }} className='tweet username'> @{username} </span>
            <span className='tweet created-at'>• {formattedDate} ago</span>
          </div>
          {sessionUser.id === id && <div className='tweet-delete-container'>
            <img onClick={(e) => {
              e.stopPropagation()
              setShowDropDown(prev => !prev)
            }} className="tweet icon delete" src={litter} alt="delete-icon" />
            {showDropDown && <div className='drop-down tweet'>
              <div onClick={(e) => {
                e.stopPropagation()
                setTweet(tweet)
                setShowUpdateTweetForm(true)
              }} className='drop-down item'>
                <img className='drop-down icon' src={stretch} alt="strech icon" />
                <span className='drop-down text'>Update Tweet</span>
              </div>
              <div onClick={(e) => {
                e.stopPropagation()
                setTweet(tweet)
                setShowDeleteTweet(true)
              }} className='drop-down item'>
                <span className='drop-down text'>Delete Tweet</span>
                <img className='drop-down icon' src={stretch2} alt="strech icon" />
              </div>
            </div>}
          </div>}
        </div>
        <div className='middle-tweet-container'>
          <span className='tweet-content'>{tweet.content}</span>
        </div>
        <div className='bottom-tweet-container'>
          <div className='comment-icon-container'>
            {/* <img className='tweet icon comment' src={commentIcon} alt="comment-icon" /> */}
          </div>
          <div className='heart-icon-container'>
            {/* <img className='tweet icon heart' src={heartIcon} alt="heart-icon" /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweet
