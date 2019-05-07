import React ,{Component} from 'react';
import jwt_decode from 'jwt-decode';
import './style.css';

class Profile extends Component
{
    constructor()
    {
        super();
        this.state=
        {
            first_name:'',
            last_name:'',
            email:'',
            password:''
        }
    }

    showUpdate()
    {
        window.$("#updateInterface").show();
    }

    componentDidMount()
    {
        window.$("#updateInterface").hide();
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
        const userUpdate = (
            <center>
                <h1>Update Profile</h1>
            </center>
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
                                     <button  type="button" className="btn btn-primary btn-lg">Update Password</button>
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
                </div>
            </div>
        )
    }
}
export default Profile;