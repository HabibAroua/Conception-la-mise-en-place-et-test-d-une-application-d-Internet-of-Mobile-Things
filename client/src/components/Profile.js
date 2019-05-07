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

    constructor()
    {
        super();
        this.state=
        {
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            newPassword:'',
            confirmPassword:''
        }
        this.onChange = this.onChange.bind(this);
        this.btUpdate = this.btUpdate.bind(this);
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
        this.updateInformation(newUser).then(res =>
        {

        })
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
                            <td><input type="text" placeholder="Old Password" /> </td>
                            <td>  </td>
                            <td><input type="text" placeholder="New Password" /></td>
                            <td>  </td>
                            <td><input type="text" placeholder="Confirm Password" /></td>
                            <td>  </td>
                            <td>
                                <button   type="button" className="btn btn-primary btn-sm">Submit</button>
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
                    <p>{this.state.first_name}</p>
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