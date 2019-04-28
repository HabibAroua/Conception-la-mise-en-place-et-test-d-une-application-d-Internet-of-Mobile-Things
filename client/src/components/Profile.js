import React ,{Component} from 'react';
import jwt_decode from 'jwt-decode';

class Profile extends Component
{
    constructor()
    {
        super();
        this.state=
            {
                first_name:'',
                last_name:'',
                email:''
            }
    }

    componentDidMount()
    {
        const token=localStorage.usertoken;
        const decode=jwt_decode(token);
        console.log("the token is "+token);
        console.log("the val is  "+decode.first_name);
        this.setState(
            {
                first_name: decode.first_name,
                last_name:decode.last_name,
                email:decode.email
            }
        );
    }

    render()
    {
        return(
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Profile</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                             <tr>
                                 <td>First Name</td>
                                 <td>{this.state.first_name}</td>
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
                </div>
            </div>
        )
    }
}
export default Profile;