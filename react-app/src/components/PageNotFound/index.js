import './PageNotFound.css'
import sadCat from '../../assets/images/sadCat.svg'

const PageNotFound = () => {
  return (
    <div className='page-not-found container'>
      <h1>404</h1>
      <h1 className='page-not-found'>Page Not Found</h1>
      <img className='sad-cat-icon' src={sadCat} alt="sad-cat" />
    </div>
  )
}

export default PageNotFound
