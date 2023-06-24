import React, {useEffect, useState} from "react";
import axiosClient from "../../../utils/axios";
import {Alert, Button, Form, FormSelect, InputGroup, Modal} from "@themesberg/react-bootstrap";
import {cpfMask, dateMask} from "../../../utils/docValidators";
import {validate} from 'gerador-validador-cpf'

export default ({show, close, id = ''}) => {

    // employees vars
    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [company, setCompany] = useState('')
    const [companiesList, setCompaniesList] = useState([])
    const [dtBirth, setDtBirth] = useState('')
    const [active, setActive] = useState(true)
    const [message, setMessage] = useState(<></>)
    const [errorCpf, setErrorCpf] = useState(false)

    // customer list
    useEffect(() => {
        axiosClient.get("/api/company")
            .then((res) => setCompaniesList(res.data))
            .catch((err) => console.log(err));
    }, []);

    // get employee data
    useEffect(() => {
        axiosClient.get(`/api/employee/${id}`)
            .then((res) => {
                setName(res.data.name)
                setCpf(res.data.cpf)
                setDtBirth(res.data.dt_birth)
                setCompany(res.data.company)
                setActive(res.data.active)
            })
            .catch((err) => setMessage(
                <Alert variant="danger" className="text-center">{err.response.data.message}</Alert>)
            )
    }, [id]);

    // update employee
    const submitUpdate = (e) => {
        e.preventDefault();
        axiosClient.post(
            `/api/employee/update/${id}`,
            {
                name: name,
                cpf: cpf,
                dt_birth: dtBirth,
                company: company,
                active: active
            }
        ).then((res) => {
            setMessage(<Alert variant="success" className="text-center">{res.data.message}</Alert>)
            setTimeout(() => {
                close();
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
                <Modal.Title className="h6">Update Employee</Modal.Title>
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
                            name='name'
                            value={name ? name : ''}
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
                            value={cpf ? cpfMask(cpf) : ''}
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
                            value={dtBirth ? dateMask(dtBirth) : ''}
                            onChange={(e) => setDtBirth(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group id="company" className="mb-4">
                        <Form.Label>Companies</Form.Label>
                        <InputGroup>
                            <FormSelect
                                autoFocus
                                required
                                name="companies"
                                value={company ? company : ''}
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
                        </InputGroup>
                    </Form.Group>
                    <Form.Group id="active" className="mb-4">
                        <Form.Label>Active</Form.Label>
                        <InputGroup>
                            <Form.Check
                                autoFocus
                                name="active"
                                type="switch"
                                checked={active ? active : false}
                                onChange={(e) => setActive(e.target.checked)}
                            />
                        </InputGroup>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={close}>
                        Cancel
                    </Button>
                    <Button variant="primary" className="ms-auto" type="submit" disabled={errorCpf}>
                        Update
                    </Button>
                </Modal.Footer>
                <div className="message pt-2">{message ? <>{message}</> : null}</div>
            </Form>
        </Modal>
    )
};