import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {Button, Card, Col, Container, Form, InputGroup, Row} from '@themesberg/react-bootstrap';
import {Link} from 'react-router-dom';

import {Routes} from "../../routes";
import axiosClient from "../../utils/axios";


export default () => {

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState(<></>)

    const submitResetPass = (e) => {
        e.preventDefault();
        axiosClient.post(
            "/api/password_reset/",
            {email: email}
        ).then((res) => {
            setMessage(<p className="text-success text-center">Confirmation email sent!<br/>Redirecting in
                3,2,1...</p>)
            delay()
        }).catch((err) => {
            console.log(err)
        })
    }

    const delay = () => {
        setTimeout(() => {
            window.location.replace('/login')
        }, 3000)
    };

    return (
        <main>
            <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <p className="text-center">
                            <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                                <FontAwesomeIcon icon={faAngleLeft} className="me-2"/> Back to login
                            </Card.Link>
                        </p>
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div
                                className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <h3>Forgot your password?</h3>
                                <p className="mb-4">Don't worry, type your email to reset!</p>
                                <Form className="mt-4" onSubmit={submitResetPass}>
                                    <div className="mb-4">
                                        <Form.Label htmlFor="email">Email</Form.Label>
                                        <InputGroup id="email">
                                            <Form.Control
                                                autoFocus
                                                required
                                                type="email"
                                                placeholder="example@gmail.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </InputGroup>
                                    </div>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Reset password
                                    </Button>
                                    <div className="d-flex justify-content-center align-items-center mt-4">
                                        {message}
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
};
