import React from 'react';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MyMap extends  React.Component
{
    render()
    {
        var points = [
            { lat: 36.8975331, lng: 10.1926377 },
            { lat: 36.8975331, lng: 10.1926377 },
            { lat: 36.8975331, lng: 10.1926377 },
            { lat: 36.8975331, lng: 10.1926377 }
        ]
        var bounds = new this.props.google.maps.LatLngBounds();
        for (var i = 0; i < points.length; i++)
        {
            bounds.extend(points[i]);
        }
        return(
            <div style={{width: '50px', height: '50px'}}>
                <Map google={this.props.google}

                     className={'map'}
                     zoom={10}>
                    <Marker
                        title={'The marker`s title will appear as a tooltip.'}
                        name={'SOMA'}
                        position={{lat: 36.8975331, lng: 10.1926377}} />
                    <Marker
                        title={'The marker`s title will appear as a '}
                        name={'Dolores park'}
                        position={{lat: 36.8975731, lng: 10.1926577}} />
                    <Marker />
                    <Marker
                        title={'This is Tunisia'}
                        name={'Tunisia'}
                        position={{lat: 36.8975331, lng: 10.1928377}} />
                    <Marker
                        title={'The marker`s title wvxvxvx'}
                        name={'Your position'}
                        position={{lat: 36.8975331, lng: 10.1926389}}
                        icon=
                            {
                                {
                                    url: "/path/to/custom_icon.png",
                                    anchor: new window.google.maps.Point(32,32),
                                    scaledSize: new window.google.maps.Size(64,64)
                                }
                            }
                    />
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