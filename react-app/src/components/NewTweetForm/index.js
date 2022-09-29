import { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllTweetsThunk, createNewTweetThunk } from '../../store/tweets'
import fileSelector from '../../assets/images/fileSelector.svg'

import './NewTweetForm.css'

const NewTweetForm = ({ sessionUser, setShowNewTweetForm, showNewTweetForm }) => {
  const [errors, setErrors] = useState([])
  const [content, setContent] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [newTweet, setNewTweet] = useState(null)
  const [image, setImage] = useState(null);
  const history = useHistory()
  const { email, firstName, lastName, profileImage, username } = sessionUser
  const dispatch = useDispatch()
  const location = useLocation()
  useEffect(() => {
    const newErrors = []
    if (hasSubmitted) {
      if (!content.trim().length) newErrors.push("Tweet content is required.")
    }
    if (content.length > 280) newErrors.push("Maximum tweet length is 280 characters.")
    setErrors(newErrors)
  }, [content, errors.length, hasSubmitted, showNewTweetForm])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await dispatch(createNewTweetThunk(content.trim()))
    if (Array.isArray(data)) {
      setHasSubmitted(true)
    } else {
      setNewTweet(data)
      await dispatch(getAllTweetsThunk())
      setShowNewTweetForm(false)
      setContent('')
      if (location.pathname !== '/home') {
        history.push(`/tweets/${data.id}`)
      }
    }
  }

  const checkKeyDown = (e) => {
    if (e.keyCode == 13) return false;
  };


  const updateImage = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    const formData = new FormData();
      formData.append("image", image);
      formData.append("type", "tweet");
      formData.append("tweet_id", newTweet.id)
      const res = await fetch('/api/images', {
        method: "POST",
        body: formData,
      });
      setImage(null);
  }

  return (
    <div className='new-tweet-container'>
      <div className='right-new-tweet-container'>
        <img onClick={() => history.push(`/${username}`)} className='new-tweet profile-image' src={profileImage} alt="" />
      </div>
      <div className='left-new-tweet-container'>
        <div className='new-tweet errors'>
          {errors.length > 0 && errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
        <form className='new-tweet form' onSubmit={handleSubmit} >
          <textarea
            type="text"
            placeholder="What's happening?"
            className='input textarea'
            onKeyDown={(e) => checkKeyDown(e)}
            cols='60'
            rows='8'
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              setHasSubmitted(false)
              setErrors([])
            }}
          />
          {image && <img src={image}/>}
          <label htmlFor="img-upload"><img className='file-selector' src={fileSelector} alt="" /> Add Image</label>
          <input
            type="file"
            accept="image/*"
            id="img-upload"
            multiple
            style={{
              display: "none"
            }}
            onChange={updateImage}
          />
          <div className='new-tweet-button container'>
            <button className='new-tweet button' disabled={errors.length > 0 || content.length === 0} type='submit'>Meow</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewTweetForm
