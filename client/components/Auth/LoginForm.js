import React from 'react';
import { Link } from 'react-router-dom';

const loginForm = (props) => (
    <div class='Auth'>
        <div class='container'>
            <form class='form-signin' onSubmit={ props.submitHandler }>
                {props.message !== '' &&
                    <div class='alert alert-warning alert-dismissible' role='alert'>
                        { props.message }
                    </div>
                }
                <h2 class='form-signin-heading'>Sign in</h2>
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
                <button class='form-button' type='submit'>Login</button>
                <p>
                    Not a member? <Link to='/register'><span class='glyphicon glyphicon-plus-sign' aria-hidden='true' /> Register here</Link>
                </p>
            </form>
        </div>  
    </div>
);

export default loginForm;