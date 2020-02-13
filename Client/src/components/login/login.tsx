import React, { Component } from "react";
import "./login.css";
import { Credentials } from "../../models/credentials";
import { Form, Button ,Row ,Col} from 'react-bootstrap';
import { store } from "../../redux/store";
import { ActionType } from "../../redux/actionType";
import { NavLink } from "react-router-dom";
import { Headline } from "../headline/headline";


interface LoginState {
    credentials: Credentials;
    errors: {
        usernameError: string;
        passwordError: string;
        incorrectLogin: string;
    }
}

export class Login extends Component<any,LoginState>{

    public constructor(props: any) {
        super(props);
        this.state = {
            credentials: new Credentials(),
            errors: {
                usernameError: "Missing username",
                passwordError: "Missing password",
                incorrectLogin: ""
            }
        };
    }

    private setUsername = (e: any): void => {
        const username = e.target.value;
        let usernameError = "";
        if(username === ""){
            usernameError = "Missing username";
        }
        const incorrectLogin = "";
        this.setState({ credentials: { ...this.state.credentials, username } });
        this.setState({ errors: { ...this.state.errors, usernameError, incorrectLogin } });
    };

    private setPassword = (e: any): void => {
        const password = e.target.value;
        let passwordError = "";
        if(password === ""){
            passwordError = "Missing password";
        }
        const incorrectLogin = "";
        this.setState({ credentials: { ...this.state.credentials, password } });
        this.setState({ errors: { ...this.state.errors, passwordError , incorrectLogin} });
        
    };

    private login = (): void => {
        fetch("http://localhost:3001/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.state.credentials)
        })
            .then(response => response.json())
            .then(user => {
                if(user.error) {
                    const incorrectLogin = "Incorrect username or password";
                    this.setState({ errors: { ...this.state.errors, incorrectLogin } });
                }
                else {
                    store.dispatch({type: ActionType.GetUser,payload:user});
                    this.props.history.push("/vacations");
                }
            })
            .catch(err => alert(err));
    };

    private isFormLegal(): boolean {
        return this.state.errors.usernameError === "" &&
            this.state.errors.passwordError === "";
    }

    public render():JSX.Element{
        return(
            <Row className="justify-content-md-center">
                <Col xs lg="4">
                    <Headline>Login</Headline>
                    <Form className="login">
                        <Form.Group controlId="formGroupUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" onChange={this.setUsername} value={this.state.credentials.username || ""}/>
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.setPassword} value={this.state.credentials.password || ""}/>
                        </Form.Group>
                        <Button disabled={!this.isFormLegal()} variant="primary" type="button" onClick={this.login}>Login</Button>
                        <br />
                        <Form.Label className="incorrect-login">{this.state.errors.incorrectLogin}</Form.Label>
                        <NavLink to="/registration" activeClassName="active-link" exact><Form.Label>Register Now</Form.Label></NavLink>
                    </Form>
                </Col>
            </Row>  
        )
    };
}