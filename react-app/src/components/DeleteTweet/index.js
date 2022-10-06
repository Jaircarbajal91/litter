import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteTweetThunk, getAllTweetsThunk } from "../../store/tweets";
import handleDeleteImage from "../../utils/DeleteImage";
import ButtonLoadingAnimation from "../LoadingAnimation/ButtonLoadingAnimation";
import './DeleteTweet.css'

const DeleteTweet = ({ setShowDeleteTweet, tweet, username }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    return () => setIsDeleting(false)
  }, [])

  const handleDelete = async () => {
    setIsDeleting(true)
    if (tweet.tweet_comments.length) {
      for (let comment of tweet.tweet_comments) {
        console.log(comment)
        if (comment.comment_images.length) {
          await handleDeleteImage(dispatch, comment.comment_images[0].id, comment.comment_images[0].key)
        }
      }
    }
    if (tweet.tweet_images.length) {
      await handleDeleteImage(dispatch, tweet.tweet_images[0].id, tweet.tweet_images[0].key)
    }
    await dispatch(deleteTweetThunk(tweet.id));
    await dispatch(getAllTweetsThunk());
    setShowDeleteTweet(false);
    if (!username) {
      history.push('/home');
    }
  }
  return (
    <div className="delete-tweet container">
      <h2>Are you sure you want to delete this tweet?</h2>
      <div className={isDeleting ? "delete-tweet buttons container loading" : "delete-tweet buttons container"}>
        {isDeleting ? <ButtonLoadingAnimation /> :
          <>
            <button className='delete-tweet button no' onClick={() => setShowDeleteTweet(false)}>Cancel</button>
            <button className='delete-tweet button yes' onClick={handleDelete}>Delete</button>
          </>
        }
      </div>
    </div>
  )
}

export default DeleteTweet
