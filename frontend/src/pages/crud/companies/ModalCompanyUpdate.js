import React, {useEffect, useState} from "react";
import axiosClient from "../../../utils/axios";
import {Alert, Button, Form, Modal} from "@themesberg/react-bootstrap";
import {cnpjMask, cnpjValidation} from "../../../utils/docValidators";

export default ({show, close, id = ""}) => {

    // customers vars
    const [name, setName] = useState("")
    const [cnpj, setCnpj] = useState("")
    const [active, setActive] = useState(true)
    const [message, setMessage] = useState("")
    const [errorCnpj, setErrorCnpj] = useState(false)


    // get company data
    useEffect(() => {
        axiosClient.get(`/api/company/${id}`)
            .then((res) => {
                setName(res.data.name)
                setCnpj(res.data.cnpj)
                setActive(res.data.active)
            })
            .catch((err) => setMessage(
                <Alert variant="danger" className="text-center">{err.response.data.message}</Alert>)
            )
    }, [id]);

    // update company
    const submitUpdate = (e) => {
        e.preventDefault();
        axiosClient.post(
            `/api/company/update/${id}`,
            {
                name: name,
                cnpj: cnpj,
                active: active,
            }
        ).then((res) => {
            setMessage(<Alert variant="success" className="text-center">{res.data.message}</Alert>)
            setTimeout(() => {
                close();
                // clear fields
                setMessage(<></>)
            }, 2000)
        }).catch((err) => {
            setMessage(<Alert variant="danger" className="text-center">{err.response.data.message}</Alert>)
        })
    }

    const parseCnpj = (cnpjValue) => {
        let valid = cnpjValidation(cnpjValue)
        if (valid) {
            setCnpj(cnpjValue)
            setErrorCnpj(false)
        } else {
            setErrorCnpj(true)
        }
    }

    return (
        <Modal as={Modal.Dialog} centered show={show} onHide={close}>
            <Modal.Header>
                <Modal.Title className="h6">Update Company</Modal.Title>
                <Button variant="close" aria-label="Close" onClick={close}/>
            </Modal.Header>
            <Form onSubmit={submitUpdate}>
                <Modal.Body>
                    <Form.Group id="name" className="mb-4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            autoFocus
                            required
                            type="text"
                            name="name"
                            value={name ? name : ""}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group id="cnpj" className="mb-4">
                        <Form.Label>CNPJ</Form.Label>
                        <Form.Control
                            isInvalid={errorCnpj}
                            autoFocus
                            required
                            type="text"
                            name='cnpj'
                            value={cnpj ? cnpjMask(cnpj) : ''}
                            onChange={(e) => setCnpj(e.target.value)}
                            onBlur={(e) => parseCnpj(cnpj)}
                        />
                        <Form.Control.Feedback type="invalid">Invalid CNPJ.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group id="active" className="mb-4">
                        <Form.Label>Active</Form.Label>
                        <Form.Check
                            autoFocus
                            name="active"
                            type="switch"
                            checked={active ? active : false}
                            onChange={(e) => setActive(e.target.checked)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={close}>
                        Cancel
                    </Button>
                    <Button variant="primary" className="ms-auto" type="submit" disabled={errorCnpj}>
                        Update
                    </Button>
                </Modal.Footer>
                <div className="message pt-2">{message ? <>{message}</> : null}</div>
            </Form>
        </Modal>
    )
};