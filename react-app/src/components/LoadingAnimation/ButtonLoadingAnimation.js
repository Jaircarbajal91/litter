import './ButtonLoadingAnimation.css'

const ButtonLoadingAnimation = () => {
  return (
    <div className='button-loading-animation-container'>
      <div className="lds-ring button">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default ButtonLoadingAnimation
