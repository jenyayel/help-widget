import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
// import { DonutChart } from "bizcharts";
import { h, Fragment } from 'preact';
import {VictoryPie, VictoryAnimation, VictoryLabel } from 'victory';



class Score extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props.data)
        this.state = {
            percent: 25, 
            data: this.getData(0),
            newData: props.data
        };
    }

    componentDidMount() {

        // console.log(this.state.data)

        let percent = this.props.data.bilic_rating;
        // this.setStateInterval = window.setInterval(() => {
        //     percent += (Math.random() * 25);
        //     percent = (percent > 100) ? 0 : percent;
        //     this.setState({
        //         percent, data: this.getData(percent)
        //     });
        // }, 2000);

        this.setState({
            percent, data: this.getData(percent)
        })
    }

    componentWillUnmount() {
        window.clearInterval(this.setStateInterval);
    }

    getData(percent) {
        return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
    }

    render() {

        let chartData = this.props.data;
        let score = Math.round(100 - chartData.bilic_rating)

        return (
            <div>
                <svg viewBox="0 0 400 400" width="100%" height="100%">
                    <VictoryPie
                        standalone={false}
                        animate={{ duration: 1000 }}
                        width={400} height={400}
                        // data={this.state.data}
                        data={[{ x: 1, y: score }, { x: 2, y: 100 - score }]}
                        innerRadius={120}
                        cornerRadius={25}
                        labels={() => null}
                        style={{
                            data: {
                                fill: ({ datum }) => {
                                    const color = datum.y > 30 ? "red" : "green";
                                    return datum.x === 1 ? color : "transparent";
                                }
                            }
                        }}
                    />
                    <VictoryAnimation duration={1000} data={this.state}>
                        {(newProps) => {
                            return (
                                <>
                                <VictoryLabel
                                    textAnchor="middle" verticalAnchor="middle"
                                    x={200} y={200}
                                    // text={`Risk Score ${Math.round(newProps.percent)}`}
                                    text={`Risk Score ${score}`}
                                    style={{ fontSize: 30, fill: (score > 30 ? "red" : "green")}}
                                    // style={{ data: { fontSize: 40, stroke: "#68ba38" } }}
                                />
                                </>

                            );
                        }}
                    </VictoryAnimation>
                </svg>
            </div>
        );
    }
}

export default Score;