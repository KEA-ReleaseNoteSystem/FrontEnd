
// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import OtherTeams from "layouts/otherTeams";
import Myteam from "layouts/myteam";
import Billing from "layouts/billing";
import notifications from "layouts/notifications";
import RTL from "layouts/rtl";
import ProjectBoard from "layouts/Board";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Home from "layouts/home"
import Projects from "layouts/project"
import CreateGroup from "layouts/authentication/sign-up/creategroup";
import JoinGroup from "layouts/authentication/sign-up/joingroup";

// @mui icons
import Icon from "@mui/material/Icon";
import Release from "layouts/release";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "My Team",
    key: "myTeam",
    icon: <Icon fontSize="small">groups</Icon>,
    route: "/myTeam",
    component: <Myteam />,
  },
  {
    type: "collapse",
    name: "Other Teams",
    key: "otherTeams",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/otherTeams",
    component: <OtherTeams />,
  },
  {
    type: "collapse",
    name: "Issue",
    key: "issue",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/issue",
    component: <ProjectBoard />,
  },
  {
    type: "collapse",
    name: "Release",
    key: "release",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/release",
    component: <Release />,
  },
  // {
  //   type: "collapse",
  //   name: "Release",
  //   key: "release",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/release",
  //   component: <Board />,
  // },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Log out",
    key: "log-out",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  //테스트용
  {
    type: "collapse",
    name: "projects",
    key: "log-out",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/home/manageProject",
    component: <Projects />,
  },
  {
    type: "",
    name: "",
    key: "sign-up",
    icon: "",
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "",
    name: "",
    key: "create-group",
    icon: "",
    route: "authentication/sign-up/create-group",
    component: <CreateGroup />,
  },{
    type: "",
    name: "",
    key: "join-group",
    icon: "",
    route: "/authentication/sign-up/join-group",
    component: <JoinGroup />,
  },
  {
    type: "",
    name: "",
    key: "home",
    icon: "",
    route: "/home",
    component: <Home />,
  },
];

export default routes;
