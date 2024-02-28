import { Card, CardBody, CardTitle, Table, Button, Input } from "reactstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import '../../src/views/App.css';
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AttendenceTable = (props) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({
    emp_id: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get('/getAttendence');
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
      book.emp_id.toString().toLowerCase().includes(filter.emp_id.toLowerCase())
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


  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5" className="m-2" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Employees Present Today</CardTitle>
          <div className="filters">
            <div className="row">
              <div className="col-md-6 col-lg-3">
                <Input
                  type="text"
                  placeholder="Filter by ID"
                  value={filter.emp_id}
                  onChange={e => setFilter({ ...filter, emp_id: e.target.value })}
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
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((data, index) => (
                <tr key={index} className="border-top">
                  <td>{data.emp_id}</td>
                  <td>{data.name}</td>
                  <td>{data.date}</td>
                  <td>{data.time}</td>
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

export default AttendenceTable;
