import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllTweetsThunk, updateTweetThunk } from '../../store/tweets'

import './UpdateTweetForm.css'

const UpdateTweetForm = ({ sessionUser, tweet, setShowUpdateTweetForm }) => {
  const [errors, setErrors] = useState([])
  const [content, setContent] = useState(tweet.content)
  const history = useHistory()
  const { email, firstName, lastName, profileImage, username } = sessionUser
  const dispatch = useDispatch()
  useEffect(() => {
    const newErrors = []
    if (content.length >= 280) newErrors.push("Maximum tweet length is 280 characters.")
    setErrors(newErrors)
  }, [content, errors.length])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (errors.length) return
    await dispatch(updateTweetThunk(tweet.id, content))
    await dispatch(getAllTweetsThunk())
    setContent('')
    setShowUpdateTweetForm(false)
  }

  return (
    <div className='new-tweet-container update'>
      <div className='right-new-tweet-container update'>
        <img onClick={() => history.push(`/${username}`)} className='new-tweet profile-image' src={profileImage} alt="" />
      </div>
      <div className='left-new-tweet-container'>
        <h3 className='update-tweet-header'>Update Tweet</h3>
        <div className='new-tweet errors'>
          {errors.length > 0 && errors.map(error => (
            <p>{error}</p>
          ))}
        </div>
        <form className='new-tweet form' onSubmit={handleSubmit}>
          <input
            type="textarea"
            placeholder="What's happening?"
            className='input textarea'
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
