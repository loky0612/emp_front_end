import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import { Button, Card, CardBody, CardFooter, CardTitle, Col, FormGroup, Input, Label, Row } from "reactstrap"; // Importing Col and Row for Bootstrap grid layout
import Header from "../layouts/Header";
import { toast } from "react-hot-toast";
import Swal from 'sweetalert2';
import qr from '../assets/images/qr.png';
import axios from 'axios';

const qrConfig = { fps: 10, qrbox: { width: 300, height: 320 } };

let html5QrCode;

const Attendence = (props) => {
    const [scannedResult, setScannedResult] = useState(null);
    const [isImage, setImage] = useState('yes');
    const [scannerActive, setScannerActive] = useState(false);
    const navigate = useNavigate();

    const [html5QrCode, setHtml5QrCode] = useState(null);

    useEffect(() => {
        setHtml5QrCode(new Html5Qrcode("reader"));
    }, []);

    const markAttendence = async (result) => {
        try {
            if (result) {
                const { id, name, date, time } = result;
                await axios.post('/markAttendence', { id, name, date, time });
                console.log("Attendance Marked Successfully");
            }
        } catch (error) {
            console.error("Error marking attendance:", error.message);
            throw error; 
        }
    };
    markAttendence(scannedResult)


    const handleClickAdvanced = () => {
        if (html5QrCode) {
            if (scannerActive) {
                toast.success("Attendance Scanner already open", { position: 'bottom-right' });
            } else {
                setScannerActive(true);
                setImage('no');
                const qrCodeSuccessCallback = async (decodedText, decodedResult) => {
                    try {
                        const result = JSON.parse(decodedText);
                        if (isValidScannedResult(result)) {
                            Swal.fire({
                                title: 'Attendance Marked!',
                                text: 'Attendance marked to DB Successfully',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            }).then(() => {
                                markAttendence(result);
                            })
                            setScannedResult(result);
                            props.onResult(decodedText);
                            handleStop();
                        } else {
                            toast.error("Invalid QR code format");
                        }
                    } catch (error) {
                        console.error("Error processing QR code:", error.message);
                    }
                };
                html5QrCode.start({ facingMode: "environment" }, qrConfig, qrCodeSuccessCallback);
            }
        }
    };

    const isValidScannedResult = (result) => {
        return (
            result &&
            result.name &&
            result.id &&
            result.date &&
            result.time
        );
    };

    const handleStop = () => {
        if (scannerActive) {
            setScannerActive(false);
            setImage('yes');
            try {
                html5QrCode.stop()
                    .then((res) => {
                        html5QrCode.clear();
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            } catch (err) {
                console.log(err);
            }
        }
    };


    return (
        <>
            <Row>
                <Header />
            </Row>
            <div className="d-flex align-items-center justify-content-around h-100 mt-5">
                <Card style={{ width: "50%" }} className=" border rounded-4 ">
                    {
                        isImage == 'yes' &&
                        <div className=" m-2 ">
                            <img src={qr} className=" img-fluid " alt="Qr Scanner" />
                        </div>
                    }
                    <div className="d-flex align-items-center justify-content-center mb-3">
                        <div id="reader" style={{ width: "100%", height: "100%" }} />
                    </div>
                    <Row className="justify-content-center m-3">
                        <Col>
                            <Button className=" rounded-3 " color="primary" block onClick={() => handleClickAdvanced()}>
                                Mark Attendance {props.type}
                            </Button>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mb-4 me-3  ms-3 ">
                        <Col>
                            <Button className=" rounded-3" color="danger" block onClick={() => handleStop()}>Exit</Button>
                        </Col>
                    </Row>
                    {/* {scannedResult && <p className="text-center mt-3">Scanned Result: {scannedResult}</p>} */}
                </Card>
                <div>
                    <Card className=" border rounded-4" style={{ width: '400px' }}>
                        <CardBody>
                            <CardTitle className=" text-center border rounded-2 p-2" style={{ fontFamily: 'Poppins', fontWeight: 600 }}><i style={{ color: 'green' }} class="bi bi-calendar-check-fill me-2"></i>Check In</CardTitle>
                            <FormGroup className=" m-4">
                                <Label for="id" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>ID</Label>
                                <Input
                                    id="id"
                                    name="id"
                                    // placeholder="Enter Employee Name"
                                    type="text"
                                    value={scannedResult ? scannedResult.id : ""}
                                    disabled
                                // onChange={(e) => setEmpty(e.target.val)}
                                />
                            </FormGroup>
                            <FormGroup className=" m-4 ">
                                <Label for="name" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    // placeholder="Enter Employee Department"
                                    type="text"
                                    value={scannedResult ? scannedResult.name : ""}
                                    disabled
                                // onChange={(e) => setEmpty(e.target.val)}
                                />
                            </FormGroup>
                            <FormGroup className=" m-4 ">
                                <Label for="date" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Date</Label>
                                <Input
                                    id="date"
                                    name="date"
                                    // placeholder="Enter Employee Department"
                                    type="text"
                                    value={scannedResult ? scannedResult.date : ""}
                                    disabled
                                // onChange={(e) => setEmpty(e.target.val)}
                                />
                            </FormGroup>
                            <FormGroup className=" m-4 ">
                                <Label for="time" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>Time</Label>
                                <Input
                                    id="time"
                                    name="time"
                                    // placeholder="Enter Employee Department"
                                    type="text"
                                    value={scannedResult ? scannedResult.time : ""}
                                    disabled
                                // onChange={(e) => setEmpty(e.target.val)}
                                />
                            </FormGroup>
                            {
                                scannedResult ?
                                    <CardFooter style={{ backgroundColor: '#E1F6EA', textAlign: 'center' }} className=" rounded-2 m-2"><span style={{ color: 'green', fontWeight: '400' }}>Attendence Marked</span></CardFooter>
                                    : <CardFooter style={{ backgroundColor: '#E1F6EA', textAlign: 'center' }} className=" rounded-2 m-2 "><span style={{ color: 'green', fontWeight: '400' }}>Status : Not Scanned</span></CardFooter>
                            }

                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Attendence;
