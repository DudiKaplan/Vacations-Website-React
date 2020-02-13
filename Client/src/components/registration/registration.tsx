import React, { Component } from "react";
import "./registration.css"
import { User } from "../../models/user";
import { Form , Button , Row, Col} from 'react-bootstrap';
import { Headline } from "../headline/headline";


interface RegistrationState{
    user: User;
    errors: {
        firstNameError: string;
        lastNameError: string;
        usernameError: string;
        passwordError: string;
    };
}

export class Registration extends Component<any,RegistrationState>{

    public constructor(props: any) {
        super(props);
        this.state = {
            user: new User(),
            errors: {
                firstNameError: "*",
                lastNameError: "*",
                usernameError: "*",
                passwordError: "*"
            }
        }
    }

    private setFirstName = (e: any): void => {
        const firstName = e.target.value;
        let firstNameError = "";

        if (firstName === "") {
            firstNameError = "Missing.";
        }
        else if ( !/[A-Z]/.test( firstName[0])) {
            firstNameError = "First be capital."
        }
        const user = {...this.state.user}
        const errors = {...this.state.errors}
        user.firstName = firstName;
        errors.firstNameError = firstNameError;
        this.setState({user , errors})
    };

    private setLastName = (e: any): void => {
        const lastName = e.target.value;
        let lastNameError = "";

        if (lastName === "") {
            lastNameError = "Missing.";
        }
        else if ( !/[A-Z]/.test( lastName[0])) {
            lastNameError = "First be capital."
        }
        const user = {...this.state.user}
        const errors = {...this.state.errors}
        user.lastName = lastName;
        errors.lastNameError = lastNameError;
        this.setState({user , errors})
    };

    private setUsername = (e: any): void => {
        const username = e.target.value;
        let usernameError = "";
        const credential = {username: username}
        if (username === "") {
            usernameError = "Missing Username.";
        }
        else if ( username.length < 4) {
            usernameError = "Username must be 4 characters at least."
        }else{
       
            fetch("http://localhost:3001/api/users/exist-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(credential)
        })
            .then(response => response.json())
            .then(username => {
                if(username.isExist === "username-already-taken-from-server"){
                    usernameError = "Username already taken from server"
                    this.setState({ errors: { ...this.state.errors, usernameError } });
                }
            })
            .catch(err => alert(err.message));
        }
        const user = {...this.state.user}
        const errors = {...this.state.errors}
        user.username = username;
        errors.usernameError = usernameError;
        this.setState({user , errors})
    };

    private setPassword = (e: any): void => {
        const password = e.target.value;
        let passwordError = "";

        if (password === "") {
            passwordError = "Missing Password.";
        }
        else if ( password.length < 4) {
            passwordError = "Password must be 4 characters at least."
        }
        const user = {...this.state.user}
        const errors = {...this.state.errors}
        user.password = password;
        errors.passwordError = passwordError;
        this.setState({user , errors})
    };

    private addRegistry = (): void => {
        fetch("http://localhost:3001/api/users/registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.state.user)
        })
            .then(response => response.json())
            .then(user => {
                alert("New user has been added. User ID: " + user.userID);
                this.props.history.push("/login");
            })
            .catch(err => alert(err.message));
    };

    private isFormLegal(): boolean {
        return this.state.errors.firstNameError === "" &&
            this.state.errors.lastNameError === "" &&
            this.state.errors.usernameError === "" && 
            this.state.errors.passwordError === "";
    }

    private getValidationStyle(errorMessage: string): {} {
        if(errorMessage) {
            return {
                border: "1px solid red"
            };
        }
        else {
            return {
                border: "1px solid blue"
            };
        }
    }
    public render():JSX.Element{
        return(
            <Row className="justify-content-md-center">
                <Col xs lg="8">
                    <Headline>Registration</Headline>
                    <Form className="form">
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Label className="error">{this.state.errors.firstNameError}</Form.Label>
                            <Form.Control type="text" placeholder="Enter First Name" style={this.getValidationStyle(this.state.errors.firstNameError)}
                                onChange={this.setFirstName} value={this.state.user.firstName || ""} autoFocus />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Label className="error">{this.state.errors.lastNameError}</Form.Label>
                            <Form.Control type="text" placeholder="Enter Last Name" style={this.getValidationStyle(this.state.errors.lastNameError)}
                                onChange={this.setLastName} value={this.state.user.lastName || ""}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Label className="error">{this.state.errors.usernameError}</Form.Label>
                            <Form.Control placeholder="Enter Username" style={this.getValidationStyle(this.state.errors.usernameError)}
                                onChange={this.setUsername} value={this.state.user.username || ""}/>
                        </Form.Group>

                        <Form.Group controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Label className="error">{this.state.errors.passwordError}</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" style={this.getValidationStyle(this.state.errors.passwordError)}
                                onChange={this.setPassword} value={this.state.user.password || ""}/>
                        </Form.Group>

                        <Button disabled={!this.isFormLegal()} onClick={this.addRegistry} variant="primary" type="button">
                            Register
                        </Button>
                    </Form>
                    <br />
                </Col>
            </Row>
        )
    };
};