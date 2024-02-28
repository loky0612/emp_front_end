import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, DropdownToggle, DropdownMenu, DropdownItem, Dropdown, Button } from "reactstrap";
import logo from '../assets/images/employee logo.png'
import user1 from "../assets/images/user.png";
import '../views/App.css';

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const myprofile = () => {
    navigate('/myprofile')
  }
  return (
    <Navbar light expand="md" className="fix-header mb-2 me-2 header-color rounded-3">
      <div className="d-flex align-items-center justify-content-between  justify-content-lg-center w-100">
        <div className="d-flex align-items-center">
          <div className="d-lg-block d-none me-5 pe-3">
            <div className="d-flex align-items-center justify-content-center">
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 500, color: 'white' }} className="m-3">Employee Management</h3>
              <img src={logo} className="img-fluid" style={{ width: '35px' }} alt="logo" />
            </div>
          </div>
          <Button
            color="primary"
            className="d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-list"></i>
          </Button>
          <div className="d-lg-none d-flex align-items-center justify-content-center m-2">
            <h6 style={{ fontFamily: 'Poppins', fontWeight: 500, color: 'white'}} className="m-1">EmployeeManagement</h6>
          </div>
        </div>
        <div className="hstack d-lg-none  gap-2">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle color="transparent">
              <img
                src={user1}
                alt="profile"
                className="rounded-circle"
                width="25"
              />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Info</DropdownItem>
              <DropdownItem onClick={myprofile}>My Profile</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
