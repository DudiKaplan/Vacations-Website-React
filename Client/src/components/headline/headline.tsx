import React, { Component } from "react";
import "./headline.css";

export class Headline extends Component {
    
    public render(): JSX.Element {
        return (
            <div className="headline">
                <h2>{this.props.children}</h2>
            </div>
        );
    }
}