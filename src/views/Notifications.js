import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
  Row,
  Table
} from "reactstrap";
import Header from "../layouts/Header";
import Swal from "sweetalert2";
import axios from "axios";

const Notifications = () => {
  const [feedData, setFeedData] = useState([]);
  const [bellColor, setBellColor] = useState("primary");
  const [bellStatus, setBellStatus] = useState("Active");
  const [count, setCount] = useState('');
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const res = await axios.get('/getNotifications');
        setFeedData(res.data);
        setCount(res.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    getNotifications();
  }, []);

  const handleDeleteConfirmation = async () => {
    try {
      const res = await axios.post('/deleteNotifications', {
        confirm: "confirm"
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = () => {
    if (count == '0') {
      Swal.fire({
        title: 'Notifications Empty',
        text: 'No notifications to delete !',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
    } else {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success m-3",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "All the notifications will be deleted !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          handleDeleteConfirmation();
          swalWithBootstrapButtons.fire({
            title: "Deleted !",
            text: "All notifications are deleted.",
            icon: "success"
          }).then(() => { window.location.reload() });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your notifications are restored",
            icon: "error"
          });
        }
      });
    }
  }

  return (
    <div>
      <Row>
        <Header />
      </Row>
      <Card className="mt-4 rounded-4 ">
        <CardBody>
          <div className=" d-flex  justify-content-between ">
            <div>
              <div className=" d-flex">
                <CardTitle tag="h5" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Notifications</CardTitle>
                <span className=" ms-3">{count}</span>
              </div>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                View the recent notifications
              </CardSubtitle>
            </div>
            <Button
              className=" rounded-circle "
              style={{ width: '50px', height: '50px' }}
              size="sm"
              color="danger"
              title="Delete Notification"
              onClick={handleDelete}
            >
              <i className="bi bi-trash3"></i>
            </Button>
          </div>
          <ListGroup className="mt-4">
            {feedData.reverse().map((feed, index) => (
              <div style={{ overflowX: 'auto' }}>
                <ListGroupItem
                  key={index}
                  action
                  href="/"
                  tag="a"
                  className="d-flex flex-sm-nowrap align-items-center p-3 border rounded-2  mt-3 overflow-scroll "
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <Button
                    className="rounded-circle me-3"
                    size="sm"
                    color={bellColor}
                    onClick={() => console.log("Bell button clicked")}
                  >
                    <i className="bi bi-bell"></i>
                  </Button>
                  {feed.alert}
                  <small className="ms-2 ms-md-auto text-muted text-small">
                    {feed.time}
                  </small>
                </ListGroupItem>
              </div>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </div>
  );
};

export default Notifications;
