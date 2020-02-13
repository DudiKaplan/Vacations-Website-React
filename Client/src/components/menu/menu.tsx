import React, { Component } from "react";
import "./menu.css";
import { NavLink } from "react-router-dom";
import { User } from "../../models/user";
import { Unsubscribe } from "redux";
import { store } from "../../redux/store";

interface HeaderState {
    user: User;
}

export class Menu extends Component<any,HeaderState> {

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

    public render(): JSX.Element {
        return (
            <nav className="menu">
                <NavLink to="/home" activeClassName="active-link" exact>Home</NavLink>
                <NavLink to="/vacations" activeClassName="active-link" exact>Vacations</NavLink>
                <NavLink to="/add-vacation" activeClassName="active-link" exact
                    style={{ display: this.state.user.userType === "admin" ? "block" : "none" }}>Add Vacation</NavLink>
                <NavLink to="/graph" activeClassName="active-link" exact
                    style={{ display: this.state.user.userType === "admin" ? "block" : "none" }}>Graph</NavLink>
            </nav>
        );
    }
}

