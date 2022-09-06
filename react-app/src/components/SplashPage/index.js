import { useHistory } from 'react-router-dom'
import WhiteCatIcon from '../../assets/images/WhiteCatIcon.svg'
import './SpashPage.css'

const SplashPage = ({ setShowLogin, setShowSignup, sessionUser }) => {
  const history = useHistory()

  if (sessionUser) {
    history.push('/home')
  }
  return (
    <div className='splash-page container'>
      <div className='splash-page top container'>
        <div className='icon container'>
          <img className='splash-page cat-icon-1' src={WhiteCatIcon} alt="" />
        </div>
        <div className='splash-page header'>
          <h1 className='happening-header' >Happening Meow</h1>
          <h3 className='join-header'>Join Litter today.</h3>
        </div>
        <button className='signup button' onClick={() => setShowSignup(true)}>Create account</button>
        <div className='signin container'>
          <h4>Already have an account?</h4>
          <button className='login button' onClick={() => setShowLogin(true)}>Sign in</button>
        </div>
      </div>
      <div className='splash-page bottom container'>
        <img className='splash-page cat-icon-2' src={WhiteCatIcon} alt="" />
      </div>
    </div>
  )
}

export default SplashPage
