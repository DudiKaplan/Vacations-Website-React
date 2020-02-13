import React, { Component } from "react";
import "./home.css";
import { Headline } from "../headline/headline";

export class Home extends Component {
    public render(): JSX.Element {
        return (
            <div className="home">
                <Headline>Home</Headline>
                <h1>Welcome</h1>
                <p>Where you can tag your favorite vacations</p>
            </div>
        );
    }
}