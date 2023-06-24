import React, {useEffect, useState} from "react";
import axiosClient from "../../../utils/axios";
import {Alert, Button, Form, Modal} from "@themesberg/react-bootstrap";
import {cpfMask, dateMask} from "../../../utils/docValidators";

export default ({show, close, id = ''}) => {

    // customers vars
    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [dtBirth, setDtBirth] = useState('')
    const [company, setCompany] = useState('')
    const [message, setMessage] = useState('')

    // get customer data
    useEffect(() => {
        axiosClient.get(`/api/responsavel/${id}`)
            .then((res) => {
                setName(res.data.name)
                setCpf(res.data.cpf)
                setDtBirth(res.data.dt_birth)
                setCompany(res.data.company_name)
            })
            .catch((err) => setMessage(
                <Alert variant="danger" className="text-center">{err.response.data.message}</Alert>)
            )
    }, [id]);

    // create customer
    const submitDelete = (e) => {
        e.preventDefault();
        axiosClient.post(
            `/api/responsavel/delete/${id}`,
            {}
        ).then((res) => {
            setMessage(<Alert variant="success" className="text-center">{res.data.message}</Alert>)
            setTimeout(() => {
                close();
            }, 2000)
        }).catch((err) => {
            setMessage(<Alert variant="danger" className="text-center">{err.response.data.message}</Alert>)
        })
    }

    return (
        <Modal as={Modal.Dialog} centered show={show} onHide={close}>
            <Modal.Header>
                <Modal.Title className="h6">Deletar Responsável</Modal.Title>
                <Button variant="close" aria-label="Close" onClick={close}/>
            </Modal.Header>
            <Form onSubmit={submitDelete}>
                <Modal.Body>
                    <h6 className="pb-3">Você realmente deseja excluir o responsável abaixo?</h6>
                    <Form.Group id="name" className="mb-4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            readOnly={true}
                            name='name'
                            value={name ? name : ''}
                        />
                    </Form.Group>
                    <Form.Group id="cpf" className="mb-4">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control
                            readOnly={true}
                            name='cpf'
                            value={cpf ? cpfMask(cpf) : ''}
                        />
                    </Form.Group>
                    <Form.Group id="dtBirth" className="mb-4">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                            readOnly={true}
                            name='dtBirth'
                            value={dtBirth ? dateMask(dtBirth) : ''}
                        />
                    </Form.Group>
                    <Form.Group id="company" className="mb-4">
                        <Form.Label>Company</Form.Label>
                        <Form.Control
                            readOnly={true}
                            name='company'
                            value={company ? company : ''}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={close}>
                        Cancel
                    </Button>
                    <Button variant="primary" className="ms-auto" type="submit">
                        Delete
                    </Button>
                </Modal.Footer>
                <div className="message pt-2">{message ? <>{message}</> : null}</div>
            </Form>
        </Modal>
    )
};