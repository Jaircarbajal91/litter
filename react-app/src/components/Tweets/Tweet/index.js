import { format, formatDistanceToNow } from 'date-fns'

const Tweet = ({ tweet }) => {
  const splitDate = tweet.updated_at.split(' ')
  const [day, date, month, year, time, zone] = splitDate
  let newDate = new Date(`${month} ${date}, ${year}, ${time}`)
  const pst = newDate.toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
  });
  newDate = new Date(pst)
  const formattedDate = formatDistanceToNow(
    newDate,
    { includeSeconds: true }
  )
  return (
    <div>
      <div>{tweet.id}</div>
      <div>{tweet.content}</div>
      <div>{formattedDate} ago</div>
    </div>
  )
}

export default Tweet
