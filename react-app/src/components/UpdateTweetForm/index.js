import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import exit from '../../assets/images/exit.svg'
import fileSelector from '../../assets/images/fileSelector.svg'
import { getAllTweetsThunk, updateTweetThunk } from '../../store/tweets'
import handleDeleteImage from '../../utils/DeleteImage'
import ButtonLoadingAnimation from '../LoadingAnimation/ButtonLoadingAnimation'

import './UpdateTweetForm.css'

const UpdateTweetForm = ({ sessionUser, tweet, setShowUpdateTweetForm }) => {
  const [errors, setErrors] = useState([])
  const [content, setContent] = useState(tweet.content)
  const [initialPreviewImage, setInitialPreviewImage] = useState(tweet.tweet_images?.[0]?.url)
  const [previewImage, setPreviewImage] = useState(tweet.tweet_images?.[0]?.url)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [image, setImage] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const history = useHistory()
  const { email, firstName, lastName, profileImage, username } = sessionUser
  const dispatch = useDispatch()
  useEffect(() => {
    const newErrors = []
    if (hasSubmitted) {
      if (!content.trim().length) newErrors.push("Tweet content is required.")
    }
    if (content.length > 280) newErrors.push("Maximum tweet length is 280 characters.")
    setErrors(newErrors)
    return () => setIsSubmitting(false)
  }, [content, errors.length, hasSubmitted])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (errors.length) return
    const data = await dispatch(updateTweetThunk(tweet.id, content.trim()))
    if (Array.isArray(data)) {
      setHasSubmitted(true)
    } else {
      setIsSubmitting(true)
      if (initialPreviewImage && (initialPreviewImage !== previewImage)) {
        await handleDeleteImage(dispatch, tweet.tweet_images[0].id, tweet.tweet_images[0].key, setInitialPreviewImage)
      }
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("type", "tweet");
        formData.append("tweet_id", data.id)
        const res = await fetch('/api/images/', {
          method: "POST",
          body: formData,
        });
      }
      setImage(null);
      setPreviewImage(null)
      await dispatch(getAllTweetsThunk())
      setShowUpdateTweetForm(false)
      setContent('')
    }
  }

  const updateImage = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader(file)
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setPreviewImage(reader.result)
    }
  }

  // const handleDeleteImage = async () => {
  //   const formData = new FormData();
  //   formData.append("id", tweet.tweet_images[0].id);
  //   formData.append("key", tweet.tweet_images[0].key);

  //   const res = await fetch('/api/images/', {
  //     method: "DELETE",
  //     body: formData,
  //   });
  //   const data = await res.json()
  //   await dispatch(getAllTweetsThunk())
  //   setInitialPreviewImage(null)
  // }
  return (
    <div className='new-tweet-container update'>
      <div className='right-new-tweet-container update'>
        <img onClick={() => history.push(`/${username}`)} className='new-tweet profile-image' src={profileImage} alt="" />
      </div>
      <div className='left-new-tweet-container'>
        <h3 className='update-tweet-header'>Update Tweet</h3>
        <div className='new-tweet errors update-tweet'>
          {errors.length > 0 && errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
        <form className='new-tweet form update' onSubmit={handleSubmit}>
          <textarea
            type="textarea"
            placeholder="What's happening?"
            className='input textarea update-tweet'
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              setHasSubmitted(false)
              setErrors([])
            }}
          />
          <div className='preview-image-container update-tweet'>
            {previewImage && <>
              <img className="preview image" src={previewImage} ></img>
              <img  onClick={(e) => {
                setPreviewImage(null)
                setImage(null);
              }} className='remove-preivew-img icon' src={exit} alt="" />
            </>}
          </div>
          <label htmlFor="img-upload-update-tweet"><img className='file-selector' src={fileSelector} alt="" /> Add Image</label>
          <input
            type="file"
            accept=".png,
                            .jpeg,
                            .jpg,
                            .gif,"
            id="img-upload-update-tweet"
            multiple
            style={{
              display: "none"
            }}
            onClick={event => event.target.value = null}
            onChange={updateImage}
          />
          <div className='new-tweet-button container'>
            {isSubmitting ? <ButtonLoadingAnimation /> : <button className='new-tweet button' disabled={errors.length > 0 || content.length === 0 || isSubmitting} type='submit'>Update</button>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateTweetForm
