import './LoadingAnimation.css'

const LoadingAnimation = () => {
  return (
    <div className='loading-animation-container'>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default LoadingAnimation
