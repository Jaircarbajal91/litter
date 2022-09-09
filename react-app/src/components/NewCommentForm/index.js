import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllTweetsThunk } from '../../store/tweets'

import './NewCommentForm.css'

const NewCommentForm = ({ sessionUser, tweet }) => {
  const [errors, setErrors] = useState([])
  const [content, setContent] = useState('')
  const history = useHistory()
  const { email, firstName, lastName, profileImage, username } = sessionUser
  const dispatch = useDispatch()
  useEffect(() => {
    const newErrors = []
    if (content.length >= 280) newErrors.push("Maximum comment length is 280 characters.")
    setErrors(newErrors)
  }, [content, errors.length])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (errors.length) return
    const res = await fetch(`/api/comments/${tweet.id}`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({content})
    })
    if (res.ok) {
      await dispatch(getAllTweetsThunk())
      setContent('')
    } else {
      const data = await res.json()
      console.log(data)
    }
  }

  return (
    <div className='new-tweet-container'>
      <div className='right-new-tweet-container'>
        <img onClick={() => history.push(`/${username}`)} className='new-tweet profile-image' src={profileImage} alt="" />
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
            placeholder="Tweet your reply"
            className='input textarea'
            cols='60'
            rows='8'
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

export default NewCommentForm
