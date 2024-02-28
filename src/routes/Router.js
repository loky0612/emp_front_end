import { lazy } from "react";
import AddEmployee from "../views/AddEmployee.js";
import LibraryCard from "../views/LibraryCard.js";
import CardMembers from "../views/CardMembers.js";
import RentBook from "../views/RemoveeEmployee.js";
import RentDatabase from "../views/NoticeDb.js";
import Notifications from "../views/Notifications.js";
import NoticeDB from "../views/NoticeDb.js";
import Attendence from "../views/Attendence.js";
import AttendenceToday from "../views/AttendenceToday.js";

const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"))

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", exact: true, element: <Starter /> },
      { path: "/addemp", exact: true, element: <AddEmployee /> },
      { path: "/notifications", exact: true, element: <Notifications /> },
      { path: "/cardmembers", exact: true, element: <CardMembers/> },
      { path: "/removeEmployee", exact: true, element: <RentBook/> },
      { path: "/noticedb", exact: true, element: <NoticeDB/> },
      { path: "/attendence", exact: true, element: <Attendence/> },
      { path: "/getAttendence", exact: true, element: <AttendenceToday/> },
      { path: "/myprofile", exact: true, element: <About /> },
    ],
  },
];

export default ThemeRoutes;
