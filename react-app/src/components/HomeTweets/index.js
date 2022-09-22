import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllTweetsThunk } from '../../store/tweets'
import UpdateTweetForm from '../UpdateTweetForm'
import DeleteTweet from '../DeleteTweet'
import { Modal } from '../../context/Modal'
import Tweet from './Tweet'

const HomeTweets = ({ sessionUser }) => {
  const [tweetsLoaded, setTweetsLoaded] = useState(false)
  const [tweet, setTweet] = useState({})
  const [showUpdateTweetForm, setShowUpdateTweetForm] = useState(false)
  const [showDeleteTweet, setShowDeleteTweet] = useState(false)
  const [liked, setLiked] = useState(false)
  const dispatch = useDispatch()
  const tweets = useSelector(state => state.tweets.tweetsList)
  useEffect(() => {
    if (sessionUser) {
      dispatch(getAllTweetsThunk()).then(() => setTweetsLoaded(true))
    }
  }, [dispatch, tweets?.length])
  return tweetsLoaded && (
    <div className='tweets-container'>
      {showUpdateTweetForm && <Modal onClose={() => setShowUpdateTweetForm(false)}>
        <UpdateTweetForm tweet={tweet} sessionUser={sessionUser} setShowUpdateTweetForm={setShowUpdateTweetForm} />
      </Modal>}
      {showDeleteTweet && <Modal onClose={() => setShowDeleteTweet(false)}>
        <DeleteTweet tweet={tweet} setShowDeleteTweet={setShowDeleteTweet} />
      </Modal>}
      {tweets.map(tweet => (
        <Tweet key={tweet.id} setTweet={setTweet} sessionUser={sessionUser} tweet={tweet} setShowUpdateTweetForm={setShowUpdateTweetForm}  setShowDeleteTweet={setShowDeleteTweet}/>
      ))}
    </div>
  )
}

export default HomeTweets
