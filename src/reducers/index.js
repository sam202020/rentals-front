import { combineReducers } from 'redux'
import {
  LOCATION_CHANGE
} from '../actions'

function locationTracker(state = [], action) {
  switch (action.type) {
    case 'LOCATION_CHANGE':
      return [
        ...state,
        action.location
      ]
    default:
      return state
  }
}

const rootReducer = combineReducers({
  locationTracker
})

export default rootReducer
