import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const registerForm = (props) => (
    <div class='Auth'>
        <div class='container'>
            <form class='form-signin' onSubmit={ props.submitHandler }>
                {props.message !== '' &&
                    <div class='alert alert-warning alert-dismissible' role='alert'>
                        { props.message }
                    </div>
                }
                <h2 class='form-signin-heading'>Register</h2>
                <label for='inputEmail'>Email address</label>
                <input 
                    type='email' 
                    class='form-control' 
                    autoComplete='off' 
                    name='username' 
                    value={ props.username } 
                    onChange={ props.textChangeHandler } required
                />
                <label for='inputPassword'>Password</label>
                <input 
                    type='password' 
                    class='form-control' 
                    autoComplete='off' 
                    name='password' 
                    value={ props.password } 
                    onChange={ props.textChangeHandler } required
                />
                <button class='form-button' type='submit'>Register</button>
                <p>
                    Already a member? <Link to='/login'><span class='glyphicon glyphicon-plus-sign' aria-hidden='true' /> Sign In</Link>
                </p>
            </form>
        </div>
    </div>
);

registerForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    submitHandler: PropTypes.func.isRequired,
    textChangeHandler: PropTypes.func.isRequired
};

export default registerForm;