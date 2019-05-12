import React ,{Component} from 'react';
import jwt_decode from 'jwt-decode';
import './style.css';

class Notification extends Component {
    constructor() {
        super();
        this.state =
            {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            }
    }

    componentDidMount() {
        const token = localStorage.usertoken;
        const decode = jwt_decode(token);
        console.log("the token is " + token);
        console.log("the val is  " + decode.first_name);
        this.setState(
            {
                first_name: decode.first_name,
                last_name: decode.last_name,
                email: decode.email,
                password: decode.password
            }
        );
    }

    render() {
        return(
            <div>
                <p>the email is {this.state.email}</p>
            </div>
        )

    }
}

export default Notification;