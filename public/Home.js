import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Card, Spinner } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom';
import '../componentcss/homecss.css'
import { useMutation } from '@apollo/client'
import { USER_LOGIN } from '../graphql/Mutation'

export default function Home() {

    const token = localStorage.getItem('userToken')
    const [validated, setValidated] = useState(false);
    const [loginError, setLoginError] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [adminLogin, { data: userLoginData, loading: userLoginLoading }] = useMutation(USER_LOGIN, {
        onError(error) {
            setLoginError(true)
        }
    })

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setLoginError(false)
            setValidated(true);
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            setLoginError(false)
            setValidated(false);
            event.preventDefault();
            adminLogin({
                variables: {
                    "email": `${email}`,
                    "password": `${password}`
                }
            })
        }
    };

    if (userLoginData) {
        localStorage.setItem("userToken", userLoginData && userLoginData.userLogin.userToken)
        localStorage.setItem("userId", userLoginData && userLoginData.userLogin.userId)
        return <Navigate to="/dashboard" />
    }

    if (token) {
        return <Navigate to="/dashboard" />
    }


    return (
        <Container fluid className='mainContainer'>
            <h1 style={{ textAlign: 'center', fontFamily: 'DM Sans', paddingTop: 50 }}>Task Management System</h1>
            <Row style={{ marginTop: 100 }}>
                <Col md={4}></Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                                        <Form.Label style={{ fontFamily: 'DM sans' }}>Email</Form.Label>
                                        <Form.Control required type="email" placeholder="Enter Email" style={{ fontFamily: 'DM sans' }} onChange={(e) => setEmail(e.target.value)} value={email} />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="validationCustom02">
                                        <Form.Label style={{ fontFamily: 'DM sans' }}>Password</Form.Label>
                                        <Form.Control required type="password" placeholder="Enter Password" style={{ fontFamily: 'DM sans' }} onChange={(e) => setPassword(e.target.value)} value={password} />
                                    </Form.Group>
                                </Row>
                                {
                                    loginError ?
                                        <h1 style={{ fontSize: 12, fontFamily: 'DM Sans', textAlign: 'center', color: '#e74c3c' }}>Email & Password not match!!!</h1>
                                        :
                                        ""
                                }
                                {
                                    userLoginLoading ?
                                        <Spinner animation="border" role="status" className="mx-auto d-block" />
                                        :
                                        <Button type="submit" className='mx-auto d-block' style={{ borderRadius: 0, fontFamily: 'DM Sans' }}>Login</Button>
                                }
                            </Form>
                        </Card.Body>
                    </Card>

                </Col>
                <Col md={4}></Col>
            </Row>
        </Container>
    )
}
