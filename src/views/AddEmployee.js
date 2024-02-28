import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardText, CardTitle, Button, Row, Col, CardBody, Form, FormGroup, Label, Input, FormText, } from "reactstrap";
import axios from 'axios';
import { toast } from "react-hot-toast";
import Swal from 'sweetalert2';
import Header from '../layouts/Header';


const AddEmployee = () => {
    const [data, setData] = useState({
        id: '',
        name: '',
        dept: '',
        desig: '',
        dob: '',
        gender: '',
        salary: '',
        email: '',
        pass: ''
    })
    console.log(data);

    const [uniqueMessage, setUniqueMessage] = useState('');
    const navigate = useNavigate();

    const addEmp = async () => {
        const { id, name, dept, desig, dob, gender, salary, email } = data;
        const password = "123456";
        const notice = "no";
        const days = 0;
        if (!name || !id || !dept || !desig || !dob || !gender || !salary || !email || !password) {
            toast.error("Kindly enter all the fields");
        } else {
            if (name.length > 50) {
                toast.error("Employee name should not exceed 30 characters");
            } else if (salary <= 0) {
                toast.error("Enter a valid salary");
            }
            else {
                const birthDate = new Date(dob);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                if (age < 18) {
                    toast.error("Employee must be at least 18 years old");
                } else {
                    try {
                        const res = await axios.post('/addEmployee', {
                            id, name, dept, desig, dob, gender, salary, notice, days, email, password
                        })
                        toast.success("Employee Added");
                        Swal.fire({
                            title: 'Employee Added !',
                            text: 'New Employee Added to DB Successfullly',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then((result) => {
                            navigate('/');
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

    }

    const generateid = async () => {
        try {
            const res = await axios.get('/getid');
            setData({ ...data, id: res.data })
        } catch (error) {
            console.log(error);
        }
    }

    console.log(data.id, "ooo");
    return (
        <>
            <Row>
                <Header />
            </Row>
            <Row>
                <Col >
                    <Card className="rounded-4 mt-4">
                        <CardTitle tag="h5" style={{ fontFamily: 'Poppins', fontWeight: 600 }} className="border-bottom p-3 mb-0">
                            Add Employee
                        </CardTitle>
                        <CardBody className="m-1 ">
                            <Form>
                                <FormGroup>
                                    <Label for="card_no" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Unique ID Number</Label>
                                    <div className="d-flex align-items-center">
                                        <Input
                                            id="id"
                                            name="id"
                                            placeholder="ID Number"
                                            type="text"
                                            disabled
                                            value={data.id ? data.id : ""}
                                            onChange={(e) => setData({ ...data, id: e.target.value })}
                                        />
                                        <Button color="primary" className="m-2" onClick={generateid}>Generate</Button>
                                    </div>
                                    {uniqueMessage && uniqueMessage == "unique" && <small className="text-success m-1" >Card number is unique</small>}
                                    {uniqueMessage && uniqueMessage == "not-unique" && <small className="text-warning">Card Number is not unique</small>}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="name" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Enter Employee Name"
                                        type="text"
                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="dept" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Department</Label>
                                    <Input
                                        type="select"
                                        name="dept"
                                        id="dept"
                                        onChange={(e) => setData({ ...data, dept: e.target.value })}
                                    >
                                        <option value="">Select Department</option>
                                        <option value="HR">HR</option>
                                        <option value="Administration">Administration</option>
                                        <option value="Sales">Sales</option>
                                        <option value="Marketting">Marketting</option>
                                        <option value="Finance">Finance</option>
                                        <option value="IT">IT</option>
                                        <option value="Production">Production</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="dept" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Designation</Label>
                                    <Input
                                        type="select"
                                        name="dept"
                                        id="dept"
                                        onChange={(e) => setData({ ...data, desig: e.target.value })}
                                    >
                                        <option value="">Select Designation</option>
                                        <option value="Developer">Developer</option>
                                        <option value="Administrator">Administrator</option>
                                        <option value="Sales Person">Sales Person</option>
                                        <option value="Marketter">Marketter</option>
                                        <option value="Financer">Financer</option>
                                        <option value="Full Stack">Full Stack</option>
                                        <option value="Non voice">Non voice</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="dob" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Date of Birth</Label>
                                    <Input id="dob" name="dob" type="date" onChange={(e) => setData({ ...data, dob: e.target.value })} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="book" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Gender</Label>
                                    <Input
                                        type="select"
                                        name="gender"
                                        id="gender"
                                        onChange={(e) => setData({ ...data, gender: e.target.value })}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="salary" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Salary</Label>
                                    <Input
                                        id="salary"
                                        name="salary"
                                        placeholder="Enter Employee Salary"
                                        type="text"
                                        onChange={(e) => setData({ ...data, salary: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        placeholder="Enter Employee Mail ID"
                                        type="email"
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Default Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        placeholder="Enter Employee Password"
                                        type="text"
                                        value="123456"
                                        disabled
                                        onChange={(e) => setData({ ...data, pass: e.target.value })}
                                    />
                                </FormGroup>
                                <Button color="primary" onClick={addEmp}>Submit</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );

}

export default AddEmployee;