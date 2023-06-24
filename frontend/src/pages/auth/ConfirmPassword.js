import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faEye, faUnlockAlt} from "@fortawesome/free-solid-svg-icons";
import {Button, Card, Col, Container, Form, InputGroup, Row} from '@themesberg/react-bootstrap';
import {Link, useParams} from 'react-router-dom';

import {Routes} from "../../routes";
import axiosClient from "../../utils/axios";


export default (props) => {

    const [password, setPassword] = useState('');
    const {token} = useParams();
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState(<></>)

    const submitConfirmPass = (e) => {
        e.preventDefault();
        console.log(props.token)
        axiosClient.post(
            "/api/password_reset/confirm/",
            {
                password: password,
                token: token
            }
        ).then((res) => {
            setMessage(
                <p className="text-success text-center">Senha alterada com sucesso!<br/>Redirecionando em 3,2,1...</p>
            )
            delay()
        }).catch((err) => {
            console.log(err)
        })
    }

    const toggleVisibility = () => {
        // When the handler is invoked inverse the boolean state of visible
        setVisible(!visible);
    };

    const delay = () => {
        setTimeout(() => {
            window.location.replace('/login')
        }, 3000)
    };

    return (
        <main>
            <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <Row className="justify-content-center">
                        <p className="text-center">
                            <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                                <FontAwesomeIcon icon={faAngleLeft} className="me-2"/> Voltar para Login
                            </Card.Link>
                        </p>
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <h3 className="mb-4">Redefinir Senha</h3>
                                <Form className="mb-4" onSubmit={submitConfirmPass}>
                                    <Form.Group id="password" className="mb-4">
                                        <Form.Label>Nova Senha</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUnlockAlt}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                type={visible ? "text" : "password"}
                                                placeholder="NovaSenha@123"
                                            />
                                            <Button onClick={toggleVisibility}>
                                                <FontAwesomeIcon icon={faEye}/>
                                            </Button>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group id="confirmPassword" className="mb-4">
                                        <Form.Label>Confirmar Senha</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUnlockAlt}/>
                                            </InputGroup.Text>
                                            <Form.Control
                                                required
                                                type={visible ? "text" : "password"}
                                                placeholder="NovaSenha@123"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <Button onClick={toggleVisibility}>
                                                <FontAwesomeIcon icon={faEye}/>
                                            </Button>
                                        </InputGroup>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Confirmar
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
