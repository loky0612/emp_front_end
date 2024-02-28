import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import EmployeeTable from "../components/EmployeeTable";
import axios from "axios";
import './App.css';
import { toast } from "react-hot-toast";
import Swal from 'sweetalert2';
import { Card, CardText, CardTitle, Button, Row, Col, CardBody, Form, FormGroup, Label, Input, FormText, } from "reactstrap";
import Header from "../layouts/Header";

const Starter = () => {

  const [totalEmployee, setTotalEmployee] = useState('');
  const [totalMembers, setTotalMembers] = useState('');
  const [totalRentals, setTotalRentals] = useState('');
  const [data, setData] = useState('')
  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get('/getEmployee');
        setTotalEmployee(res.data.length);
      } catch (error) {
        console.log(error);
      }
      try {
        const res = await axios.get('/getCardMembers');
        setTotalMembers(res.data.length);
      } catch (error) {
        console.log(error);
      }
      try {
        const res = await axios.get('/getRentals');
        setTotalRentals(res.data.length);
      } catch (error) {
        console.log(error);
      }
    }
    getDetails();
  });

  return (
    <div>
      <Row>
        <Header/>
      </Row>
      <Row>
        <h5 className="mb-3 mt-3">User ID : 2561101</h5>
        <Col md="6" lg="3">
          <Card body color="bg-cont rounded-3">
            <CardTitle tag="h5" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>Total Employees</CardTitle>
            <CardText>
              {totalEmployee}
            </CardText>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <EmployeeTable />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
