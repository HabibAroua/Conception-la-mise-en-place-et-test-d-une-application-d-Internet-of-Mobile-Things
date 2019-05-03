import React , {Component} from 'react'
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

    onChange(e)
    {
        this.setState({[e.target.name]: e.target.value})
    }
    IsEmail(email)
    {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    onSubmit(e)
    {
        e.preventDefault();
        const user =
            {
                email: this.state.email,
                password: this.state.password
            }

        if((user.email=="")&&(user.password==""))
            {
                alert("Email and password are empty");
            }
            else
            {
                if(user.email=="")
                {
                    alert("Email is empty");
                }
                else
                {
                    if(user.password=="")
                    {
                        alert("Password is empty");
                    }
                    else
                    {
                        if(!this.IsEmail(user.email))
                        {
                            alert("Please write a valid email");
                        }
                        else
                        {
                            this.login(user).then(res =>
                            {
                                e.preventDefault();
                                alert(res);
                                if (res)
                                {
                                    this.props.history.push('/profile')
                                    alert("email and password are correct");
                                    document.location.href="http://localhost:3000/";
                                }
                                else
                                {
                                    if(res==null)
                                    {
                                        alert("email and password are not correct")
                                        console.log("email and password are not correct");
                                    }
                                }
                            })
                        }
                    }
                }
            }
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
                                       required
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
                                       required
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