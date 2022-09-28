import { format, formatDistanceToNow, intlFormatDistance } from 'date-fns'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import commentIcon from '../../../assets/images/commentIcon.svg'
import heartIcon from '../../../assets/images/heartIcon.svg'
import fullHeartIcon from '../../../assets/images/FullHeart.svg'
import litter from '../../../assets/images/threeDots.svg'
import stretch from '../../../assets/images/stretch.png'
import stretch2 from '../../../assets/images/stretch2.png'
import { Modal } from '../../../context/Modal'
import UpdateTweetForm from '../../UpdateTweetForm'
import DeleteTweet from '../../DeleteTweet'
import { likeTweetThunk } from '../../../store/tweets'
import { useDispatch } from 'react-redux'
import { getAllTweetsThunk } from '../../../store/tweets'
import './Tweet.css'

const Tweet = ({ setTweet, tweet, sessionUser, setShowDeleteTweet, setShowUpdateTweetForm }) => {
  const [showDropDown, setShowDropDown] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLikedByUser, setIsLikedByUser] = useState(false)
  const [likeCounter, setLikeCounter] = useState(tweet.tweet_likes.length)
  const [likesArray, setLikesArray] = useState(tweet.tweet_likes)
  const [likedTweet, setLikedTweet] = useState(likesArray.find(like => like.user_id === sessionUser.id))
  const newDate = Date.parse(tweet.created_at);
  const formattedDate = intlFormatDistance(new Date(newDate), new Date())
  const history = useHistory()
  const { user } = tweet
  const { email, firstName, lastName, profileImage, username, id } = user

  const dispatch = useDispatch()

  useEffect(() => {
    if (!showDropDown) return;
    const closeMenu = () => {
      setShowDropDown(false);
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showDropDown]);

  useEffect(() => {
    if (likedTweet) {
      setIsLikedByUser(true)
    }
  }, [likesArray.length, likedTweet])

  const handleLike = async (e) => {
    e.stopPropagation()
    if (isLikedByUser) {
      const unliked = fetch(`/api/likes/${likedTweet.id}`, {
        method: 'DELETE'
      })
      setIsLikedByUser(false)
      setLikeCounter((prev) => prev - 1)
      setLikedTweet(null)
    } else {
      const like = await dispatch(likeTweetThunk(tweet.id))
      setIsLikedByUser(true)
      setLikedTweet(like)
      setLikeCounter((prev) => prev + 1)
    }
  }
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
            <div className='name-container'>
              <span onClick={(e) => {
                e.stopPropagation()
                history.push(`/${username}`)
              }} className='tweet-name'>{firstName} {lastName}</span>
            </div>
            <span onClick={(e) => {
              e.stopPropagation()
              history.push(`/${username}`)
            }} className='tweet username'> @{username} </span>
            <span className='tweet created-at'>• {formattedDate}</span>
          </div>
          {sessionUser.id === id && <div className='tweet-delete-container'>
            <div className='tweet icon delete container' onClick={(e) => {
              e.stopPropagation()
              setShowDropDown(prev => !prev)
            }}>
              <img className="tweet icon delete" src={litter} alt="delete-icon" />
            </div>
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
          <div className='tweet-content-container'>
            <span className='tweet-content'>{tweet.content}</span>
          </div>
          {tweet.tweet_images.map.length && <div className='tweet-image-container'>
              {tweet.tweet_images.map(image => (
                <img key={image.id} className='tweet-image' src={image.url} alt="" />
              ))}
          </div>}
        </div>
        <div className='bottom-tweet-container'>
          <div onClick={(e) => {
            e.stopPropagation()
            history.push(`/tweets/${tweet.id}`)
          }} className='comment-info-container'>
            <div className='comment-icon-container'>
              <img className='tweet icon comment' src={commentIcon} alt="comment-icon" />
            </div >
            <div className='comment-counter'>
              <span>{tweet.tweet_comments.length}</span>
            </div>
          </div>
          <div onClick={handleLike} className={`heart-info-container`}>
            <div className='heart-icon-container'>
              <img className={`tweet icon heart ${likedTweet ? 'liked' : 'not-liked'}`} src={likedTweet ? fullHeartIcon : heartIcon} alt="heart-icon" />
            </div>
            <div className='comment-counter'>
              <span>{likeCounter}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweet
