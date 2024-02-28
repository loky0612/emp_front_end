import { Card, CardBody, CardTitle, Table, Button, Input } from "reactstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import '../../src/views/App.css';
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const NoticeTable = (props) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({
    id: "",
    name: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get('/getNotice');
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDetails();
  }, []);

  useEffect(() => {
    filterData();
  }, [data, filter]);

  const filterData = () => {
    let filtered = data.filter(book =>
      book.id.toString().toLowerCase().includes(filter.id.toLowerCase()) &&
      book.name.toLowerCase().includes(filter.name.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 7;
  const totalPages = Math.ceil(filteredData.length / booksPerPage);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredData.slice(indexOfFirstBook, indexOfLastBook);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const calculateRemainingDays = (noticeDate, noticeDays) => {
    // Parse the notice date from the database string
    const [day, month, year] = noticeDate.split('-').map(Number);
    const noticeDateObj = new Date(year, month - 1, day);

    // Calculate the end date of the notice period by adding notice days to the notice date
    const endDate = new Date(noticeDateObj);
    endDate.setDate(endDate.getDate() + noticeDays);

    // Get the current date
    const currentDateObj = new Date();

    // Calculate the remaining days by subtracting the current date from the end date of the notice period
    const timeDifference = endDate.getTime() - currentDateObj.getTime();
    const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return remainingDays;
  };

  const remove = async(id) => {
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



  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5" className="m-2" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Employees at Notice Period</CardTitle>
          <div className="filters">
            <div className="row">
              <div className="col-md-6 col-lg-3">
                <Input
                  type="text"
                  placeholder="Filter by ID"
                  value={filter.id}
                  onChange={e => setFilter({ ...filter, id: e.target.value })}
                  className="m-1"
                />
              </div>
              <div className="col-md-6 col-lg-3">
                <Input
                  type="text"
                  placeholder="Filter by Name"
                  value={filter.name}
                  onChange={e => setFilter({ ...filter, name: e.target.value })}
                  className="m-1"
                />
              </div>
            </div>
          </div>
          <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Date of Notice</th>
                <th>Notice Period</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((data, index) => (
                <tr key={index} className="border-top">
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.dept}</td>
                  <td>{data.notice_day}</td>
                  <td>{calculateRemainingDays(data.notice_day, data.days)}</td>
                  <td>
                    {calculateRemainingDays(data.notice_day, data.days) == 0 ? (
                      <Button
                        color="primary"
                        onClick={() => remove(data.id)}
                        className="m-2"
                      >
                        Remove
                      </Button>
                    ) : (
                      "Notice period not ended"
                    )
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text">
            <Button
              color="primary"
              disabled={currentPage === 1}
              onClick={prevPage}
              className="m-2"
            >
              Previous
            </Button>
            <Button
              color="primary"
              disabled={currentPage === totalPages}
              onClick={nextPage}
              className="m-2"
            >
              Next
            </Button>
            <p className="m-2">Page {currentPage} of {totalPages}</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );

};

export default NoticeTable;
