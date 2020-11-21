import * as ActionTypes from './ActionTypes';

//reducer
export const favorites = (state = [], action) => {
    switch (action.type) {

        case ActionTypes.DELETE_FAVORITE:
            return state.filter((favorite) => favorite !== action.payload);
        
        case ActionTypes.ADD_FAVORITE:
            //if the dish is already in the db
            if (state.some(el => el === action.payload))
                return state;//just return the state
            else
                return state.concat(action.payload);//add a new dish to favorites

        default:
          return state;
      }
};