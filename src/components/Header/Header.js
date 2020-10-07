import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const handleSignOut = () => {
        setLoggedInUser([{
            isSignedIn: false,
            name: '',
            email: ''
        }])
    }

    return (
        <div>
            <nav className="navbar navbar-light bg-dark">
                <div className='container'>
                    <Link to='/home' className="btn text-white font-weight-bold btn-outline-success">ToDo APPS - AS</Link>
                    <Link to='/login' onClick={handleSignOut} className="btn btn-outline-success text-white font-weight-bold my-2 my-sm-0" type="submit">{loggedInUser.email || loggedInUser.name ? `${loggedInUser.name}/Logout`: 'Login'}</Link>
                </div>
            </nav>
        </div>
    );
};

export default Header;