import { Card, CardBody, CardTitle, Table, Button, Input } from "reactstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import '../../src/views/App.css';

const EmployeeTable = (props) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({
    id: "",
    name: "",
    dept: "",
    desig: ""
  });

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get('/getEmployee');
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
      book.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      book.dept.toLowerCase().includes(filter.dept.toLowerCase()) &&
      book.desig.toLowerCase().includes(filter.desig.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;
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
      <Card className="rounded-4">
        <CardBody>
          <CardTitle tag="h5" className="m-2" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Employee Database</CardTitle>
          <div className="filters">
            <div className="row">
              <div className="col-md-6 col-lg-3">
                <Input
                  type="text"
                  placeholder="Filter by Name"
                  value={filter.name}
                  onChange={e => setFilter({ ...filter, name: e.target.value })}
                  className="m-1"
                />
              </div> 
              <div className="col-md-6 col-lg-3">
                <Input
                  type="text"
                  placeholder="Filter by Department"
                  value={filter.dept}
                  onChange={e => setFilter({ ...filter, dept: e.target.value })}
                  className="m-1"
                />
              </div>
              <div className="col-md-6 col-lg-3">
                <Input
                  type="text"
                  placeholder="Filter by Designation"
                  value={filter.desig}
                  onChange={e => setFilter({ ...filter, desig: e.target.value })}
                  className="m-1"
                />
              </div>
              <div className="col-md-6 col-lg-3">
                <Input
                  type="text"
                  placeholder="Filter by ID"
                  value={filter.id}
                  onChange={e => setFilter({ ...filter, id: e.target.value })}
                  className="m-1"
                />
              </div>
            </div>
          </div>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead >
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((data, index) => (
                <tr key={index} className="border-top">
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.dept}</td>
                  <td>{data.desig}</td>
                  <td>{data.dob}</td>
                  <td>{data.gender}</td>
                  <td>{data.salary}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text">
            <div className=" d-flex justify-content-lg-end justify-content-md-center justify-content-sm-center ">
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
            </div>
          </div>
        </CardBody>
      </Card>
    </div >
  );

};

export default EmployeeTable;
