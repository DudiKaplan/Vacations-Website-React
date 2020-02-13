import React, { Component } from "react";
import "./page404.css";

export class Page404 extends Component {
    public render(): JSX.Element {
        return (
            <div className="page404">
                <h4>The page you are looking for doesn't exist.</h4>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/t3otBjVZzT0?autoplay=1" allow="autoplay" title="Page not Found"></iframe>

            </div>
        );
    }
}

