import { SET_CURRENT_USER } from '../actions/types';

const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

const initialState = {
    isAuthed: false,
    user: {}
};
  
export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                //...state,
                isAuthed: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state
    }
};