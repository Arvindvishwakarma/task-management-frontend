import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Col, Row, Spinner } from 'react-bootstrap';
import { useMutation } from '@apollo/client'
import { CHANGE_STATUS } from '../../graphql/Mutation'
import { GET_ALL_TASKS } from '../../graphql/Query'
import { toast } from 'react-toastify';

export default function ChangeStatus({ show, handleClose, status, taskId }) {

    const [validated, setValidated] = useState(false);
    const [statusState, setStatusState] = useState('')

    useEffect(() => {
        setStatusState(status)
    }, [status])


    const [changeStatus, { loading: changeTaskLoading }] = useMutation(CHANGE_STATUS,
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
            setValidated(true);
            event.preventDefault();
            changeStatus({
                variables: {
                    "taskId": `${taskId}`,
                    "status": `${statusState}`
                }
            }).then(() => {
                toast.success("Status updated successfully!!!");
                handleClose()
            })
        }
    };


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title style={{ fontFamily: 'DM Sans' }}>Change Status {status}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                            <Form.Label style={{ fontSize: 12, fontFamily: 'DM Sans', fontWeight: 'bold' }}>Status</Form.Label>
                            <Form.Select required style={{ fontFamily: 'DM Sans', fontSize: '12px' }} onChange={(e) => setStatusState(e.target.value)} value={statusState}>
                                <option value="" selected="selected" disabled="disabled">Select Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    {
                        changeTaskLoading ?
                            <Spinner animation="border" role="status" className="mx-auto d-block" /> :
                            <Button type="submit" style={{ fontSize: 12, fontFamily: 'DM Sans', borderRadius: 0 }} className='mx-auto d-block'>Change</Button>
                    }
                </Form>
            </Modal.Body>
        </Modal>
    )
}
