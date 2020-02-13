import React, { Component } from "react";
import "./vacations.css";
import { Row ,Col} from 'react-bootstrap';
import { Headline } from "../headline/headline";
import { store } from "../../redux/store";
import { Vacation } from "../../models/vacation";
import io from "socket.io-client";
import { VacationCard } from "../vacationCard/vacationCard";

interface VacationsState{
    vacations:Vacation[];
}

export class Vacations extends Component<any,VacationsState>{

    private socket = io.connect("http://localhost:3002");

    public constructor(props: any) {
        super(props);
        this.state = {
            vacations: []
        };

        this.socket.on("vacation-added", vacation => {
            const vacations = [...this.state.vacations];
            vacations.push(vacation);
            this.setState({ vacations });
        });

        this.socket.on("vacation-updated", vacation => {
            const vacations = [...this.state.vacations];
            for (let item of vacations) {
                if(item.vacationID === vacation.vacationID){
                    item.description = vacation.description;
                    item.destination = vacation.destination;
                    item.imageName = vacation.imageName;
                    item.startDate = vacation.startDate;
                    item.endDate = vacation.endDate;
                    item.price = vacation.price;
                };
            }
            this.setState({ vacations });
        });

        this.socket.on("vacation-deleted", vacationID => {
            const vacations = [...this.state.vacations];
            for (let i = 0; i < vacations.length; i++) {
                if(vacations[i].vacationID === vacationID){
                    if(i === 0){
                        vacations.shift();
                    }else{
                        vacations.splice(i,i);
                    }
                }; 
            };
            this.setState({ vacations });
        });
    
    };

    public UNSAFE_componentWillMount() :void{
        if(store.getState().user.userType === undefined){
            this.props.history.push("/login");
        }
    };

    public componentDidMount() :void{
        if(store.getState().user.userType === "user"){
            fetch("http://localhost:3001/api/vacations/per-user/" + store.getState().user.userID)
            .then(response => response.json())
            .then(vacations => {
                this.setState({ vacations });
            })
            .catch(err => alert(err));
        }else{
            fetch("http://localhost:3001/api/vacations")
            .then(response => response.json())
            .then(vacations => {
                this.setState({ vacations });
            })
            .catch(err => alert(err));
        }
    };
    public render():JSX.Element{
        return(
            <Row className="vacations">
                <Col xs lg="12">
                    <Headline>Vacations</Headline>
                </Col>
                {this.state.vacations.map(v =>
                    <VacationCard  vacation={v} key={v.vacationID} />
                    )}
            </Row>
        )
    }
}