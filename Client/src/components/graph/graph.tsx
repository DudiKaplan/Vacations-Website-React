import React, { Component } from "react";
import "./graph.css";
import {Bar} from 'react-chartjs-2';
import { Headline } from "../headline/headline";

interface GraphState{
    chartData:{};
}

export class Graph extends Component<any,GraphState>{

    
    public constructor(props: any) {
        super(props);
        this.state = {
            chartData: {}
        };
    }
    private setDataToState = ():void =>{

        let labels = [];
        let data = [];
        let backgroundColor =[];
        fetch("http://localhost:3001/api/vacations")
            .then(response => response.json())
            .then(vacations => {
                for (let item of vacations) {

                    fetch("http://localhost:3001/api/followers/" + item.vacationID)
                    .then(response => response.json())
                    .then(follow => {
                        if(follow.followers > 0){
                            labels.push(item.destination);
                            data.push(follow.followers);
                            backgroundColor.push(this.randomColor());
                        }
                    })
                    .catch(err => alert(err));
                    
                };
                const chartData = {
                    labels:labels,
                    datasets: [{
                        label: ["Followers"],
                        backgroundColor: backgroundColor,
                        borderColor: 'rgb(255, 255, 255)',
                        data:data,
                        }]
                }
                setTimeout(() => {
                    this.setState({chartData:chartData});
                }, 100);
                
            })
            .catch(err => alert(err));

    }
    public componentDidMount():void{
        this.setDataToState();
    }

    private randomColor():string{
        const r = Math.floor(Math.random() * 255) +1;
        const g = Math.floor(Math.random() * 255) +1;
        const b = Math.floor(Math.random() * 255) +1;
        return `rgb(${r},${g},${b})`

    }
    
    public render():JSX.Element{
        return(
            <div className="graph">
                <Headline>Vacation Graph</Headline>
                <div className="chart">
                <Bar
                    data={this.state.chartData}
                    options={{
                        maintainAspectRatio: false
                    }}
                    height={350}
                    width={400} />
                </div>
            </div>
        )
    }
}