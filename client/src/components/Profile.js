import React ,{Component} from 'react';
import jwt_decode from 'jwt-decode';
import './style.css';
import axios from "axios";

class Profile extends Component
{
    updateInformation(newUser)
    {
        return axios
            .post('http://localhost:5000/users/updateUsers',{
                first_name:newUser.first_name,
                last_name:newUser.last_name,
                email:newUser.email
            })
            .then(res =>
            {
                window.Swal.fire
                (
                    'Good job!',
                    res.data,
                    'success'
                )
            })
    }

    updatePassword(newUser)
    {
        return axios
            .post('http://localhost:5000/users/updateUsersPassword',{
                email:this.state.email,
                password:newUser.oldPassword,
                cryptPassword:this.state.password,
                newPassword:this.state.newPassword
            })
            .then(res =>
            {
                if(res.data=="x1")
                {
                    window.Swal.fire
                    (
                        'Good job!',
                        'Password updated',
                        'success'
                    )
                }
                else
                {
                    if(res.data=="x2")
                    {
                        window.Swal.fire
                        (
                            'Error!',
                            'Password is not correct',
                            'error'

                        )
                    }
                }
            })
    }


    constructor()
    {
        super();
        this.state=
        {
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            oldPassword:'',
            newPassword:'',
            confirmPassword:''
        }
        this.onChange = this.onChange.bind(this);
        this.btUpdate = this.btUpdate.bind(this);
        this.btUpdatePassword =this.btUpdatePassword.bind(this);
    }

    onChange(e)
    {
        this.setState({[e.target.name]: e.target.value})
    }

    btUpdate()
    {
        const newUser=
        {
            first_name: this.state.first_name,
            last_name:this.state.last_name,
            email: this.state.email
        }
        if((newUser.first_name=="") && (newUser.last_name==""))
        {
            window.Swal.fire
            (
                'Error',
                'All values are empty',
                'error'
            )
        }
        else
        {
            if(newUser.first_name=="")
            {
                window.Swal.fire
                (
                    'Error',
                    'Your first name is empty',
                    'error'
                )
            }
            else
            {
                if(newUser.last_name=="")
                {
                    window.Swal.fire
                    (
                        'Error',
                        'Your last name is empty ',
                        'error'
                    )
                }
                else
                {
                    this.updateInformation(newUser).then(res =>
                    {

                    })
                    localStorage.removeItem('usertoken');
                    this.props.history.push('/');
                }
            }
        }
    }

    btUpdatePassword()
    {
        const newUser=
        {
            oldPassword: this.state.oldPassword,
            newPassword:this.state.newPassword,
            confirmPassword: this.state.confirmPassword
        }

        if((newUser.oldPassword=="") && (newUser.newPassword=="") && (newUser.confirmPassword==""))
        {
            window.Swal.fire
            (
                'Error!',
                "All values are empty",
                'error'
            )
        }
        else
        {
            if(newUser.oldPassword=="")
            {
                window.Swal.fire
                (
                    'Error!',
                    "You should enter your old password",
                    'error'
                )
            }
            else
            {
                if(newUser.newPassword=="")
                {
                    window.Swal.fire
                    (
                        'Error!',
                        "You should enter your new password",
                        'error'
                    )
                }
                else
                {
                    if(newUser.newPassword!=newUser.confirmPassword)
                    {
                        window.Swal.fire
                        (
                            'Error!',
                            "your confirm password is not correct",
                            'error'
                        )
                    }
                    else
                    {
                        if(newUser.confirmPassword=="")
                        {
                            window.Swal.fire
                            (
                                'Error!',
                                "You should confirm your new password",
                                'error'
                            )
                        }
                        else
                        {
                            this.updatePassword(newUser).then(res =>
                            {

                            })
                            localStorage.removeItem('usertoken');
                            this.props.history.push('/');
                        }
                    }
                }
            }
        }
    }


    showUpdate()
    {
        window.$("#updateInterface").show();
        window.$("#updatePassword").hide();
    }

    showUpdatePassword()
    {
        window.$("#updatePassword").show();
        window.$("#updateInterface").hide();
    }

    componentDidMount()
    {
        window.$("#updateInterface").hide();
        window.$("#updatePassword").hide();
        const token=localStorage.usertoken;
        const decode=jwt_decode(token);
        console.log("the token is "+token);
        console.log("the val is  "+decode.first_name);
        this.setState(
            {
                first_name: decode.first_name,
                last_name:decode.last_name,
                email:decode.email,
                password:decode.password
            }
        );
    }

    render()
    {
        const updatePassword=
            (
                <div>
                    <h5>Update my password</h5>
                    <table>
                        <tr>
                            <td><input type="password" placeholder="Old Password" name="oldPassword" value={this.state.oldPassword} onChange={this.onChange} /> </td>
                            <td>  </td>
                            <td><input type="password" placeholder="New Password" name="newPassword" value={this.state.newPassword} onChange={this.onChange}/></td>
                            <td>  </td>
                            <td><input type="password" placeholder="Confirm Password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.onChange} /></td>
                            <td>  </td>
                            <td>
                                <button   type="button" className="btn btn-primary btn-sm" onClick={this.btUpdatePassword}>Submit</button>
                            </td>
                        </tr>
                    </table>
                </div>

            );
        const userUpdate = (
            <div>
                <h5>Update my infos</h5>
                <table>
                    <tr>
                        <td><input type="text" placeholder="First Name" name="first_name" value={this.state.first_name}  onChange={this.onChange} /> </td>
                        <td><input type="text" placeholder="Last Name"  name="last_name"  value={this.state.last_name}   onChange={this.onChange} /></td>
                        <td>
                            <button   type="button" className="btn btn-primary btn-sm" onClick={this.btUpdate}>Submit</button>
                        </td>
                    </tr>
                </table>
            </div>
        );
        return(
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-6 mx-auto">
                        <h1 className="text-center">Profile</h1>
                    </div>
                    <table className="table col-md-4 mx-auto">
                        <tbody>
                             <tr>
                                 <td>First Name</td>
                                 <td>{this.state.first_name}</td>
                                 <td>
                                     <button onClick={this.showUpdate}  type="button" className="btn btn-primary btn-lg">Update Info</button>
                                 </td>
                                 <td>
                                     <button onClick={this.showUpdatePassword} type="button" className="tn btn-secondary btn-lg">Update Password</button>
                                 </td>
                             </tr>
                             <tr>
                                 <td>Last Name</td>
                                 <td>{this.state.last_name}</td>
                             </tr>
                             <tr>
                                 <td>Email</td>
                                 <td>{this.state.email}</td>
                             </tr>
                        </tbody>
                    </table>
                    <p>{this.state.password}</p>
                    <div id="updateInterface">
                        {userUpdate}
                    </div>
                    <div id="updatePassword">
                        {updatePassword}
                    </div>
                </div>
            </div>
        )
    }
}
export default Profile;