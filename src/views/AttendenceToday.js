import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import { Card, CardText, CardTitle, Button, Row, Col, CardBody, Form, FormGroup, Label, Input, FormText, } from "reactstrap";
import Header from "../layouts/Header";
import AttendenceTable from "../components/AttendenceTable";
import AbsentTable from "../components/AbsentTable";

const AttendenceToday = () => {
  const [total, setTotal] = useState('');
  const [data, setData] = useState('')
  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get('/getAttendence');
        setTotal(res.data.length);
      } catch (error) {
        console.log(error);
      }
    }
    getDetails();
  });

  return (
    <div>
      <Row>
        <Header />
      </Row>
      <Row>
        <Col md="6" lg="3">
          <Card body className=" mt-4 " color="light-warning">
            <CardTitle tag="h5" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>Total Employees Present</CardTitle>
            <CardText>
              {total}
            </CardText>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <AttendenceTable />
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <AbsentTable />
        </Col>
      </Row>
    </div>
  );
};

export default AttendenceToday;
