import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Col, Row, Spinner } from 'react-bootstrap';
import { useMutation } from '@apollo/client'
import { CHANGE_PRIORITY } from '../../graphql/Mutation'
import { GET_ALL_TASKS } from '../../graphql/Query'
import { toast } from 'react-toastify';

export default function ChangePriority({ show, handleClose, priority, taskId }) {

    const [validated, setValidated] = useState(false);
    const [priorityState, setPriorityState] = useState('')

    useEffect(() => {
        setPriorityState(priority)
    }, [priority])


    const [changePriority, { loading: changePriorityLoading }] = useMutation(CHANGE_PRIORITY,
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

            changePriority({
                variables: {
                    "taskId": `${taskId}`,
                    "priority": `${priorityState}`
                }
            }).then(() => {
                toast.success("Priority updated successfully!!!");
                handleClose()
            })

        }
    };


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title style={{ fontFamily: 'DM Sans' }}>Change Priority {taskId}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                            <Form.Label style={{ fontSize: 12, fontFamily: 'DM Sans', fontWeight: 'bold' }}>Priority</Form.Label>
                            <Form.Select required style={{ fontFamily: 'DM Sans', fontSize: '12px' }} onChange={(e) => setPriorityState(e.target.value)} value={priorityState}>
                                <option value="" selected="selected" disabled="disabled">Select Priority</option>
                                <option value="High">High</option>
                                <option value="Normal">Normal</option>
                                <option value="Low">Low</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    {
                        changePriorityLoading ?
                            <Spinner animation="border" role="status" className="mx-auto d-block" /> :
                            <Button type="submit" style={{ fontSize: 12, fontFamily: 'DM Sans', borderRadius: 0 }} className='mx-auto d-block'>Change</Button>
                    }
                </Form>
            </Modal.Body>
        </Modal>
    )
}
