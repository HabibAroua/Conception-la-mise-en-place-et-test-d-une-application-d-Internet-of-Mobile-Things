import React , {Component} from 'react'
import axios from "axios";

class Register extends Component
{
    register(newUser)
    {
        return axios
            .post('http://localhost:5000/users/register',
                {
                    first_name: newUser.first_name,
                    last_name: newUser.last_name,
                    email: newUser.email,
                    password: newUser.password
                })
            .then(res => {
                if (res.data == "x1") 
                {
                    window.Swal.fire
                    (
                        'Good job',
                        "User added ..",
                        'success'
                    )
                }
                else 
                {
                    if (res.data == "x2") 
                    {
                        window.Swal.fire
                        (
                            'Good job',
                            "User already exists",
                            'error'
                        )
                    }
                }
            })
    }

    delete(id)
    {
        return axios
            .post('http://localhost:5000/users/DeleteUser', {
                id: id
            })
            .then(res =>
            {
                window.Swal.fire(
                    'Deleted!',
                    res.data,
                    'success'
                )
            })
    }

    init_value(e) 
    {
        this.state.first_name = '';
        this.state.last_name = '';
        this.state.email = '';
        this.state.password = '';
        this.state.confirmPassword = '';
        this.setState({[e.target.name]: ''})

    }

    constructor() 
    {
        super();
        this.state =
            {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                confirmPassword: '',
                users: []
            }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.init_value = this.init_value.bind(this);
    }

    onDelete(id, e)
    {
        window.Swal.fire
        (
            {
                title: 'Are you sure?',
                text: "Do you want to delete this user?",
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }
        ).then((result) => 
        {
            if (result.value) 
            {
                this.delete(id).then(res => 
                {

                })
                window.location.reload();
            }
        })
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
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }
        if ((user.first_name == "") && (user.last_name == "") && (user.email == "") && (user.password == "") && (user.confirmPassword == ""))
        {
            window.Swal.fire
            (
                'Error!',
                "All valuess are empty",
                'error'
            )
        }
        else
        {
            if (user.first_name == "")
            {
                window.Swal.fire
                (
                    'Error!',
                    "The first name is empty",
                    'error'
                )
            }
            else
            {
                if (user.last_name == "")
                {
                    window.Swal.fire
                    (
                        'Error!',
                        "The last name is empty",
                        'error'
                    )
                }
                else
                {
                    if (user.email == "")
                    {
                        window.Swal.fire
                        (
                            'Error!',
                            "Email is empty",
                            'error'
                        )
                    }
                    else
                    {
                        if (user.password == "")
                        {
                            window.Swal.fire
                            (
                                'Error!',
                                "Password is empty",
                                'error'
                            )
                        }
                        else
                        {
                            if (user.confirmPassword == "")
                            {
                                window.Swal.fire
                                (
                                    'Error!',
                                    'You should confirm the password',
                                    'error'
                                )
                            }
                            else
                            {
                                if (this.IsEmail(user.email)==false)
                                {
                                    window.Swal.fire
                                    (
                                        'Error!',
                                        'Please enter a valid email',
                                        'error'
                                    )
                                }
                                else
                                {
                                    if (user.password != user.confirmPassword)
                                    {
                                        window.Swal.fire
                                        (
                                            'Error!',
                                            'your confirm password is not correct',
                                            'error'
                                        )
                                    }
                                    else
                                    {
                                        this.register(user).then(res => {

                                        })
                                        window.location.reload();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }


    componentDidMount()
    {
        axios.get("http://localhost:5000/users/AllSimpleUsers")
            .then(res=>
            {
                this.setState(
                    {
                        users : res.data
                    }
                )
            });
    }

    render()
    {
        const {users}=this.state;
        const userList=users.map(user=>
        {
            return (
                <tr>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>
                        <a href="#" className="btn btn-primary a-btn-slide-text"    onClick={this.onDelete.bind(this, user.id)}
                        >
                            <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                            <span><strong>Delete</strong></span>
                        </a>
                    </td>
                </tr>
            )
        })
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md mt-8 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="form-group col-lg-10 col-md-3 col-sm-xs-12">
                                <center>
                                    <h1 className="h3 mb-6 font-weight-normal">
                                        Add new user
                                    </h1>
                                </center>
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
                            <div className="form-group col-lg-10 col-md-3 col-sm-xs-12">
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
                            <div className="form-group col-lg-10 col-md-3 col-sm-xs-12">
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
                            <div className="form-group col-lg-10 col-md-3 col-sm-xs-12">
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
                            <div className="form-group col-lg-10 col-md-3 col-sm-xs-12">
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
                            <div className="form-group col-lg-4">
                                <table>
                                    <tr>
                                        <th>
                                            <button type="submit"
                                                    className="btn btn-lg btn-primary btn-block "
                                            >
                                                Add new user
                                            </button>
                                        </th>
                                        <th>
                                            <button type="reset"
                                                    className="btn btn-lg btn-primary btn-block "
                                                    onClick={this.init_value}
                                            >
                                                Init all values
                                            </button>
                                        </th>
                                    </tr>
                                </table>
                            </div>
                        </form>
                    </div>
                    <div className="col-md mt-8 mx-auto">
                        <div className="form-group col-lg-8 col-md-3 col-sm-xs-12">
                            <center>
                                <h4>List of users</h4>
                            </center>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userList}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register;
