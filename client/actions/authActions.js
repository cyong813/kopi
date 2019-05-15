import { GET_MESSAGE, SET_CURRENT_USER } from './types';
import axios from 'axios';

// Login
export const loginUser = userData => dispatch => {
    axios.post('/login', userData)
        .then((result) => {
            localStorage.setItem('jwtToken', result.data.token);
            // this.setState({ message: '' });
            // this.props.history.push('/');
            dispatch(setCurrentUser(result.data.token));
        })
        .catch((error) => {
            dispatch({
                type: GET_MESSAGE,
                payload: error.response.data
            });
            // if (error.response.status === 401) {
            //     this.setState({ message: 'Login failed. Username or password not match' });
            // }
    });
};

export const setCurrentUser = token => {
    return {
      type: SET_CURRENT_USER,
      payload: token
    }
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch(setCurrentUser({}));
    window.location.reload();
};