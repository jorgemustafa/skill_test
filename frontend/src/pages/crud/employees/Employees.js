import React, {useState} from "react";
import Table from "./TableEmployees";
import {Button, Col, Form, InputGroup, Row} from "@themesberg/react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import ModalEmployeeCreate from "./ModalEmployeeCreate";
import getUserData from "../../../utils/getUserData";


export default () => {
    const [openModal, setOpenModal] = useState(false)
    const userData = getUserData()


    return (
        <>
            <div className="d-flex justify-content-start flex-wrap flex-md-nowrap py-4">
                <div className="d-block mb-3 mb-md-0">
                    <h4>Employees</h4>
                    <p className="mb-0">{userData.isSuperUser ? <>Create, read, update or delete</> : <>Read employees data</>}</p>
                </div>
            </div>
            <div className="table-settings mb-4">
                <Row className="justify-content-between">
                    <Col xs={4} md={4} lg={4} xl={3}>
                        {userData.isSuperUser ?
                            <Button variant="primary" size="sm" className="me-2" onClick={() => setOpenModal(true)}>
                                <FontAwesomeIcon icon={faPlus} className="me-2"/>Create
                            </Button>
                            :
                            <></>
                        }
                    </Col>
                </Row>
            </div>
            <div className="table-settings mb-4">
                <Table refresh={!openModal}/>
            </div>
            <ModalEmployeeCreate show={openModal} close={() => setOpenModal(false)}/>
        </>
    );
};
