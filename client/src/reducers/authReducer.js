// Determines whether or not the user is logged in

import { FETCH_USER } from '../actions/types';

// null, by default, we don't know if user is logged in or not 
export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
        // This way, it will return null, the user model, or false (not logged in)
            return action.payload || false;
        default:
            return state;
    }
}