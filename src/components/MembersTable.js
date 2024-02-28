import { Card, CardBody, CardTitle, Table, Button, Input } from "reactstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import '../../src/views/App.css';


const MembersTable = (props) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({
    card_no: "",
    name: "",
  });

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get('/getCardMembers');
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
      book.card_no.toLowerCase().includes(filter.card_no.toLowerCase()) &&
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

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5" className="m-2" style={{ fontFamily: 'Poppins', fontWeight: 600 }}>Members Database</CardTitle>
          <div className="filters">
            <div className="row">
              <div className="col-md-6 col-lg-3">
                <Input
                  type="text"
                  placeholder="Filter by Card No"
                  value={filter.title}
                  onChange={e => setFilter({ ...filter, card_no: e.target.value })}
                  className="m-1"
                />
              </div>
              <div className="col-md-6 col-lg-3">
                <Input
                  type="text"
                  placeholder="Filter by Name"
                  value={filter.author}
                  onChange={e => setFilter({ ...filter, name: e.target.value })}
                  className="m-1"
                />
              </div>
            </div>
          </div>
          <Table className="no-wrap mt-3 align-middle" responsive borderless striped>
            <thead>
              <tr>
                <th>Card No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Membership Date</th>
                <th>Contact</th>
                <th>Aadhar No</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((data, index) => (
                <tr key={index} className="border-top">
                  <td>{data.card_no}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.dom}</td>
                  <td>{data.contact}</td>
                  <td>{data.aadhar_no}</td>
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

export default MembersTable;
