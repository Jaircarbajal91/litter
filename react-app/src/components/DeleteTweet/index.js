import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteTweetThunk, getAllTweetsThunk } from "../../store/tweets";
import './DeleteTweet.css'

const DeleteTweet = ({ setShowDeleteTweet, tweet, username }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteTweetThunk(tweet.id));
    setShowDeleteTweet(false);
    await dispatch(getAllTweetsThunk());
    if (!username) {
      history.push('/home');
    }
  }
  console.log(username)
  return (
    <div className="delete-tweet container">
      <h2>Are you sure you want to delete this tweet?</h2>
      <div className="delete-tweet buttons container">
        <button className='delete-tweet button no' onClick={() => setShowDeleteTweet(false)}>Cancel</button>
        <button className='delete-tweet button yes' onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default DeleteTweet
