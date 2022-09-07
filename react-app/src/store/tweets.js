const GET_ALL_TWEETS = 'tweets/GET_ALL_TWEETS';
const CREATE_NEW_TWEET = 'tweets/CREATE_NEW_TWEETS'
const UPDATE_TWEET = 'tweets/UPDATE_TWEETS'


const getAllTweetsAction = (tweets) => ({
  type: GET_ALL_TWEETS,
  tweets
});

const createNewTweetAction = (tweet) => ({
  type: CREATE_NEW_TWEET,
  tweet
});

const updateTweetAction = (tweet) => ({
  type: UPDATE_TWEET,
  tweet
});



export const getAllTweetsThunk = () => async (dispatch) => {
  const response = await fetch('/api/tweets/home');

  if (response.ok) {
    const tweets = await response.json();
    await dispatch(getAllTweetsAction(tweets))
    return tweets;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const createNewTweetThunk = (content) => async (dispatch) => {
  const response = await fetch('/api/tweets', {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({content})
  });

  if (response.ok) {
    const tweet = await response.json();
    await dispatch(createNewTweetAction(tweet))
    return tweet;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const updateTweetThunk = (id, content) => async (dispatch) => {
  const response = await fetch(`/api/tweets/${id}`, {
    method: "PUT",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({content})
  });

  if (response.ok) {
    const tweet = await response.json();
    await dispatch(updateTweetAction(tweet))
    return tweet;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}




export default function tweetsReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_TWEETS: {
      const newState = {};
      action.tweets.tweets.forEach(tweet => {
        newState[tweet.id] = tweet
      });
      newState.tweetsList = [...action.tweets.tweets].sort(function(a,b){
        return new Date(b.created_at) - new Date(a.created_at);
      })
      return newState;
    }
    case CREATE_NEW_TWEET: {
      const newState = { ...state }
      newState[action.tweet.id] = action.tweet
      return newState
    }
    case UPDATE_TWEET: {
      const newState = { ...state }
      newState[action.tweet.id] = action.tweet
      return newState
    }
    default:
      return state;
  }
}
