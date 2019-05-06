import React , {Component} from "react";
import axios from "axios";

class AllObjects extends Component
{
    state =
        {
            objects : []
        }
    componentDidMount()
    {
        axios.get("http://localhost:5000/objects/AllObjects")
            .then(res=>
            {
                this.setState(
                    {
                        objects : res.data
                    }
                )
            });
    }

    render()
    {
        const {objects}=this.state;
        const objectList=objects.map(object=>
        {
            return (
                <tr>
                    <td>{object.id}</td>
                    <td>{object.wording}</td>
                    <td>{object.state}</td>
                    <td>{object.latitude}</td>
                    <td>{object.longitude}</td>
                </tr>
            )
        })
        return(
            <div>
                <div>
                    <center>
                        <h1>All Objects</h1>
                    </center>
                    <table class="table table-striped ">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Wording</th>
                                <th>State</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                            </tr>
                        </thead>
                        <tbody>
                            {objectList}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default AllObjects;
