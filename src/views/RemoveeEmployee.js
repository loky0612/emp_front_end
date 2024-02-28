import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardText, CardTitle, Button, Row, Col, CardBody, Form, FormGroup, Label, Input, FormText, } from "reactstrap";
import axios from 'axios';
import { toast } from "react-hot-toast";
import Swal from 'sweetalert2';
import Header from '../layouts/Header';

const RemoveEmployee = () => {

    const [userData, setUserData] = useState([]);
    const [uniqueMessage, setUniqueMessage] = useState('');
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [empty, setEmpty] = useState('');
    const [notice, setNotice] = useState('');
    const [days, setDays] = useState('');

    const checkEmployee = async () => {
        try {
            const res = await axios.post('/checkEmployee', {
                id: id
            });
            if (res.data.length === 0) {
                setUniqueMessage("not-found");
            } else {
                const userD = res.data[0];
                setUserData(userD);
                setUniqueMessage("found");
            }
        } catch (error) {
            console.log(error);
        }
    }


    const data = {
        id: userData.id,
        name: userData.name,
        dept: userData.dept,
        desig: userData.desig,
        dob: userData.dob,
        gender: userData.gender,
        salary: userData.salary
    };

    console.log(days,"iii");
    const remove = async () => {
        if (uniqueMessage == "not-found") {
            toast.error("User not Found");
        } else {
            const { id, name, dept, desig, dob, gender, salary } = data;
            if (!id, !name, !dept, !desig, !dob, !gender, !salary, !notice) {
                toast.error("Kindly enter all the fields")
            } else {
                if (notice == "yes" && !days) {
                    toast.error("Kindly enter the notice period")
                } else {
                    if (notice == "yes") {
                        try {
                        
                            const res = await axios.post('/changeNotice', {
                                id, days
                            })
                            toast.success("Notice period assigned");
                            Swal.fire({
                                title: 'Notice Period Assigned',
                                text: 'View Employee at Notice Period Section !',
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
                    } else {
                        try {
                            const res = await axios.post('removeEmployee', {
                                id
                            });
                            toast.success("Employee removed");
                            Swal.fire({
                                title: 'Employee Removed',
                                text: 'Employee Removed Permanently from DB !',
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
    }

    return (
        <>
            <Row>
                <Header />
            </Row>
            <Row>
                <Col>
                    <Card className=' mt-4 rounded-4  '>
                        <CardTitle tag="h5" style={{ fontFamily: 'Poppins', fontWeight: 600 }} className="border-bottom p-3 mb-0">
                            Remove Employee
                        </CardTitle>
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label for="id" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Employee ID</Label>
                                    <div className="d-flex align-items-center">
                                        <Input
                                            id="id"
                                            name="id"
                                            placeholder="Enter Employee ID"
                                            type="text"
                                            onChange={(e) => setId(e.target.value)}
                                        />
                                        <Button color="primary" className="m-2" onClick={checkEmployee}>Search</Button>
                                    </div>
                                    {uniqueMessage && uniqueMessage == "found" && <small className="text-success m-1" >Employee found</small>}
                                    {uniqueMessage && uniqueMessage == "not-found" && <small className="text-warning">Employee not exist</small>}
                                </FormGroup>
                            </Form>
                            {id && uniqueMessage === "found" &&
                                <Form>
                                    <FormGroup>
                                        <Label for="name" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="Enter Employee Name"
                                            type="text"
                                            value={userData.name}
                                            disabled
                                            onChange={(e) => setEmpty(e.target.val)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="dept" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Department</Label>
                                        <Input
                                            id="dept"
                                            name="dept"
                                            placeholder="Enter Employee Department"
                                            type="text"
                                            value={userData.dept}
                                            disabled
                                            onChange={(e) => setEmpty(e.target.val)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="desig" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Designation</Label>
                                        <Input
                                            id="desig"
                                            name="desig"
                                            placeholder="Enter Employee Desig"
                                            type="text"
                                            value={userData.desig}
                                            disabled
                                            onChange={(e) => setEmpty(e.target.val)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="dob" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>DOB</Label>
                                        <Input
                                            id="dob"
                                            name="dob"
                                            placeholder="Enter Aadhar of Person"
                                            type="text"
                                            value={userData.dob}
                                            disabled
                                            onChange={(e) => setEmpty(e.target.val)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="gender" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Gender</Label>
                                        <Input
                                            id="gender"
                                            name="gender"
                                            placeholder="Enter Gender"
                                            type="text"
                                            value={userData.gender}
                                            disabled
                                            onChange={(e) => setEmpty(e.target.val)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="salary" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Salary</Label>
                                        <Input
                                            id="salary"
                                            name="salary"
                                            placeholder="Enter Employee Salary"
                                            type="text"
                                            value={userData.salary}
                                            disabled
                                            onChange={(e) => setEmpty(e.target.val)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="notice" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Assign Notice Period</Label>
                                        <Input
                                            type="select"
                                            name="notice"
                                            id="notice"
                                            onChange={(e) => setNotice(e.target.value)}
                                        >
                                            <option value="">Select</option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </Input>
                                    </FormGroup>
                                    {
                                        notice && notice == 'yes' &&
                                        <FormGroup>
                                            <Label for="days" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Notice Period ( In days )</Label>
                                            <Input
                                                type="select"
                                                name="days"
                                                id="days"
                                                onChange={(e) => setDays(e.target.value)}
                                            >
                                                <option value="">Select</option>
                                                <option value="15">15</option>
                                                <option value="30">30</option>
                                                <option value="45">45</option>
                                                <option value="60">60</option>
                                                <option value="90">90</option>
                                                <option value="120">120</option>
                                            </Input>
                                        </FormGroup>
                                    }
                                    <Button color="primary" onClick={remove}>Submit</Button>
                                </Form>
                            }
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );

}

export default RemoveEmployee;