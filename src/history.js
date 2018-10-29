import createHistory from "history/createBrowserHistory"
import { locationChange } from './actions'
import { connect } from 'react-redux';

const history = createHistory()

const location = history.location

const unlisten = history.listen((location, action) => {
    console.log(location.pathname)
})

// function getLocation(state) {
//     return state;
//   }  

//   const mapDispatchToProps = (dispatch) => {
//     return {
//       onLoad: (locationPath) => {
//         dispatch(locationChange(locationPath))
//       }
//     }
//   }

export default history;