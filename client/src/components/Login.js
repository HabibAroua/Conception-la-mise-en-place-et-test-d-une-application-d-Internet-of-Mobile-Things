import React , {Component} from 'react'
//import { login } from './UserFunctions'
import axios from "axios";


class Login extends Component
{
    login(user)
    {
        return axios
            .post('users/login',{
                email : user.email,
                password : user.password
            })
            .then(res =>
            {
                localStorage.setItem('usertoken',res.data)
                return res.data
            })
            .catch(err =>
            {
                console.log("error : "+err)
            })
    }
    constructor() {
        super()
        this.state =
            {
                email: '',
                password: ''
            }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        const user =
            {
                email: this.state.email,
                password: this.state.password
            }

        this.login(user).then(res => {
            e.preventDefault();
            if (res)
            {
                console.log("email and password are correct");
               //this.props.history.push('/profile')
                alert("email and password are correct");
                window.location.reload();
                document.location.href="http://localhost:3000/";

            }
            else
            {
                alert("email and password are not correct")
                console.log("email and password are not correct");
            }
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">
                                Please sign in
                            </h1>
                            <div className="form-group">
                                <label htmlFor="email">
                                    Email Address
                                </label>
                                <input type="email"
                                       className="form-control"
                                       name="email"
                                       placeholder="Enter Email"
                                       value={this.state.email}
                                       onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input type="password"
                                       className="form-control"
                                       name="password"
                                       placeholder="Enter Password"
                                       value={this.state.password}
                                       onChange={this.onChange}
                                />
                            </div>
                            <button type="submit"
                                    className="btn btn-lg btn-primary btn-block"
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;