import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
// import { DonutChart } from "bizcharts";
import { h, Fragment } from 'preact';
import { VictoryPie, VictoryLabel } from 'victory';

const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
];

class Gauge extends React.Component {
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            data: props.data
        };
    }

    render() {
        return (
            <svg viewBox="0 0 400 400">
                <VictoryPie
                    standalone={false}
                    width={400} height={400}
                    data={[
                        { x: 1, y: 120 }, { x: 2, y: 150 }, { x: 3, y: 75 }
                    ]}
                    innerRadius={68} labelRadius={100}
                    style={{ labels: { fontSize: 20, fill: "white" } }}
                />
                <VictoryLabel
                    textAnchor="middle"
                    style={{ fontSize: 20 }}
                    x={200} y={200}
                    text="Pie!"
                />
            </svg>
        );
    }
}

//   ReactDOM.render(<App/>, mountNode);

export default Gauge