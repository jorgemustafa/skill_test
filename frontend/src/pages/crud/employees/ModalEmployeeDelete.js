import React, {useEffect, useState} from "react";
import axiosClient from "../../../utils/axios";
import {Alert, Button, Form, Modal} from "@themesberg/react-bootstrap";
import {cpfMask, dateMask} from "../../../utils/docValidators";

export default ({show, close, id = ''}) => {

    // customers vars
    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [company, setCompany] = useState('')
    const [dtBirth, setDtBirth] = useState('')
    const [dtStart, setDtStart] = useState('')
    const [dtEnd, setDtEnd] = useState('')
    const [vacationDays, setVacationDays] = useState('')
    const [message, setMessage] = useState(<></>)

    // get employee data
    useEffect(() => {
        axiosClient.get(`/api/employee/${id}`)
            .then((res) => {
                setName(res.data.name)
                setCpf(res.data.cpf)
                setCompany(res.data.company_name)
                setDtBirth(res.data.dt_birth)
                setDtStart(res.data.dt_start)
                setDtEnd(res.data.dt_end)
                setVacationDays(res.data.vacation_days)
            })
            .catch((err) => setMessage(
                <Alert variant="danger" className="text-center">{err.response.data.message}</Alert>)
            )
    }, [id]);

    // create customer
    const submitDelete = (e) => {
        e.preventDefault();
        axiosClient.post(
            `/api/employee/delete/${id}`,
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
                <Modal.Title className="h6">Delete Employee</Modal.Title>
                <Button variant="close" aria-label="Close" onClick={close}/>
            </Modal.Header>
            <Form onSubmit={submitDelete}>
                <Modal.Body>
                    <h6 className="pb-3">Do you really want to delete the employee below?</h6>
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
                    <Form.Group id="dtStart" className="mb-4">
                        <Form.Label>Date of Start</Form.Label>
                        <Form.Control
                            readOnly={true}
                            name='dtStart'
                            value={dtStart ? dateMask(dtStart) : ''}
                        />
                    </Form.Group>
                    <Form.Group id="dtEnd" className="mb-4">
                        <Form.Label>Date of End</Form.Label>
                        <Form.Control
                            readOnly={true}
                            name='dtEnd'
                            value={dtEnd ? dateMask(dtEnd) : ''}
                        />
                    </Form.Group>
                    <Form.Group id="vacationDays" className="mb-4">
                        <Form.Label>Vacation Days</Form.Label>
                        <Form.Control
                            readOnly={true}
                            name='vacationDays'
                            value={vacationDays ? vacationDays : ''}
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