import React, { useState } from 'react'
import { Modal, Button, Badge, Col, Row, Container } from 'react-bootstrap';
import { FaRegTrashCan, FaPencil } from "react-icons/fa6";
import { useMutation } from '@apollo/client'
import { GET_ALL_TASKS } from '../../graphql/Query'
import { TASK_DELETE } from '../../graphql/Mutation'
import EditTask from './EditTask';

import { toast } from 'react-toastify';


export default function ViewTaskModal({ show, handleClose, taskState }) {

    const [taskStateEdit, setTastStateEdit] = useState()
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const [deleteTask, { loading }] = useMutation(TASK_DELETE, {
        refetchQueries: [
            GET_ALL_TASKS
        ]
    })

    const handleDelete = (taskId) => {
        deleteTask({
            variables: {
                "taskId": `${taskId}`
            }
        }).then(() => {
            toast.error("Task deleted successfully!!!");
            handleClose()
        })
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontFamily: 'DM Sans' }}>Task Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1 style={{ fontFamily: 'DM Sans', textAlign: 'center', fontSize: 20 }}>{taskState && taskState.title}</h1>
                    <h1 style={{ fontFamily: 'DM Sans', textAlign: 'center', fontSize: 12 }}>{taskState && taskState.description}</h1>
                    <Container style={{ marginTop: 20 }}>
                        <Row>
                            <Col>
                                <p style={{ fontFamily: 'DM Sans', textAlign: 'center', fontSize: 12, fontWeight: 'bold' }}>Deadline</p>
                                <p style={{ fontFamily: 'DM Sans', textAlign: 'center', fontSize: 12 }}>{taskState && taskState.deadline}</p>
                            </Col>
                            <Col>
                                <p style={{ fontFamily: 'DM Sans', textAlign: 'center', fontSize: 12, fontWeight: 'bold' }}>Priority</p>
                                {
                                    taskState && taskState.priority === "High" ?
                                        <Badge pill bg="danger" className='mx-auto d-block'>
                                            High
                                        </Badge> :
                                        taskState && taskState.priority === "Normal" ?
                                            <Badge pill bg="info" className='mx-auto d-block'>
                                                Normal
                                            </Badge> :
                                            taskState && taskState.priority === "Low" ?
                                                <Badge pill bg="secondary" className='mx-auto d-block'>
                                                    Low
                                                </Badge> :
                                                ""
                                }
                            </Col>
                            <Col>
                                <p style={{ fontFamily: 'DM Sans', textAlign: 'center', fontSize: 12, fontWeight: 'bold' }}>Status</p>
                                {
                                    taskState && taskState.status === "Pending" ?
                                        <Badge pill bg="warning" className='mx-auto d-block'>
                                            Pending
                                        </Badge> :
                                        taskState && taskState.status === "Completed" ?
                                            <Badge pill bg="success" className='mx-auto d-block'>
                                                Completed
                                            </Badge> :
                                            ""
                                }
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setTastStateEdit(taskState); handleShowModal(); handleClose() }} style={{ fontFamily: 'DM Sans', textAlign: 'center', fontSize: 12, borderRadius: 0 }}>
                        Edit <FaPencil />
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(taskState && taskState.id)} style={{ fontFamily: 'DM Sans', textAlign: 'center', fontSize: 12, borderRadius: 0 }}>
                        Delete <FaRegTrashCan />
                    </Button>
                </Modal.Footer>
            </Modal>
            <EditTask show={showModal} handleClose={handleCloseModal} taskStateEdit={taskStateEdit} />
        </>
    )
}
