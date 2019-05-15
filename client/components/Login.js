import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';

// ref: https://www.djamware.com/post/5a90c37980aca7059c14297a/securing-mern-stack-web-application-using-passport
class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            message: ''
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    } 

    handleTextChange(event) {
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    onSubmit(event) {
        event.preventDefault();
        const { username, password } = this.state;
        axios.post('/login', { username, password })
            .then((result) => {
                localStorage.setItem('jwtToken', result.data.token);
                this.setState({ message: '' });
                this.props.history.push('/');
                //dispatch(setCurrentUser(result.data.token));
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.setState({ message: 'Login failed. Username or password not match' });
                }
        });
        //const userData = { username, password };
        //this.props.loginUser(userData);
    }

    render() {
        const { username, password, message } = this.state;

        return (
            <div class='Auth'>
                <div class="container">
                    <form class="form-signin" onSubmit={this.onSubmit}>
                        {message !== '' &&
                            <div class="alert alert-warning alert-dismissible" role="alert">
                                { message }
                            </div>
                        }
                        <h2 class="form-signin-heading">Sign in</h2>
                        <label for="inputEmail">Email address</label>
                        <input 
                            type="email" 
                            class="form-control" 
                            autoComplete="off" 
                            name="username" 
                            value={username} 
                            onChange={this.handleTextChange} required
                        />
                        <label for="inputPassword">Password</label>
                        <input 
                            type="password" 
                            class="form-control" 
                            autoComplete="off" 
                            name="password" 
                            value={password} 
                            onChange={this.handleTextChange} required
                        />
                        <button class="form-button" type="submit">Login</button>
                        <p>
                            Not a member? <Link to="/register"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Register here</Link>
                        </p>
                    </form>
                </div>  
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  }
  
  const mapStateToProps = state => ({
    auth: state.auth,
    message: state.message
  })
  
  export default Login;