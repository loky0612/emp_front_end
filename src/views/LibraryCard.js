import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardText, CardTitle, Button, Row, Col, CardBody, Form, FormGroup, Label, Input, FormText, } from "reactstrap";
import axios from 'axios';
import { toast } from "react-hot-toast";
import Swal from 'sweetalert2';

const LibraryCard = () => {
    const [data, setData] = useState({
        card_no: '',
        name: '',
        email: '',
        contact: '',
        aadhar_no: '',
        dom: ''
    })

    const [uniqueMessage, setUniqueMessage] = useState('');
    const navigate = useNavigate();

    const addCard = async () => {
        if (uniqueMessage == "not-unique") {
            toast.error("Enter Unique Card Number");
        } else {
            const { card_no, name, email, address, contact, aadhar_no, dom } = data;
            if (card_no.length !== 12) {
                toast.error("Card number should be at length of 12");
            } else {
                try {
                    const res = await axios.post('/addCard', {
                        card_no, name, email, address, contact, aadhar_no, dom
                    })
                    toast.success("Card Created");
                    Swal.fire({
                        title: 'Card Creation Successfull',
                        text: 'New Library Card has been Created !',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        navigate('/cardmembers');
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    const checkUniqueness = async () => {
        const card_no = data.card_no;
        try {
            const res = await axios.post('/checkUniqueness', {
                card_no: card_no
            });
            setUniqueMessage(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    console.log(data.dom,"iii");
    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h5" style={{ fontFamily: 'Poppins', fontWeight: 600 }} className="border-bottom p-3 mb-0">
                        Create Library Card
                    </CardTitle>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="card_no" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Unique Library Card Number</Label>
                                <div className="d-flex align-items-center">
                                    <Input
                                        id="card_no"
                                        name="card_no"
                                        placeholder="Enter Unique Card Number"
                                        type="text"
                                        onChange={(e) => setData({ ...data, card_no: e.target.value })}
                                    />
                                    <Button color="primary" className="m-2" onClick={checkUniqueness}>Check</Button>
                                </div>
                                {uniqueMessage && uniqueMessage == "unique" && <small className="text-success m-1" >Card number is unique</small>}
                                {uniqueMessage && uniqueMessage == "not-unique" && <small className="text-warning">Card Number is not unique</small>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="name" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Enter Person Name"
                                    type="text"
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="Enter Person Email"
                                    type="text"
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="contact" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Contact</Label>
                                <Input
                                    id="contact"
                                    name="contact"
                                    placeholder="Enter Person Contact"
                                    type="text"
                                    onChange={(e) => setData({ ...data, contact: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="dom" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Date of Membership</Label>
                                <Input id="dom" name="dom" type="date" onChange={(e) => setData({ ...data, dom: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="aadhar_no" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Aadhar Number</Label>
                                <Input
                                    id="aadhar_no"
                                    name="aadhar_no"
                                    placeholder="Enter Aadhar of Person"
                                    type="text"
                                    onChange={(e) => setData({ ...data, aadhar_no: e.target.value })}
                                />
                            </FormGroup>
                            <Button color="primary" onClick={addCard}>Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );

}

export default LibraryCard