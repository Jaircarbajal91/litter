import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllTweetsThunk } from "../../store/tweets";
import handleDeleteImage from "../../utils/DeleteImage";


const DeleteComment = ({ setShowDeleteComment, comment }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (comment.comment_images.length) {
      await handleDeleteImage(dispatch, comment.comment_images[0].id, comment.comment_images[0].key)
    }
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
