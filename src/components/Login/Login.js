import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
    // context api 
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    // state for show error message to user
    const [error, setError] = useState('')

    // handle redirect 
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/home" } };

    // handle google sign in
    const handleGoogleSignIn = () => {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(result => {
            const { displayName: name, email } = result.user;
            setLoggedInUser({
                isSignedIn: true,
                email: email,
                name: name
            })
            // redirect to request route
            history.replace(from);
        }).catch(error => {
            setError(error.message)
        });
    }

    return (
        <div>
            <Header />
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <div className='border border-rounded p-5 mt-5'>
                    <button onClick={handleGoogleSignIn} className="btn btn-outline-dark"><img height="25px" className='mr-3' src='https://i.ibb.co/Fsnmqy3/google.png' alt='google-icon' />Sign in with Google</button>
                </div>
                <div>
                    <p className='text-danger text-center font-weight-bold mt-3'>{error}</p>
                </div>
            </div>
        </div>
    );
};

export default Login;