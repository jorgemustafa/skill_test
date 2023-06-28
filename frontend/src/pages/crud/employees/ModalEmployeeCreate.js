import React, {useEffect, useState} from "react";
import axiosClient from "../../../utils/axios";
import {Alert, Button, Form, FormSelect, Modal} from "@themesberg/react-bootstrap";
import {cpfMask, dateMask} from "../../../utils/docValidators";
import {validate} from "gerador-validador-cpf";

export default ({show, close}) => {

    // employees vars
    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [company, setCompany] = useState('')
    const [companiesList, setCompaniesList] = useState([])
    const [dtBirth, setDtBirth] = useState('')
    const [dtStart, setDtStart] = useState('')
    const [dtEnd, setDtEnd] = useState(null)
    const [vacationDays, setVacationDays] = useState('')
    const [message, setMessage] = useState(<></>)
    const [errorCpf, setErrorCpf] = useState(false)

    // companies list
    useEffect(() => {
        axiosClient.get("/api/company")
            .then((res) => setCompaniesList(res.data))
            .catch((err) => console.log(err));
    }, []);

    // create employee
    const submitCreate = (e) => {
        e.preventDefault();
        axiosClient.post(
            "/api/employee",
            {
                name: name,
                cpf: cpf,
                dt_birth: dtBirth,
                dt_start: dtStart,
                dt_end: dtEnd,
                vacation_days: vacationDays,
                company: company,
            }
        ).then((res) => {
            setMessage(<Alert variant="success" className="text-center">{res.data.message}</Alert>)
            setTimeout(() => {
                close()
                // clear fields
                setName('')
                setCpf('')
                setDtBirth('')
                setCompany('')
                setDtStart('')
                setDtEnd('')
                setVacationDays('')
                setMessage(<></>)
            }, 2000)
        }).catch((err) => {
            setMessage(<Alert variant="danger" className="text-center">{err.response.data.message}</Alert>)
        })
    }

    const parseCpf = (cpfValue) => {
        let valid = validate(cpfValue)
        if (valid) {
            setCpf(cpfValue)
            setErrorCpf(false)
        } else {
            setErrorCpf(true)
        }
    }

    return (
        <Modal as={Modal.Dialog} centered show={show} onHide={close}>
            <Modal.Header>
                <Modal.Title className="h6">Create Employee</Modal.Title>
                <Button variant="close" aria-label="Close" onClick={close}/>
            </Modal.Header>
            <Form onSubmit={submitCreate}>
                <Modal.Body>
                    <Form.Group id="name" className="mb-4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            autoFocus
                            required
                            type="text"
                            name='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group id="cpf" className="mb-4">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control
                            isInvalid={errorCpf}
                            autoFocus
                            required
                            type="text"
                            name='cpf'
                            maxLength={14}
                            value={cpfMask(cpf)}
                            onChange={(e) => setCpf(e.target.value)}
                            onBlur={(e) => parseCpf(cpf)}
                        />
                        <Form.Control.Feedback type="invalid">Invalid CPF.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group id="dtBirth" className="mb-4">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                            maxLength={10}
                            autoFocus
                            required
                            type="text"
                            name='dtBirth'
                            placeholder='DD/MM/YYYY'
                            value={dateMask(dtBirth)}
                            onChange={(e) => setDtBirth(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group id="company" className="mb-4">
                        <Form.Label>Company</Form.Label>
                        <FormSelect
                            autoFocus
                            required
                            name="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        >
                            <option className="fw-bold" key="" value="0">
                                --------------
                            </option>
                            {companiesList.map(company =>
                                <option className="fw-bold" key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            )}
                        </FormSelect>
                    </Form.Group>
                    <Form.Group id="dtStart" className="mb-4">
                        <Form.Label>Date of Start</Form.Label>
                        <Form.Control
                            maxLength={10}
                            autoFocus
                            required
                            type="text"
                            name='dtStart'
                            placeholder='DD/MM/YYYY'
                            value={dtStart ? dateMask(dtStart) : ''}
                            onChange={(e) => setDtStart(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group id="dtEnd" className="mb-4">
                        <Form.Label>Date of End</Form.Label>
                        <Form.Control
                            maxLength={10}
                            autoFocus
                            type="text"
                            name='dtEnd'
                            placeholder='DD/MM/YYYY'
                            value={dtEnd ? dateMask(dtEnd) : ''}
                            onChange={(e) => setDtEnd(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group id="vacationDays" className="mb-4">
                        <Form.Label>Vacation Days</Form.Label>
                        <Form.Control
                            autoFocus
                            required
                            type="number"
                            name='vacationDays'
                            value={vacationDays ? vacationDays : ''}
                            onChange={(e) => setVacationDays(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={close}>
                        Cancel
                    </Button>
                    <Button variant="primary" className="ms-auto" type="submit" disabled={errorCpf}>
                        Create
                    </Button>
                </Modal.Footer>
                <div className="message pt-2">{message ? <>{message}</> : null}</div>
            </Form>
        </Modal>
    )
};