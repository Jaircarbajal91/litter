import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllTweetsThunk } from "../../store/tweets";


const DeleteComment = ({ setShowDeleteComment, comment }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const res = await fetch(`/api/comments/${comment.id}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      await dispatch(getAllTweetsThunk());
      setShowDeleteComment(false);
    } else {
      const data = await res.json()
      console.log(data)
    }
  }
  return (
    <div className="delete-tweet container">
      <h2>Are you sure you want to delete this comment?</h2>
      <div className="delete-tweet buttons container">
        <button className='delete-tweet button no' onClick={() => setShowDeleteComment(false)}>Cancel</button>
        <button className='delete-tweet button yes' onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default DeleteComment
