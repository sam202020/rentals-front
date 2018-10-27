import { combineReducers } from 'redux'
import {
    REQUEST_RENTALS, RECEIVE_RENTALS, ADD_RENTAL, SELECT_RENTAL
} from '../actions'

// const selectedSubreddit = (state = 'reactjs', action) => {
//   switch (action.type) {
//     case SELECT_SUBREDDIT:
//       return action.subreddit
//     default:
//       return state
//   }
// }

const rentals = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    // case INVALIDATE_SUBREDDIT:
    //   return {
    //     ...state,
    //     didInvalidate: true
    //   }
    case REQUEST_RENTALS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_RENTALS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
      case ADD_RENTAL:
        return {
          ...state,
          isFetching: true,
        }
    default:
      return state
  }
}

const postsBySubreddit = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
})

export default rootReducer
