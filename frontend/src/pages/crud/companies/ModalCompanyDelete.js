import React, {useEffect, useState} from "react";
import axiosClient from "../../../utils/axios";
import {Alert, Button, Form, Modal} from "@themesberg/react-bootstrap";
import {cnpjMask} from "../../../utils/docValidators";

export default ({show, close, id = ''}) => {

    // company vars
    const [name, setName] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [message, setMessage] = useState('')

    // get company data
    useEffect(() => {
        axiosClient.get(`/api/company/${id}`)
            .then((res) => {
                setName(res.data.name)
                setCnpj(res.data.cnpj)
            })
            .catch((err) => setMessage(
                <Alert variant="danger" className="text-center">{err.response.data.message}</Alert>)
            )
    }, [id]);

    // delete company
    const submitDelete = (e) => {
        e.preventDefault();
        axiosClient.post(
            `/api/company/delete/${id}`,
            {}
        ).then((res) => {
            setMessage(<Alert variant="success" className="text-center">{res.data.message}</Alert>)
            setTimeout(() => {
                close();
                // clear fields
                setName('')
                setCnpj('')
                setMessage('')
            }, 2000)
        }).catch((err) => {
            setMessage(<Alert variant="danger" className="text-center">{err.response.data.message}</Alert>)
        })
    }

    return (
        <Modal as={Modal.Dialog} centered show={show} onHide={close}>
            <Modal.Header>
                <Modal.Title className="h6">Delete Company</Modal.Title>
                <Button variant="close" aria-label="Close" onClick={close}/>
            </Modal.Header>
            <Form onSubmit={submitDelete}>
                <Modal.Body>
                    <h6 className="pb-3">Do you really want to delete the company below?</h6>
                    <Form.Group id="name" className="mb-4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            readOnly={true}
                            name='name'
                            value={name ? name : ''}
                        />
                    </Form.Group>
                    <Form.Group id="cnpj" className="mb-4">
                        <Form.Label>CNPJ</Form.Label>
                        <Form.Control
                            readOnly={true}
                            name='cnpj'
                            value={cnpj ? cnpjMask(cnpj) : ''}
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