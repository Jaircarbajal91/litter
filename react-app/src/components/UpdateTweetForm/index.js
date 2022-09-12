import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllTweetsThunk, updateTweetThunk } from '../../store/tweets'

import './UpdateTweetForm.css'

const UpdateTweetForm = ({ sessionUser, tweet, setShowUpdateTweetForm }) => {
  const [errors, setErrors] = useState([])
  const [content, setContent] = useState(tweet.content)
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
  }, [content, errors.length, hasSubmitted])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (errors.length) return
    const data = await dispatch(updateTweetThunk(tweet.id, content.trim()))
    if (Array.isArray(data)) {
      setHasSubmitted(true)
    } else {
      await dispatch(getAllTweetsThunk())
      setShowUpdateTweetForm(false)
      setContent('')
    }
  }

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
        <form className='new-tweet form' onSubmit={handleSubmit}>
          <textarea
            type="textarea"
            placeholder="What's happening?"
            className='input textarea'
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              setHasSubmitted(false)
              setErrors([])
            }}
          />
          <div className='new-tweet-button container'>
            <button className='new-tweet button' disabled={errors.length > 0 || content.length === 0} type='submit'>Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateTweetForm
