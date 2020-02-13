import React, { Component } from "react";
import "./layout.css";
import { Container, Row, Col} from 'react-bootstrap';
import { Header } from "../header/header";
import { Login } from "../login/login";
import { Footer } from "../footer/footer";
import { Home } from "../home/home";
import { Page404 } from "../page404/page404";
import { Registration } from "../registration/registration";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Menu } from "../menu/menu";
import { Vacations } from "../vacations/vacations";
import { AddVacation } from "../addVacation/addVacation";
import { EditVacation } from "../editVacation/editVacation";
import { Graph } from "../graph/graph";



export class Layout extends Component {

    public render(): JSX.Element {
        return (
            <Container className="layout">
                <BrowserRouter>
                    <Row>
                        <Col xs={12}>
                            <header>
                                <Header></Header>
                            </header>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={9} md={10}>
                            <main>
                               <Switch>
                                    <Route path="/home" component={Home} exact />
                                    <Route path="/login" component={Login} exact />
                                    <Route path="/registration" component={Registration} exact />
                                    <Route path="/vacations" component={Vacations} exact />
                                    <Route path="/add-vacation" component={AddVacation} exact />
                                    <Route path="/edit-vacation" render={props =>
                                        (<EditVacation prpoVacation={props.location.state.prpoVacation} />)} />
                                    <Route path="/graph" component={Graph} exact />
                                    <Redirect from="/" to="/home" exact />
                                    <Route component={Page404} />
                                </Switch> 
                            </main>
                        </Col>
                        <Col xs={3} md={2}>
                            <aside>
                                <Menu />
                            </aside>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <footer>
                                <Footer />
                            </footer>
                        </Col>
                    </Row>
                </BrowserRouter>
            </Container>
        );
    };
};