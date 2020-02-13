import React, { Component } from "react";
import "./header.css"
import { store } from "../../redux/store";
import { User } from "../../models/user";
import { Unsubscribe } from "redux";
import { ActionType } from "../../redux/actionType";
import { Row, Col} from 'react-bootstrap';
import { NavLink } from "react-router-dom";

interface HeaderState {
    user: User;
}

export class Header extends Component<any,HeaderState>{

    private unsubscribeStore: Unsubscribe;

    public constructor(props: any) {
        super(props);
        this.state = {
            user: store.getState().user,
        };
        this.unsubscribeStore = store.subscribe(() => this.setState({ user: store.getState().user }));
    }

    public componentWillUnmount(): void { 
        this.unsubscribeStore();
    }

    private logout = (): void => {
        store.dispatch({type: ActionType.ClearUser});
    };

    public render(): JSX.Element {
    return(
        <Row className="header">
            <Col xs={2}>
            <span className="user-details" style={{ display: this.state.user.userType ? "inline" : "none" }}>
                Hello {this.state.user.userType === "user" ? this.state.user.firstName : "Admin"}</span>
            </Col>
            <Col xs={8}>
                <h1>Vacations Website</h1>
            </Col>
            <Col xs={2}>
                <NavLink to="/" activeClassName="active-link" exact>
                    <span className="logout" style={{ display: this.state.user.userType ? "inline" : "none" }} onClick={this.logout}>Logout</span>
                </NavLink>
            </Col>
        </Row>
        )
    }
}