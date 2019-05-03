import React , {Component} from 'react';
import {Link , withRouter} from 'react-router-dom';

class Navbar extends Component
{
    logOut(e)
    {
        e.preventDefault();
        localStorage.removeItem('usertoken');
        this.props.history.push('/');
    }

    render()
    {
        const loginRegLink=(
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to='/login' className="nav-link">
                        Login           {localStorage.usertoken}

                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/login' className="nav-link">
                        Login User
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/map" className="nav-link">
                        Map
                    </Link>
                </li>
            </ul>
        )
        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        Users
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/statistics" className="nav-link">
                        Statistics
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/notification" className="nav-link">
                        Notifications
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/order" className="nav-link">
                        Order
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/map" className="nav-link">
                        Map
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                        Logout
                    </a>
                </li>
            </ul>
        )
        const userSimple = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/statistics" className="nav-link">
                        Statistics
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/notification" className="nav-link">
                        Notifications
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/order" className="nav-link">
                        Order
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/map" className="nav-link">
                        Map
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="" onClick={this.logOut.bind(this)} className="nav-link">
                        Logout
                    </a>
                </li>
            </ul>
        )
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
                <button className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbar1"
                        aria-controls="navbar1"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                >
                    <span className="navbar-toggle-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-md-center" id="navbar1">
                    <div>
                        <ul className="navbar-nav">
                            <li className="navbar-nav">
                                <Link to="/" className="nav-link">
                                    Home
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {localStorage.usertoken ? userLink: loginRegLink}
                </div>
            </nav>
        )
    }
}
export default withRouter(Navbar)