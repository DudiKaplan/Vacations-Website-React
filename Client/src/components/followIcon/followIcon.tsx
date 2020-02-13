import React, { Component } from "react";
import "./followIcon.css";
import { store } from "../../redux/store";
import { Vacation } from "../../models/vacation";
import { Follow } from "../../models/follow";
import icon from "../../assets/images/follow-icon.png";
import iconYellow from "../../assets/images/follow-icon-yellow.png";


interface FollowIconProps{
    vacation: Vacation;
}
interface FollowIconState{
    isFlag: boolean;
    follow: Follow;
}

export class FollowIcon extends Component<FollowIconProps,FollowIconState>{

    public constructor(props: any) {
        super(props);
        this.state = {
            isFlag:false,
            follow:new Follow()
        }
    }

    public componentDidMount():void{
        if(this.props.vacation.userID && this.props.vacation.userID !== null){
            this.setState({isFlag: true});
        }
        const follow = {...this.state.follow};
        follow.vacationID = this.props.vacation.vacationID;
        follow.userID = store.getState().user.userID;
        this.setState({follow:follow})
    }

    private iconFlag = (): void => {

        if(this.state.isFlag){
            this.setState({isFlag: false});
            fetch("http://localhost:3001/api/followers/delete-follow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.state.follow)
        })
            .then(response => response.json())
            .catch(err => alert(err));
        }else{
            this.setState({isFlag: true});
            fetch("http://localhost:3001/api/followers/add-follow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.state.follow)
        })
            .then(response => response.json())
            .catch(err => alert(err));
        }
    };

    private getValidationStyle(flag: boolean): {} {
        if(flag && store.getState().user.userType === "user") {
            return {
                dispaly: "inline-block",
                backgroundImage: `url(${iconYellow})`
            };
        }
        else if(!flag && store.getState().user.userType === "user"){
            return {
                dispaly: "inline-block",
                backgroundImage: `url(${icon})`
            };
        }else{
            return{
                dispaly: "none"
            }
        }
    }
    public render():JSX.Element{
        return(
            <div className="follow"  onClick={this.iconFlag} style={this.getValidationStyle(this.state.isFlag)}></div>
        )
    }
}