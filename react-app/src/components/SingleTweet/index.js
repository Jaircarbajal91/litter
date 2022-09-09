import { format } from 'date-fns'
import { useParams, useHistory } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllTweetsThunk } from "../../store/tweets"
import commentIcon from '../../assets/images/commentIcon.svg'
import heartIcon from '../../assets/images/heartIcon.svg'
import litter from '../../assets/images/litter.svg'
import stretch from '../../assets/images/stretch.png'
import stretch2 from '../../assets/images/stretch2.png'
import { Modal } from '../../context/Modal'
import UpdateTweetForm from '../UpdateTweetForm'
import DeleteTweet from '../DeleteTweet'
import Comment from '../Comment'
import NewCommentForm from '../NewCommentForm'
import UpdateCommentForm from '../UpdateCommentForm'
import DeleteComment from '../DeleteComment'
import './SingleTweet.css'

const SingleTweet = ({ sessionUser }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [commentToUpdate, setCommentToUpdate] = useState({})
  const [showUpdateTweetForm, setShowUpdateTweetForm] = useState(false)
  const [showDeleteTweet, setShowDeleteTweet] = useState(false)
  const [showNewCommentForm, setShowNewCommentForm] = useState(false)
  const [showUpdateCommentForm, setShowUpdateCommentForm] = useState(false)
  const [showDeleteComment, setShowDeleteComment] = useState(false)
  const [showDropDown, setShowDropDown] = useState(false)
  const dispatch = useDispatch()
  const { tweetId } = useParams()
  const history = useHistory()
  const tweet = useSelector(state => state.tweets[Number(tweetId)])

  useEffect(() => {
    (async function () {
      await dispatch(getAllTweetsThunk())
      setIsLoaded(true)
    }())
  }, [tweet?.content])

  useEffect(() => {
    if (!showDropDown) return;
    const closeMenu = () => {
      setShowDropDown(false);
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showDropDown]);

  let newDate;
  let formattedDate;
  if (tweet) {
    newDate = Date.parse(tweet.created_at);
    formattedDate = format(newDate, 'hh:mm b • MMMM d, yyyy')
  }
  let user = tweet?.user
  if (isLoaded && !tweet) {
    return (
      <div className='page-not-found'>404 Page not found</div>
    )
  }

  return isLoaded && (
    <>
      <div className="single single tweet container">
        {showUpdateTweetForm && <Modal onClose={() => setShowUpdateTweetForm(false)}>
          <UpdateTweetForm tweet={tweet} sessionUser={sessionUser} setShowUpdateTweetForm={setShowUpdateTweetForm} />
        </Modal>}
        {showDeleteTweet && <Modal onClose={() => setShowDeleteTweet(false)}>
          <DeleteTweet tweet={tweet} setShowDeleteTweet={setShowDeleteTweet} />
        </Modal>}
        {showNewCommentForm && <Modal onClose={() => setShowNewCommentForm(false)}>
          <NewCommentForm sessionUser={sessionUser} tweet={tweet} setShowNewCommentForm={setShowNewCommentForm} />
        </Modal>}
        {showUpdateCommentForm && <Modal onClose={() => setShowUpdateCommentForm(false)}>
          <UpdateCommentForm comment={commentToUpdate} sessionUser={sessionUser} tweet={tweet} setShowUpdateCommentForm={setShowUpdateCommentForm} />
        </Modal>}
        {showDeleteComment && <Modal onClose={() => setShowDeleteComment(false)}>
          <DeleteComment comment={commentToUpdate} sessionUser={sessionUser} tweet={tweet} setShowDeleteComment={setShowDeleteComment} />
        </Modal>}
        <div className="top single tweet-container">
          <div className='user info container'>
            <div className=' top left user-info container'>
              <img onClick={(e) => {
                e.stopPropagation()
                history.push(`/${user.username}`)
              }} className='profile-image' src={user.profileImage} alt="profile-image" />
            </div>
            <div className='top mid user-info container'>
              <span onClick={(e) => {
                e.stopPropagation()
                history.push(`/${user.username}`)
              }} className='tweet-name'>{user.firstName} {user.lastName}</span>
              <span onClick={(e) => {
                e.stopPropagation()
                history.push(`/${user.username}`)
              }} className='tweet username'> @{user.username} </span>
            </div>
          </div>
          {sessionUser.id === user.id && <div className='tweet-delete-container'>
            <img onClick={(e) => {
              e.stopPropagation()
              setShowDropDown(prev => !prev)
            }} className="tweet icon delete" src={litter} alt="delete-icon" />
            {showDropDown && <div className='drop-down tweet'>
              <div onClick={(e) => {
                e.stopPropagation()
                setShowUpdateTweetForm(true)
              }} className='drop-down item'>
                <img className='drop-down icon' src={stretch} alt="strech icon" />
                <span className='drop-down text'>Update Tweet</span>
              </div>
              <div onClick={(e) => {
                e.stopPropagation()
                setShowDeleteTweet(true)
              }} className='drop-down item'>
                <span className='drop-down text'>Delete Tweet</span>
                <img className='drop-down icon' src={stretch2} alt="strech icon" />
              </div>
            </div>}
          </div>}
        </div>
        <div className='middle-tweet-container single'>
          <span className='tweet-content'>{tweet.content}</span>
        </div>
        <div className='date-container'>
          <span className='single tweet created-at'>{formattedDate} • Litter Web App</span>
        </div>
        <div className='single bottom-tweet-container'>
          <div onClick={(e) => {
            e.stopPropagation()
            setShowNewCommentForm(true)
          }} className='comment-info-container'>
            <div className='comment-icon-container'>
              <img className='tweet icon comment' src={commentIcon} alt="comment-icon" />
            </div >
            <div className='comment-counter'>
              <span>{tweet.tweet_comments.length}</span>
            </div>
          </div>
          {/* <div className='heart-icon-container'> */}
            {/* <img className='tweet icon heart' src={heartIcon} alt="heart-icon" /> */}
          {/* </div> */}
        </div>
        <NewCommentForm setShowNewCommentForm={setShowNewCommentForm} sessionUser={sessionUser} tweet={tweet}/>
      </div>
      <div className='comments-container'>
          {tweet.tweet_comments.length > 0 && tweet.tweet_comments.map(comment => (
            <Comment tweet={tweet} tweetOwner={user} key={comment.id} sessionUser={sessionUser} comment={comment}  setShowDeleteComment={setShowDeleteComment} setShowNewCommentForm={setShowNewCommentForm} setCommentToUpdate={setCommentToUpdate} setShowUpdateCommentForm={setShowUpdateCommentForm}/>
          ))}
      </div>
    </>
  )
}

export default SingleTweet
