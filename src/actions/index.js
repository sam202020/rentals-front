import axios from 'axios';

export const FETCHING_RENTALS = 'FETCHING_RENTALS';
export const FETCHED_RENTALS = 'FETCHED_RENTALS';
export const ADDING_RENTALS = 'ADDING_RENTALS';
export const ADDED_RENTALS = 'ADDED_RENTALS';
export const GET_RENTAL_GROUP = 'GET_RENTAL_GROUP';
export const ERROR = 'ERROR';
export const SAVE_UI_STATE = 'SAVE_UI_STATE';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';

export const saveCurrentUser = (user) => {
  return dispatch => {
    dispatch({
      type: GET_CURRENT_USER,
      payload: user,
    })
  }
};


export const saveUIState = (UIState, id) => {
  return dispatch => {
    dispatch({
      type: SAVE_UI_STATE,
      payload: UIState,
      id
    })
  }
};

export const fetchRentals = () => {
  const getRentals = axios.get('https://rentals-api.azurewebsites.net/rentals');
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