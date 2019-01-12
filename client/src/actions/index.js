import axios from 'axios';
import { FETCH_USER } from './types';

/** 
 * Using redux-thunk so that the function is only dispatched once the call is complete
 * 
 * Whenever the action creator is called, it will return a function
 * redux-thunk will return a function and automatically call it with a dispatch
 * We then make the request and wait until we get a response 
 * Once we get the response, then the action will be dispatched
*/

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};