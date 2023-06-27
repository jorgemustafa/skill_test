import {Card, Table} from "@themesberg/react-bootstrap";
import React, {useEffect, useState} from "react";
import axiosClient from "../../../utils/axios";
import {faCheck, faEdit, faTimes, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ModalEmployeeUpdate from "./ModalEmployeeUpdate";
import ModalEmployeeDelete from "./ModalEmployeeDelete";
import {cpfMask} from "../../../utils/docValidators";
import getUserData from "../../../utils/getUserData";

export default ({refresh}) => {

    const [employeesList, setEmployeesList] = useState([])
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [idActive, setIdActive] = useState()
    const userData = getUserData()

    // employee list
    useEffect(() => {
        axiosClient.get("/api/employee")
            .then((res) => setEmployeesList(res.data))
            .catch((err) => console.log(err));
    }, [refresh, openModalDelete, openModalUpdate]);

    const TableRow = (props) => {
        const {id, name, cpf, dt_birth, company_name, active} = props;
        const statusVariant = active ? "success" : "danger"

        return (
            <tr>
                <td>
                  <span className="fw-normal">
                    {name}
                  </span>
                </td>
                <td>
                  <span className="fw-normal">
                    {cpfMask(cpf)}
                  </span>
                </td>
                <td>
                  <span className="fw-normal">
                    {dt_birth}
                  </span>
                </td>
                <td>
                  <span className="fw-normal">
                    {company_name}
                  </span>
                </td>
                <td>
                  <span className={`fw-normal text-${statusVariant}`}>
                    {active ? <FontAwesomeIcon icon={faCheck} className="me-2"/> :
                        <FontAwesomeIcon icon={faTimes} className="me-2"/>}
                  </span>
                </td>
                {userData.isSuperUser ?
                    <td>
                        <FontAwesomeIcon icon={faEdit} className="me-2" id="update" onClick={() => {
                            setOpenModalUpdate(true)
                            setIdActive(id)
                        }}/>
                        <FontAwesomeIcon icon={faTrash} className="me-2" id="delete" onClick={() => {
                            setOpenModalDelete(true)
                            setIdActive(id)
                        }}/>
                    </td>
                    :
                    <></>
                }
            </tr>
        );
    };

    return (
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                        <tr>
                            <th className="border-bottom">Name</th>
                            <th className="border-bottom">CPF</th>
                            <th className="border-bottom">Date of Birth</th>
                            <th className="border-bottom">Company</th>
                            <th className="border-bottom">Active</th>
                            {userData.isSuperUser ? <th className="border-bottom">Actions</th> : <></>}
                        </tr>
                        </thead>
                        <tbody>
                        {employeesList.map(d => <TableRow key={`data-${d.id}`} {...d} />)}
                        </tbody>
                    </Table>
                    <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-end">
                        <small className="fw-bold">
                            Showing <b>{employeesList.length}</b> results
                        </small>
                    </Card.Footer>
                </Card.Body>
            </Card>
            <ModalEmployeeUpdate show={openModalUpdate} close={() => setOpenModalUpdate(false)} id={idActive}/>
            <ModalEmployeeDelete show={openModalDelete} close={() => setOpenModalDelete(false)} id={idActive}/>
        </>
    );
};