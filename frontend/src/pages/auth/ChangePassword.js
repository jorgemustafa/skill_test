import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faEye, faUnlockAlt} from "@fortawesome/free-solid-svg-icons";
import {Button, Card, Col, Container, Form, InputGroup, Row} from '@themesberg/react-bootstrap';
import {Link} from 'react-router-dom';

import {Routes} from "../../routes";
import axiosClient from "../../utils/axios";


export default () => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState(<></>)

    const submitChangePass = (e) => {
        e.preventDefault();
        axiosClient.put(
            "/api/password_change",
            {
                current_password: currentPassword,
                new_password: newPassword,
                new_password_confirm: newPasswordConfirm
            }
        ).then((res) => {
            if (res.status === 200) {
                setMessage(
                    <p className="text-success text-center">
                        Password changed with successfully!<br/>Redirecting em 3,2,1...
                    </p>
                )
                delay()
            }
        }).catch((err) => {
            if (err.response.status === 400) {
                setMessage(<p className="text-danger text-center">{err.response.data.message}<br/></p>)
            }
        })
    }

    const toggleVisibility = () => {
        // When the handler is invoked inverse the boolean state of visible
        setVisible(!visible);
    };

    const delay = () => {
        setTimeout(() => {
            window.location.replace('/')
        }, 3000)
    };

    return (
        <main>
            <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <Row className="justify-content-center">
                        <p className="text-center">
                            <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                                <FontAwesomeIcon icon={faAngleLeft} className="me-2"/> Back to Login
                            </Card.Link>
                        </p>
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <h3 className="mb-4">Reset password</h3>
                                <Form className="mb-4" onSubmit={submitChangePass}>
                                    <Form.Group id="currentPassword" className="mb-4">
                                        <Form.Label>Current password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUnlockAlt}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                type={visible ? "text" : "password"}
                                                placeholder="Pass@123"
                                                value={currentPassword}
                                                onChange={(e) => {
                                                    setCurrentPassword(e.target.value)
                                                }}
                                            />
                                            <Button onClick={toggleVisibility}>
                                                <FontAwesomeIcon icon={faEye}/>
                                            </Button>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group id="newPassword" className="mb-4">
                                        <Form.Label>New Password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUnlockAlt}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                type={visible ? "text" : "password"}
                                                placeholder="NewPass@123"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                            <Button onClick={toggleVisibility}>
                                                <FontAwesomeIcon icon={faEye}/>
                                            </Button>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group id="newPasswordConfirm" className="mb-4">
                                        <Form.Label>Confirm New Password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUnlockAlt}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                type={visible ? "text" : "password"}
                                                placeholder="NewPass@123"
                                                value={newPasswordConfirm}
                                                onChange={(e) => {
                                                    setNewPasswordConfirm(e.target.value)
                                                }}
                                            />
                                            <Button onClick={toggleVisibility}>
                                                <FontAwesomeIcon icon={faEye}/>
                                            </Button>
                                        </InputGroup>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Send
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
