import React, { Component } from "react";
import "./vacationCard.css";
import { Vacation } from "../../models/vacation";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { Row, Col } from "react-bootstrap";
import { store } from "../../redux/store";
import { DeleteVacation } from "../deleteVacation/deleteVacation";
import { FollowIcon } from "../followIcon/followIcon";
import { FollowCounter } from "../followCounter/followCounter";
import { NavLink } from "react-router-dom";

interface VacationCardProps{
    vacation: Vacation;
}

export class VacationCard extends Component<VacationCardProps> {
    
    public render():JSX.Element{
        return(
            <Col xs={12} md={4}>
            <Card className="card">
                <Row>
                    <Col xs={1}></Col>
                    <Col xs={9}>
                        <Card.Img  className="iamge" variant="top" src={"http://localhost:3001/assets/images/" + this.props.vacation.imageName} />
                        <FollowCounter vacationID={this.props.vacation.vacationID}/>
                    </Col>
                    <Col xs={1}>
                        <FollowIcon vacation={this.props.vacation} />
                        <DeleteVacation vacationID={this.props.vacation.vacationID}  />
                        <NavLink to={{pathname: '/edit-vacation', state: {prpoVacation:this.props.vacation}}}>
                            <div className="edit"  style={{ display: store.getState().user.userType === "admin" ? "inline-block" : "none" }}></div>
                        </NavLink>
                    </Col>
                </Row>
                <Card.Body>
                    <Card.Text>{this.props.vacation.description}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem><span className="bold">Destination: </span>{this.props.vacation.destination}</ListGroupItem>
                    <ListGroupItem><span className="bold">Start Date: </span>{this.formatDate(this.props.vacation.startDate)}</ListGroupItem>
                    <ListGroupItem><span className="bold">End Date: </span>{this.formatDate(this.props.vacation.endDate)}</ListGroupItem>
                    <ListGroupItem><span className="bold">Price: </span>{this.props.vacation.price}$</ListGroupItem>
                </ListGroup>
            </Card>
            </Col>
        )
    }

    private formatDate(originalDate: string): string {
        const formattedDate = new Date(originalDate);
        let day: any = formattedDate.getDate();
        let month: any = formattedDate.getMonth() + 1;
        const year: any = formattedDate.getFullYear();

        if (day < 10) {
            day = "0" + day;
        }

        if (month < 10) {
            month = "0" + month;
        }

        return day + "/" + month + "/" + year;
    }
}