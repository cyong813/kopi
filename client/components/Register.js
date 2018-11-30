import React, { Component } from 'react';
import axios from 'axios';

// ref: https://www.djamware.com/post/5a90c37980aca7059c14297a/securing-mern-stack-web-application-using-passport
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
                        <h2 class="form-signin-heading">Register</h2>
                        <label for="inputEmail" class="sr-only">Email address</label>
                        <input type="email" class="form-control" placeholder="Email address" name="username" value={username} onChange={this.handleTextChange} required/>
                        <label for="inputPassword" class="sr-only">Password</label>
                        <input type="password" class="form-control" placeholder="Password" name="password" value={password} onChange={this.handleTextChange} required/>
                        <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;