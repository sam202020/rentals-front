export const REQUEST_RENTALS = 'REQUEST_RENTALS'

export const RECEIVE_RENTALS = 'RECEIVE_RENTALS'

export const ADD_RENTAL = 'ADD_RENTAL'

export const SELECT_RENTAL = 'SELECT_RENTAL'

export const selectRental = rental => {
    return {
      type: SELECT_SUBREDDIT,
      rental
    }
  }

export const addRental = rental => ({
    type: ADD_RENTAL,
    rental
})

export const requestRentals = page => ({
  type: REQUEST_RENTALS,
  page
})

export const receiveRentals = (page, json) => ({
  type: RECEIVE_RENTALS,
  page,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

const fetchPosts = page => dispatch => {
  dispatch(requestPosts(page))
  return fetch(`https://www.reddit.com/r/${page}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(subreddit, json)))
}

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPosts(subreddit))
  }
}
