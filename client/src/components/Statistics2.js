import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

class Statistics2 extends Component
{
    constructor(props)
    {

        super(props);

        this.state =
            {
                options:
                    {
                        chart:
                            {
                                id: "basic-bar"
                            },
                        xaxis:
                            {
                                categories: []
                            }
                    },
                series:
                    [
                        {
                            name: "series-1",
                            data: []
                        }
                    ]
            };
    }

    componentDidMount()
    {
        var tabCat=[];
        var tabVal=[];


        axios.get("http://localhost:5000/objects/AllWording")
            .then(res =>
            {
                window.$.getJSON("http://localhost:5000/objects/AllWording", {}, function (data)
                {
                    //var $ul = window.$('#ul')
                    window.$.each(data, function (idx, item)
                    {
                        tabCat.push(item.wording)
                        tabVal.push(item.taux)
                    })
                });
            })

        this.setState(
            {
                options:
                    {
                        xaxis:
                            {
                                categories: tabCat
                            }
                    },
                series:
                    [
                        {
                            data:tabVal
                        }
                    ]
            }
        )
    }

    render()
    {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="bar"
                            width="500"
                        />
                        <center>
                            <h6><strong>Figure N°2 :</strong>Label according to (state/init State)*100</h6>
                        </center>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Statistics2
