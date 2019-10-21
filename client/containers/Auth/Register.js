import React, { Component } from 'react';
import axios from 'axios';
import RegisterForm from '../../components/Auth/RegisterForm';

class Register extends Component {
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

        axios.post('/register', { username, password })
        .then((result) => {
            if (result.data.success) {
                this.setState({ message: 'Successful. Please log in!' })
                this.props.history.push('/login');
            }
            else {
                this.setState({ message: result.data.msg })
            }
        });
    }

    render() {
        return (
            <RegisterForm
                submitHandler={this.onSubmit}
                textChangeHandler={this.handleTextChange}
                message={this.state.message}
                username={this.state.username}
                password={this.state.password}    
            />
        );
    }
}

export default Register;