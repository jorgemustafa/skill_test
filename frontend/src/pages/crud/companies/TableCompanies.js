import {Card, Table} from "@themesberg/react-bootstrap";
import React, {useEffect, useState} from "react";
import axiosClient from "../../../utils/axios";
import {faCheck, faEdit, faTimes, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ModalCompanyUpdate from "./ModalCompanyUpdate";
import ModalCompanyDelete from "./ModalCompanyDelete";
import {cnpjMask} from "../../../utils/docValidators";
import getUserData from "../../../utils/getUserData";

export default ({refresh}) => {

    const [companiesList, setCompaniesList] = useState([])
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [idActive, setIdActive] = useState()
    const userData = getUserData()

    // empresa list
    useEffect(() => {
        axiosClient.get("/api/company")
            .then((res) => setCompaniesList(res.data))
            .catch((err) => console.log(err));
    }, [refresh, openModalDelete, openModalUpdate]);

    const TableRow = (props) => {
        const {id, name, cnpj, active} = props;
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
                    {cnpjMask(cnpj)}
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
                            <th className="border-bottom">CNPJ</th>
                            <th className="border-bottom">Active</th>
                            {userData.isSuperUser ? <th className="border-bottom">Actions</th> : <></>}
                        </tr>
                        </thead>
                        <tbody>
                        {companiesList.map(d => <TableRow key={`data-${d.id}`} {...d} />)}
                        </tbody>
                    </Table>
                    <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-end">
                        <small className="fw-bold">
                            Showing <b>{companiesList.length}</b> results
                        </small>
                    </Card.Footer>
                </Card.Body>
            </Card>
            <ModalCompanyUpdate show={openModalUpdate} close={() => setOpenModalUpdate(false)} id={idActive}/>
            <ModalCompanyDelete show={openModalDelete} close={() => setOpenModalDelete(false)} id={idActive}/>
        </>
    );
};