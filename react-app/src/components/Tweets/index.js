import Tweet from './Tweet'

const Tweets = ({ tweets }) => {
  return (
    <div>
      {tweets.map(tweet => (
        <Tweet key={tweet.id} tweet={tweet}/>
      ))}
    </div>
  )
}

export default Tweets
