import React from "react";
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../routes/routes.js';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'

import Avatar from '../../assets/img/avatar.png'
import NoImage from '../../assets/img/logo.webp'

import "./login.scss"

function Login() {
    let navigate = useNavigate();

    return (
        <div id="login">
            <div className="container d-flex align-items-center login-container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6 login-form">
                        <div id="login-box" className="col-md-12 flex-column">
                            <Container fluid className="mb-3">
                                <Row>
                                    <Image src={NoImage} className="w-100 p-4"></Image>
                                </Row>
                                <Row>
                                    <h3 className="text-center mb-4">
                                        Inicio de Sesión
                                    </h3>
                                </Row>
                                <Row>
                                    <Form>
                                        <Row className="m-0 mb-3">
                                            <Col className="col-3 p-2">
                                                <Image roundedCircle src={Avatar} className="w-100 "></Image>
                                            </Col>
                                            <Col className="p-0 col-9 d-flex flex-column justify-content-center">
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Control type="text" placeholder="Usuario"/>
                                                </Form.Group>

                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Control type="password" placeholder="Contraseña"/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="m-0 d-flex flex-column">
                                            <Button variant="primary" type="submit" className="align-self-end" onClick={() => { navigate(ROUTES.DOCUMENTS_HISTORY); }}>
                                                Ingresar
                                            </Button>
                                        </Row>
                                    </Form>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;