import React, { Component } from "react";
import "./followCounter.css";
import io from "socket.io-client";
import { store } from "../../redux/store";

interface FollowCounterProps{
    vacationID: number;
}
interface FollowCounterState{
    counter: number;
}

export class FollowCounter extends Component<FollowCounterProps,FollowCounterState>{

    private socket = io.connect("http://localhost:3002");

    public constructor(props: any) {
        super(props);
        this.state = {
            counter:0
        };

        this.socket.on("follow-added", follow => {
            if(follow.vacationID === this.props.vacationID){
                const counter = this.state.counter + 1;
                this.setState({counter:counter});
            }
        });

        this.socket.on("follow-deleted", follow => {
            if(follow.vacationID === this.props.vacationID){
                const counter = this.state.counter - 1;
                this.setState({counter:counter});
            }
        });

    };

    public componentDidMount():void{

        fetch("http://localhost:3001/api/followers/" + this.props.vacationID)
        .then(response => response.json())
        .then(follow => {
            if(follow.followers > 0){
                const counter = this.state.counter + follow.followers;
                this.setState({counter:counter});
            }
        })
        .catch(err => alert(err));
    }

    public render():JSX.Element{
        return(
            <div className="counter" style={{ display: store.getState().user.userType === "user" && 
                this.state.counter > 0 ? "inline-block" : "none" }}>
                {this.state.counter}
            </div>
        )
    }
}