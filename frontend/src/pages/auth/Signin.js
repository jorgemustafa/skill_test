import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faUnlockAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {Button, Card, Col, Container, Form, InputGroup, Row} from '@themesberg/react-bootstrap';
import BgImage from "../../assets/img/illustrations/signin.svg";
import {Link, Redirect} from "react-router-dom";
import {Routes} from "../../routes";
import axiosClient from "../../utils/axios";


export default () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        axiosClient.get("/api/user")
            .then((res) => {
                setIsAuthenticated(true);
            })
            .catch((err) => {
                setIsAuthenticated(false);
            });
    }, []);

    const submitLogin = (e) => {
        e.preventDefault();
        axiosClient.post(
            "/api/login",
            {
                username: username,
                password: password
            }
        ).then((res) => {
            setIsAuthenticated(true);
        }).catch((err) => {
            if (err.response.status === 400) {
                setMessage(<p className="text-danger text-center">{err.response.data.message}</p>)
                document.getElementById('input_password').value = ''
            }
        });
    }

    if (isAuthenticated) {
        return <Redirect to={Routes.Home.path}/>
    }

    const toggleVisibility = () => {
        // When the handler is invoked inverse the boolean state of visible
        setVisible(!visible);
    };

    return (
        <main>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <Row className="justify-content-center form-bg-image" style={{backgroundImage: `url(${BgImage})`}}>
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <h3 className="mb-0">Bix Test | Login</h3>
                                </div>
                                <Form className="mt-4" onSubmit={submitLogin}>
                                    <Form.Group id="username" className="mb-4">
                                        <Form.Label>Username</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUser}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                autoFocus
                                                required
                                                type="text"
                                                placeholder="name.lastname"
                                                name='username'
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Group id="password" className="mb-4">
                                            <Form.Label>Password</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faUnlockAlt}/>
                                                </InputGroup.Text>
                                                <Form.Control
                                                    id="input_password"
                                                    autoFocus
                                                    required
                                                    type={visible ? "text" : "password"}
                                                    placeholder="Pass@123"
                                                    name='password'
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <Button onClick={toggleVisibility}>
                                                    <FontAwesomeIcon icon={faEye}/>
                                                </Button>
                                            </InputGroup>
                                        </Form.Group>
                                        <div className="d-flex justify-content-end mb-4">
                                            <Card.Link as={Link} to={Routes.ForgotPassword.path} className="small">
                                                Forgot your password?
                                            </Card.Link>
                                        </div>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Sign In
                                    </Button>
                                </Form>
                                <div className="message pt-2">{message ? <>{message}</> : null}</div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
};
