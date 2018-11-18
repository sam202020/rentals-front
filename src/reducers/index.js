import {
  FETCHING_RENTALS,
  ERROR,
  FETCHED_RENTALS,
  ADDING_RENTALS,
  ADDED_RENTALS,
  GET_RENTAL_GROUP,
  SAVE_UI_STATE,
  GET_CURRENT_USER
} from '../actions';

const initialState = {
  rentalPortions: [],
  rentals: [],
  minPrice: null,
  maxPrice: null,
  minBeds: null,
  maxBeds: null,
  minBaths: null,
  maxBaths: null,
  fetchingRentals: false,
  fetchedRentals: false,
  addingRental: false,
  addedRental: false,
  groupCounter: 0,
  UIState: null,
  user: null
};

const rentalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
    case SAVE_UI_STATE:
      let UIState = Object.assign({}, state.UIState, { [action.id]: action.payload });
      return Object.assign({}, state, {
        UIState
      });
    case FETCHING_RENTALS:
      return Object.assign({}, state, {
        fetchingRentals: true
      });
    case FETCHED_RENTALS:
      const rentals = action.payload
      const rentalPortions = splitRentals(rentals);
      const {
        min,
        max,
        minBeds,
        maxBeds,
        minBaths,
        maxBaths
      } = minAndMaxValues(rentals)
      return Object.assign({}, state, {
        fetchingRentals: false,
        fetchedRentals: true,
        rentals,
        minPrice: min,
        maxPrice: max,
        minBeds,
        maxBeds,
        minBaths,
        maxBaths,
        rentalPortions
      });
    case GET_RENTAL_GROUP:
      const groupCounter = state.groupCounter + 1;
      return Object.assign({}, state, {
        groupCounter
      });
    case ERROR:
      return Object.assign({}, state, {
        fetchingRentals: false,
        addingRental: false,
        error: action.payload
      });
    default:
      return state;
  }
};

const splitRentals = rentals => {
  const arraySplit = [];
  const divideByTen = Math.floor(rentals.length / 10);
  let start = 0;
  let i = divideByTen;
  let newArr;
  while (rentals[i]) {
    newArr = rentals.slice(start, i);
    arraySplit.push(newArr);
    [start, i] = [i, i + divideByTen];
  }
  if (rentals[start]) {
    newArr = rentals.slice(start, rentals.length);
    arraySplit.push(newArr);
  }
  return arraySplit;
}

const minAndMaxValues = rentals => {
  let min;
  let max;
  let minBeds;
  let maxBeds;
  let minBaths
  let maxBaths;
  for (let i of rentals) {
    if (i.price) {
      min = i.price;
      max = i.price;
      break;
    }
  }
  for (let i of rentals) {
    if (i.bedrooms) {
      minBeds = parseInt(i.bedrooms)
      maxBeds = parseInt(i.bedrooms)
      break;
    }
  }
  for (let i of rentals) {
    if (i.baths) {
      minBaths = parseInt(i.baths)
      maxBaths = parseInt(i.baths)
      break;
    }
  }
  for (let i of rentals) {
    if (i.price && i.price > max) max = i.price;
    else if (i.price && i.price < min) min = i.price;
    if (parseInt(i.bedrooms) > maxBeds) maxBeds = parseInt(i.bedrooms);
    else if (parseInt(i.bedrooms) < minBeds) minBeds = parseInt(i.bedrooms);
    if (parseInt(i.baths) > maxBaths) maxBaths = parseInt(i.baths);
    else if (parseInt(i.baths) < minBaths) minBaths = parseInt(i.baths);
  }
  return {
    min: min,
    max: max,
    minBeds,
    maxBeds,
    minBaths,
    maxBaths
  };
}

export default rentalsReducer