import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import { Card, CardText, CardTitle, Button, Row, Col, CardBody, Form, FormGroup, Label, Input, FormText, } from "reactstrap";
import RentalsTable from "../components/NoticeTable";
import NoticeTable from "../components/NoticeTable";
import Header from "../layouts/Header";

const NoticeDB = () => {
  const [totalNotice, setTotalNotice] = useState('');
  const [data, setData] = useState('')
  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get('/getNotice');
        setTotalNotice(res.data.length);
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
            <CardTitle tag="h5" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>Total Employees in Notice Period</CardTitle>
            <CardText>
              {totalNotice}
            </CardText>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <NoticeTable />
        </Col>
      </Row>
    </div>
  );
};

export default NoticeDB;
