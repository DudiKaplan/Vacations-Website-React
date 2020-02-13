import React, { Component } from "react";
import "./addVacation.css"
import { Vacation } from "../../models/vacation";
import { Form , Button , Row, Col} from 'react-bootstrap';
import { Headline } from "../headline/headline";


interface AddVacationState{
    vacation: Vacation;
    file: null;
    errors: {
        descriptionError: string;
        destinationError: string;
        startDateError: string;
        endDateError: string;
        priceError: string;
        fileError: string;
    };
}

export class AddVacation extends Component<any,AddVacationState>{

    public constructor(props: any) {
        super(props);
        this.state = {
            vacation: new Vacation(),
            file: null,
            errors: {
                descriptionError: "*",
                destinationError: "*",
                startDateError: "*",
                endDateError: "*",
                priceError: "*",
                fileError: "*"
            }
        }
    }

    private setDescription = (e: any): void => {
        const description = e.target.value;
        let descriptionError = "";

        if (description === "") {
            descriptionError = "Missing.";
        }
        else if ( !/[A-Z]/.test( description[0])) {
            descriptionError = "First be capital."
        }
        const vacation = {...this.state.vacation}
        const errors = {...this.state.errors}
        vacation.description = description;
        errors.descriptionError = descriptionError;
        this.setState({vacation , errors})
    };

    private setDestination = (e: any): void => {
        const destination = e.target.value;
        let destinationError = "";

        if (destination === "") {
            destinationError = "Missing.";
        }
        else if ( !/[A-Z]/.test( destination[0])) {
            destinationError = "First be capital."
        }
        const vacation = {...this.state.vacation}
        const errors = {...this.state.errors}
        vacation.destination = destination;
        errors.destinationError = destinationError;
        this.setState({vacation , errors})
    };

    private setStartDate = (e: any): void => {
        const startDate = e.target.value;
        let startDateError = "";
        if(startDate === ""){
            startDateError = "Missing.";
        }
        this.setState({errors: {...this.state.errors, startDateError}});
        this.setState({ vacation: { ...this.state.vacation, startDate } });
    };

    private setEndDate = (e: any): void => {
        const endDate = e.target.value;
        let endDateError = "";
        if(endDate === ""){
            endDateError = "Missing.";
        }
        this.setState({errors: {...this.state.errors, endDateError}});
        this.setState({ vacation: { ...this.state.vacation, endDate } });
    };
    
    private setPrice = (e: any): void => {
        const price = +e.target.value;
        let priceError = "";
        if (price === 0) {
            priceError = "Missing Price.";
        }
        else if ( price < 0) {
            priceError = "Price must be positive."
        }
        const vacation = {...this.state.vacation}
        const errors = {...this.state.errors}
        vacation.price = price;
        errors.priceError = priceError;
        this.setState({vacation , errors})
    };

    private setFile = (e:any):void => {
        const file = e.target.files[0];
        let fileError = ""
        if(!file){
            fileError = "Missing."
        }
        this.setState({file:file});
        this.setState({errors: {...this.state.errors, fileError}});
    }

    private addVacation = (): void => {

        const formData = new FormData();
        formData.append('vacationImage',this.state.file);
        formData.append('json', JSON.stringify(this.state.vacation));
        fetch("http://localhost:3001/api/vacations", {
            method: "POST",
            body: formData
        })
            .then( v => alert("vacation added successfully! "))
            .catch(err => alert(err.message));
    };

    private isFormLegal(): boolean {
        return this.state.errors.descriptionError === "" &&
            this.state.errors.destinationError === "" &&
            this.state.errors.startDateError === "" && 
            this.state.errors.endDateError === "" &&
            this.state.errors.priceError === "" &&
            this.state.errors.fileError === "";
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
                    <Headline>Add Vacation</Headline>
                    <Form className="form">
                        <Form.Group controlId="formGridDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Label className="error">{this.state.errors.descriptionError}</Form.Label>
                            <Form.Control placeholder="Enter Description" style={this.getValidationStyle(this.state.errors.descriptionError)}
                                onChange={this.setDescription} value={this.state.vacation.description || ""}/>
                        </Form.Group>

                        <Form.Group controlId="formGridDestination">
                            <Form.Label>Destination</Form.Label>
                            <Form.Label className="error">{this.state.errors.destinationError}</Form.Label>
                            <Form.Control type="text" placeholder="Enter Destination" style={this.getValidationStyle(this.state.errors.destinationError)}
                                onChange={this.setDestination} value={this.state.vacation.destination || ""}/>
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridStartDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Label className="error">{this.state.errors.startDateError}</Form.Label>
                            
                            <Form.Control type="date" placeholder="Enter Start Date" style={this.getValidationStyle(this.state.errors.startDateError)}
                                onChange={this.setStartDate} value={this.state.vacation.startDate || ""}  />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridEndDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Label className="error">{this.state.errors.endDateError}</Form.Label>
                            <Form.Control type="date" placeholder="Enter End Date" style={this.getValidationStyle(this.state.errors.endDateError)}
                                onChange={this.setEndDate} value={this.state.vacation.endDate || ""}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Label className="error">{this.state.errors.priceError}</Form.Label>
                            <Form.Control type="text" placeholder="Enter Price" style={this.getValidationStyle(this.state.errors.priceError)}
                                 onChange={this.setPrice} />
                        </Form.Group>

                        <Form.Group controlId="formGridFile">
                            <Form.Label>Image</Form.Label>
                            <Form.Label className="error">{this.state.errors.fileError}</Form.Label>
                            <Form.Control type="file" placeholder="Enter File" style={this.getValidationStyle(this.state.errors.fileError)}
                                 onChange={this.setFile} name="vacationImage" />
                        </Form.Group>

                        <Button disabled={!this.isFormLegal()} onClick={this.addVacation} variant="primary" type="button">
                            Add Vacation
                        </Button>
                    </Form>
                    <br />
                </Col>
            </Row>
        )
    };
};