import React, { useState } from 'react'
import { Modal, Button, Form, Col, Row, Spinner } from 'react-bootstrap';
import { useMutation } from '@apollo/client'
import { CREATE_TASK } from '../../graphql/Mutation'
import { GET_ALL_TASKS } from '../../graphql/Query'
import { toast } from 'react-toastify';

export default function AddtaskModal({ show, handleClose }) {

    const [validated, setValidated] = useState(false);

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [deadline, setDeadline] = useState("")
    const [priority, setPriority] = useState("")

    const [createTask, { loading: createTaskLoading }] = useMutation(CREATE_TASK,
        {
            refetchQueries: [
                GET_ALL_TASKS
            ]
        }
    )

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            setValidated(false);
            event.preventDefault();

            createTask({
                variables: {
                    "taskInput": {
                        "title": `${title}`,
                        "description": `${description}`,
                        "deadline": `${deadline}`,
                        "priority": `${priority}`,
                        "status": "Pending"
                    }
                }
            }).then(() => {
                toast.success("Task added successfully!!!");
                setTitle("")
                setDescription("")
                setDeadline("")
                setPriority("")
                handleClose()
            })
        }

    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontFamily: 'DM Sans' }}>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                <Form.Label style={{ fontSize: 12, fontFamily: 'DM Sans', fontWeight: 'bold' }}>Task Name</Form.Label>
                                <Form.Control required type="text" placeholder="Enter Task Title" style={{ fontSize: 12, fontFamily: 'DM Sans' }} onChange={(e) => setTitle(e.target.value)} value={title} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                <Form.Label style={{ fontSize: 12, fontFamily: 'DM Sans', fontWeight: 'bold' }}>Task Description</Form.Label>
                                <Form.Control required as="textarea" placeholder="Enter Task Description" style={{ fontSize: 12, fontFamily: 'DM Sans' }} onChange={(e) => setDescription(e.target.value)} value={description} />
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                <Form.Label style={{ fontSize: 12, fontFamily: 'DM Sans', fontWeight: 'bold' }}>Deadline</Form.Label>
                                <Form.Control required type="date" placeholder="Enter Task Description" style={{ fontSize: 12, fontFamily: 'DM Sans' }} onChange={(e) => setDeadline(e.target.value)} value={deadline} />
                            </Form.Group>
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                <Form.Label style={{ fontSize: 12, fontFamily: 'DM Sans', fontWeight: 'bold' }}>Priority</Form.Label>
                                <Form.Select required style={{ fontFamily: 'DM Sans', fontSize: '12px' }} onChange={(e) => setPriority(e.target.value)} value={priority}>
                                    <option value="" selected="selected" disabled="disabled">Select Priority</option>
                                    <option value="High">High</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Low">Low</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        {
                            createTaskLoading ?
                                <Spinner animation="border" role="status" className="mx-auto d-block" /> :
                                <Button type="submit" style={{ fontSize: 12, fontFamily: 'DM Sans', borderRadius: 0 }} className='mx-auto d-block'>Add</Button>
                        }
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    )
}
