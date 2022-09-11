import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllTweetsThunk } from '../../store/tweets'

import './UpdateCommentForm.css'

const UpdateCommentForm = ({ tweet, sessionUser, comment, setShowUpdateCommentForm }) => {
  const [errors, setErrors] = useState([])
  const [content, setContent] = useState(comment.content)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const history = useHistory()
  const { email, firstName, lastName, profileImage, username } = sessionUser
  const dispatch = useDispatch()
  useEffect(() => {
    const newErrors = []
    if (hasSubmitted) {
      if (!content.trim().length) newErrors.push("Reply content is required.")
    }
    if (content.length >= 280) newErrors.push("Maximum comment length is 280 characters.")
    setErrors(newErrors)
  }, [content, errors.length, hasSubmitted])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (errors.length) return
    const res = await fetch(`/api/comments/${comment.id}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({content: content.trim()})
    })
    if (res.ok) {
      await dispatch(getAllTweetsThunk())
      setContent('')
      setShowUpdateCommentForm(false)
    } else {
      const data = await res.json()
      setHasSubmitted(true)
      console.log(data)
    }
  }

  return (
    <div className='new-tweet-container comment'>
      <div className='right-new-tweet-container'>
        <img onClick={() => history.push(`/${username}`)} className='new-tweet profile-image' src={profileImage} alt="" />
      </div>
      <div className='left-new-tweet-container'>
        <div className='new-tweet errors'>
          {errors.length > 0 && errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
        <div className='replying-to content'>
          <span>Replying to </span>
          <span>@{tweet.user.username}</span>
        </div>
        <form className='new-tweet form' onSubmit={handleSubmit}>
          <textarea
            type="textarea"
            placeholder="Tweet your reply"
            className='input textarea'
            cols='60'
            rows='8'
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              setHasSubmitted(false)
              setErrors([])
            }}
          />
          <div className='new-tweet-button container'>
            <button className='new-tweet button' disabled={errors.length > 0 || content.length === 0} type='submit'>Meow</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateCommentForm
