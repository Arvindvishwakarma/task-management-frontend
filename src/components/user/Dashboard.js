import React, { useState } from 'react'
import '../../componentcss/dashboard.css'
import { Container, Row, Col, Button, Table, Badge, Spinner } from 'react-bootstrap'
import AddtaskModal from './AddtaskModal';
import ViewTaskModal from './ViewTaskModal';
import ChangePriority from './ChangePriority';
import ChangeStatus from './ChangeStatus';
import { FaCirclePlus } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { FaPen, FaEye } from "react-icons/fa";
import { Navigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ALL_TASKS } from '../../graphql/Query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {

    let count = 1
    const token = localStorage.getItem('userToken')
    const { data: taskData, loading: taskLoading } = useQuery(GET_ALL_TASKS)

    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");
    const [taskState, setTaskState] = useState()
    const [taskId, setTaskId] = useState("")


    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const [showModal1, setShowModal1] = useState(false);
    const handleShowModal1 = () => setShowModal1(true);
    const handleCloseModal1 = () => setShowModal1(false);

    const [showModal2, setShowModal2] = useState(false);
    const handleShowModal2 = () => setShowModal2(true);
    const handleCloseModal2 = () => setShowModal2(false);

    const [showModal3, setShowModal3] = useState(false);
    const handleShowModal3 = () => setShowModal3(true);
    const handleCloseModal3 = () => setShowModal3(false);

    if (!token) {
        return <Navigate to="/" />
    }

    function logoutHandle() {
        localStorage.removeItem('userToken')
        localStorage.removeItem('userId')
        window.location.reload()
    }

    return (
        <Container fluid className='mainContainer'>
            <h1 style={{ textAlign: 'center', fontFamily: 'DM Sans', paddingTop: 50, fontSize: 21, fontWeight: 'bold' }}>Dashboard</h1> <br />
            <Row>
                <Col className="d-flex">
                    <Button style={{ fontSize: 12, fontFamily: 'DM Sans', borderRadius: 0 }} onClick={handleShowModal}>Add Task <FaCirclePlus /></Button>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button style={{ fontSize: 12, fontFamily: 'DM Sans', borderRadius: 0 }} variant='danger' onClick={logoutHandle}>Logout <FiLogOut /></Button>
                </Col>
            </Row>
            <Row>
                <Col md={12} style={{ marginTop: 20, }}>
                    {
                        taskLoading ?
                            <Spinner animation="border" role="status" className="mx-auto d-block" /> :
                            <Table bordered hover className="transparent-table">
                                <thead>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>Taks Name</th>
                                        <th>Deadline</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        taskData && taskData.getAllTasks.slice().reverse().map((data) => (
                                            <tr>
                                                <td>{count++}</td>
                                                <td>{data.title}</td>
                                                <td>{data.deadline}</td>
                                                <td>
                                                    {
                                                        data.priority === "High" ?
                                                            <Badge pill bg="danger" style={{ cursor: 'pointer' }} onClick={() => { setTaskId(data.id); setPriority("High"); handleShowModal2() }}>
                                                                High <FaPen />
                                                            </Badge> :
                                                            data.priority === "Normal" ?
                                                                <Badge pill bg="info" style={{ cursor: 'pointer' }} onClick={() => { setTaskId(data.id); setPriority("Normal"); handleShowModal2() }}>
                                                                    Normal <FaPen />
                                                                </Badge> :
                                                                data.priority === "Low" ?
                                                                    <Badge pill bg="secondary" style={{ cursor: 'pointer' }} onClick={() => { setTaskId(data.id); setPriority("Low"); handleShowModal2() }}>
                                                                        Low <FaPen />
                                                                    </Badge> :
                                                                    ""
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        data.status === "Pending" ?
                                                            <Badge pill bg="warning" style={{ cursor: 'pointer' }} onClick={() => { setTaskId(data.id); setStatus("Pending"); handleShowModal3() }}>
                                                                Pending <FaPen />
                                                            </Badge>
                                                            :
                                                            data.status === "Completed" ?
                                                                <Badge pill bg="success" style={{ cursor: 'pointer' }} onClick={() => { setTaskId(data.id); setStatus("Completed"); handleShowModal3() }}>
                                                                    Completed <FaPen />
                                                                </Badge>
                                                                :
                                                                ""
                                                    }

                                                </td>
                                                <td>
                                                    <Button style={{ fontSize: 12, fontFamily: 'DM Sans', borderRadius: 0 }} size="sm" onClick={() => { setTaskState(data); handleShowModal1() }}><FaEye /></Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                    }

                </Col>
            </Row>

            <ToastContainer />
            <AddtaskModal show={showModal} handleClose={handleCloseModal} />
            <ViewTaskModal show={showModal1} handleClose={handleCloseModal1} taskState={taskState} />
            <ChangePriority show={showModal2} handleClose={handleCloseModal2} priority={priority} taskId={taskId} />
            <ChangeStatus show={showModal3} handleClose={handleCloseModal3} status={status} taskId={taskId} />
        </Container>
    )
}
