import { format, formatDistanceToNow } from 'date-fns'

const Tweet = ({ tweet }) => {
  const newDate = Date.parse(tweet.created_at);
  const formattedDate = formatDistanceToNow(newDate,{ includeSeconds: true })
  return (
    <div>
      <div>{tweet.id}</div>
      <div>{tweet.content}</div>
      <div>{formattedDate} ago</div>
    </div>
  )
}

export default Tweet
