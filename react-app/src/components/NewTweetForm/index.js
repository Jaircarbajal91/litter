import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllTweetsThunk, createNewTweetThunk } from '../../store/tweets'

import './NewTweetForm.css'

const NewTweetForm = ({ sessionUser }) => {
  const [errors, setErrors] = useState([])
  const [content, setContent] = useState('')

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
    await dispatch(createNewTweetThunk(content))
    await dispatch(getAllTweetsThunk())
    setContent('')
  }

  return (
    <div className='new-tweet-container'>
      <div className='right-new-tweet-container'>
        <img className='new-tweet profile-image' src={profileImage} alt="" />
      </div>
      <div className='left-new-tweet-container'>
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
            <button className='new-tweet button' disabled={errors.length > 0 || content.length === 0} type='submit'>Meow</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewTweetForm
