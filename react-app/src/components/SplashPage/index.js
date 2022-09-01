import { useHistory } from 'react-router-dom'
import WhiteCatIcon from '../../assets/images/WhiteCatIcon.svg'
import './SpashPage.css'

const SplashPage = () => {
  const history = useHistory()

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
        <button className='signup button' onClick={() => history.push('/signup')}>Create account</button>
        <div className='signin container'>
          <h4>Already have an account?</h4>
          <button className='login button' onClick={() => history.push('/login')}>Sign in</button>
        </div>
      </div>
      <div className='splash-page bottom container'>
        <img className='splash-page cat-icon-2' src={WhiteCatIcon} alt="" />
      </div>
    </div>
  )
}

export default SplashPage
