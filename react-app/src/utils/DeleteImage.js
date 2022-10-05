import { getAllTweetsThunk } from "../store/tweets";

const handleDeleteImage = async (dispatch, id, key, setInitialPreviewImage) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("key", key);

  const res = await fetch('/api/images/', {
    method: "DELETE",
    body: formData,
  });
  const data = await res.json()
  await dispatch(getAllTweetsThunk())
  setInitialPreviewImage(null)
}

export default handleDeleteImage
