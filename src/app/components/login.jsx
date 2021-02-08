import React from 'react';
import { connect } from 'react-redux';
import * as mutations from '../store/mutations';

const LoginComponent = ({authenticateUser, authenticated})=> {
    return <div style={{marginLeft: "30%", marginTop: "50px"}} className="card p-3 col-5">
        <h2>
            Login
        </h2>
        <form onSubmit={authenticateUser}>
            <input className="form-control" type="text" placeholder="username" name="username" defaultValue=""/> 
            <input className="form-control mt-2" type="password" placeholder="password" name="password" defaultValue=""/>
            {authenticated === mutations.NOT_AUTHENTICATED ? <p>Login Incorrect</p> : null}
            <button className="form-control mt-2 btn btn-primary" type="submit">Login</button>
        </form>
    </div>
};

const mapStateToProps = ({session}) => ({
    authenticated:session.authenticated
});

const mapDispatchToProps = (dispatch)=> ({
    authenticateUser(e) {
        e.preventDefault();
        let username = e.target[`username`].value;
        let password = e.target[`password`].value;
        dispatch(mutations.requestAuthenticateUser(username, password));
    }
})

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);