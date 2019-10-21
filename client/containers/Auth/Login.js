import React, { Component } from 'react';
import axios from 'axios';
import LoginForm from '../../components/Auth/LoginForm';

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
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.setState({ message: 'Login failed. Username or password not match' });
                }
        });
    }

    render() {
        return (
            <LoginForm
                submitHandler={this.onSubmit}
                textChangeHandler={this.handleTextChange}
                message={this.state.message}
                username={this.state.username}
                password={this.state.password}    
            />
        );
    }
}
  
export default Login;