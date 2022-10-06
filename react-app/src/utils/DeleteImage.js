import { getAllTweetsThunk } from "../store/tweets";

const handleDeleteImage = async (dispatch, id, key, setInitialPreviewImage) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("key", key);

  await fetch('/api/images/', {
    method: "DELETE",
    body: formData,
  });
  await dispatch(getAllTweetsThunk())
  if (setInitialPreviewImage) {
    setInitialPreviewImage(null)
  }
}

export default handleDeleteImage
