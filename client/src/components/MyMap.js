import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from "axios";

export class MyMap extends  React.Component
{
    state =
        {
            objects : []
        }
    handleClick(param1,param2, e)
    {
        window.Swal.fire(
            'Wording : '+param1+'\n State : '+param2+'% \n',
            '',
            'info'
        )
    }
    componentDidMount()
    {
        axios.get("http://localhost:5000/objects/AllObjects")
            .then(res=>
            {
                console.log(res.data);
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
                <Marker
                    title={object.wording}
                    name={object.id}
                    position={{lat: object.latitude, lng: object.longitude}}
                    onClick={this.handleClick.bind(this, object.wording,object.state)}
                />
            )
        })

        return(
            <div style={{width: '50px', height: '50px'}}>
                <Map google={this.props.google}

                     className={'map'}
                     zoom={10}
                     initialCenter={{
                         lat: 36.897929,
                         lng: 370.192633
                     }}
                >
                    {objectList}
                </Map>
            </div>
        )
    }
}
export default GoogleApiWrapper
(
    {
        //AIzaSyBSsKUzYG_Wz7u2qL6unHqfBOmvaZ0H1Mg&callback essai
        apiKey: ("AIzaSyBSsKUzYG_Wz7u2qL6unHqfBOmvaZ0H1Mg&callback")
        //AIzaSyBlHN35O4hFNNf1CqMF7AncCLAjkNREQvE imen
    }
)
(MyMap)