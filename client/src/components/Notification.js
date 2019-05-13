import React ,{Component} from 'react';
import jwt_decode from 'jwt-decode';
import './style.css';
import axios from "axios";

class Notification extends Component
{
    state=
        {
            id:'',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            notifications:[]
        }

    componentDidMount()
    {

        const token = localStorage.usertoken;
        const decode = jwt_decode(token);
        console.log("the token is " + token);
        console.log("the val is  " + decode.first_name);
        this.setState(
            {
                id:decode.id,
                first_name: decode.first_name,
                last_name: decode.last_name,
                email: decode.email,
                password: decode.password
            }
        );

        axios.post("http://localhost:5000/notifications/getAllNotification",{
            idu : decode.id
        })
            .then(res=>
            {
                alert(res.data);
                this.setState(
                    {
                        notifications : res.data
                    }
                )
            });
    }

    onDelete(e,id)
    {

    }

    render()
    {
        const {notifications}=this.state;
        const notificationList=notifications.map(notification=>{
            return(
                <tr>
                    <td>{notification.id}</td>
                    <td>{notification.title}</td>
                    <td>{notification.content}</td>
                    <td>
                        <a href="#" className="btn btn-primary a-btn-slide-text"    onClick={this.onDelete.bind(this, notification.id)}
                        >
                            <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                            <span><strong>Delete</strong></span>
                        </a>
                    </td>
                </tr>
            )
        })
        return(
            <div>
                <p>the email is {this.state.id}</p>
                <table className="table table-striped ">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {notificationList}
                    </tbody>
                </table>
            </div>
        )

    }
}

export default Notification;