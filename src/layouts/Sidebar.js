import { Button, Nav, NavItem } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Add Employee",
    href: "/addemp",
    icon: "bi bi-database-fill-add",
  },
  {
    title: "Remove Employee",
    href: "/removeEmployee",
    icon: "bi bi-person-x-fill",
  },
  {
    title: "Notice Period",
    href: "/noticedb",
    icon: "bi bi-calendar-x",
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: "bi bi-bell",
  },
  {
    title: "Mark Attendence",
    href: "/attendence",
    icon: "bi bi-journal-check",
  },
  {
    title: "Attendence Today",
    href: "/getAttendence",
    icon: "bi bi-calendar-check",
  },
  // {
  //   title: "Give Rent",
  //   href: "/rentbook",
  //   icon: "bi bi-bag-fill",
  // },
  // {
  //   title: "Rent Database",
  //   href: "/rentdb",
  //   icon: "bi bi-clipboard2-data-fill",
  // },
  {
    title: "Admin Profile",
    href: "/myprofile",
    icon: "bi bi-people",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  const navigate = useNavigate(); // Get the navigate function
  let location = useLocation();

  // Function to handle navigation
  const handleNavigation = (path) => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
    navigate(path);
  };

  return (
    <div>
      <div className="d-flex">
        <Button
          color="primary"
          className="ms-auto text-white d-lg-none m-3"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              {/* Call handleNavigation function on click */}
              <div
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link py-3 cursor-pointer"
                }
                onClick={() => handleNavigation(navi.href)}
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block" style={{ fontFamily: 'Poppins', fontWeight: 400 }}>{navi.title}</span>
              </div>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
