import axios from 'axios';

export const FETCHING_RENTALS = 'FETCHING_RENTALS';
export const FETCHED_RENTALS = 'FETCHED_RENTALS';
export const ADDING_RENTALS = 'ADDING_RENTALS';
export const ADDED_RENTALS = 'ADDED_RENTALS';
export const GET_RENTAL_GROUP = 'GET_RENTAL_GROUP';
export const ERROR = 'ERROR';

export const fetchRentals = () => {
  const getRentals = axios.get('http://localhost:3001/rentals');
  return dispatch => {
    dispatch({
      type: FETCHING_RENTALS
    });
    getRentals
      .then(response => {
        dispatch({
          type: FETCHED_RENTALS,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: {
            'Error': err.message
          }
        });
      });
  };
};

// export const addSmurf = smurf => {
//   const postSmurf = axios.post('http://localhost:3333/smurfs', { 
//     name: smurf.name,
//     age: smurf.age,
//     height: smurf.height
//   });
//   return dispatch => {
//     dispatch({ type: ADDING_SMURF }); 
//     postSmurf
//       .then(resolve => {
//           dispatch({ type: ADDED_SMURF, payload: resolve.data });
//       })
//       .catch(err => {
//         dispatch({
//             type: ERROR,
//             payload: 'Error Adding Smurfs'
//         });
//     });
//   };
// };