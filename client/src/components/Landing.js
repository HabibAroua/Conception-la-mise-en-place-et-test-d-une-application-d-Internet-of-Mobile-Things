import React , {Component} from 'react'
import './style.css'
class Landing extends Component
{
    render()
    {
        return (
            <div className="container">
                <div className="jumbotrom mt-5">
                    <h1 className="text-center">Welcome</h1>
                    <div id="slider">
                        <figure>
                            <img src={require('../images/iot3.jpg')} />
                            <img src={require('../images/iot1.jpg')} />
                            <img src={require('../images/iot5.jpg')} />
                            <img src={require('../images/iot5.jpg')} />
                            <img src={require('../images/iot.4.jpg')} />
                        </figure>
                    </div>
                </div>
            </div>
        )
    }
}
export default Landing