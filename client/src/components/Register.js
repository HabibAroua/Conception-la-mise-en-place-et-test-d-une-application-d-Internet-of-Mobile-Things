import React , {Component} from 'react'
import axios from "axios";

class Register extends Component
{
    register(newUser)
    {
        return axios
            .post('http://localhost:5000/users/register',{
                first_name:newUser.first_name,
                last_name:newUser.last_name,
                email:newUser.email,
                password:newUser.password
            })
            .then(res =>{
                console.log("Registered")
                alert(res.data)
            })
    }
    constructor()
    {
        super();
        this.state =
            {
                first_name:'',
                last_name:'',
                email: '',
                password: '',
                confirmPassword:''
            }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e)
    {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e)
    {
        e.preventDefault();
        const user =
            {
                first_name: this.state.first_name,
                last_name:this.state.last_name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword:this.state.confirmPassword
            }
            if((user.first_name=="")&&( user.last_name=="")&&(user.email=="") && (user.password=="") && (user.confirmPassword==""))
            {
                alert("All values are empty");
            }
            else
            {

            }
        this.register(user).then(res =>
        {
            if (res)
            {
                alert("Registered")
                this.props.history('/login');
            }
            else
            {
                alert("error");
            }
        })
    }

    render()
    {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md mt-6 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-6 font-weight-normal">
                                Register
                            </h1>
                            <div className="form-group col-lg-6 col-md-3 col-sm-xs-12">
                                <label htmlFor="first_name">
                                    First name
                                </label>
                                <input type="text"
                                       className="form-control"
                                       name="first_name"
                                       placeholder="Enter your first name"
                                       value={this.state.first_name}
                                       onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group col-lg-6 col-md-3 col-sm-xs-12">
                                <label htmlFor="last_name">
                                    Last name
                                </label>
                                <input type="text"
                                       className="form-control"
                                       name="last_name"
                                       placeholder="Enter your last name"
                                       value={this.state.last_name}
                                       onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group col-lg-6 col-md-3 col-sm-xs-12">
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
                            <div className="form-group col-lg-6 col-md-3 col-sm-xs-12">
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
                            <div className="form-group col-lg-6 col-md-3 col-sm-xs-12">
                                <label htmlFor="password">
                                    Confirm your Password
                                </label>
                                <input type="password"
                                       className="form-control"
                                       name="confirmPassword"
                                       placeholder="Enter Password"
                                       value={this.state.confirmPassword}
                                       onChange={this.onChange}
                                />
                            </div>
                            <button type="submit"
                                    className="btn btn-lg btn-primary btn-block col-lg-3 col-md-3 col-sm-xs-12"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                    <div className="col-md mt-6 mx-auto">
                        <h1>Hello world</h1>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register;