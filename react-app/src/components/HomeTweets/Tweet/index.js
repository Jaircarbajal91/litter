import { format, formatDistanceToNow } from 'date-fns'
import commentIcon from '../../../assets/images/commentIcon.svg'
import heartIcon from '../../../assets/images/heartIcon.svg'
import './Tweet.css'

const Tweet = ({ tweet }) => {
  const newDate = Date.parse(tweet.created_at);
  const formattedDate = formatDistanceToNow(newDate, { includeSeconds: true })
  const { user } = tweet
  const { email, firstName, lastName, profileImage, username } = user
  return (
    <div className='tweet-container'>
      <div className='tweet-left-container'>
        <img className='profile-image' src={profileImage} alt="" />
      </div>
      <div className='tweet-right-container'>
        <div className='top-tweet-container'>
          <div className='tweet-user-info'>
            <span className='tweet-name'>{firstName} {lastName}</span>
            <span className='tweet username'> @{username} </span>
            <span className='tweet created-at'>• {formattedDate} ago</span>
          </div>
          <div className='tweet-menu-container'></div>
        </div>
        <div className='middle-tweet-container'>
          <span className='tweet-content'>{tweet.content}</span>
        </div>
        <div className='bottom-tweet-container'>
          <img className='tweet icon comment' src={commentIcon} alt="comment-icon" />
          <img className='tweet icon heart' src={heartIcon} alt="heart-icon" />
        </div>
      </div>
    </div>
  )
}

export default Tweet
