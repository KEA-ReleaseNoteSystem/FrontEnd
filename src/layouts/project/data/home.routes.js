
// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import OtherTeams from "layouts/otherTeams";

import IssueSearch from "layouts/issue";
import Myteam from "layouts/myteam";

import IssueSearchid from "layouts/issue/index";

import Members from "layouts/myteam";

import Billing from "layouts/billing";
import notifications from "layouts/notifications";
import RTL from "layouts/rtl";
import Issue from "layouts/Board";
import IssueManage from "layouts/issue-manage";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Home from "layouts/home";
import Pm from "layouts/pm";

import Projects from "layouts/project"
import CreateGroup from "layouts/authentication/sign-up/creategroup";
import JoinGroup from "layouts/authentication/sign-up/joingroup";
import CreateRelease from "layouts/release/create";

import NewProject from "layouts/project/pages/newProject";
import MyPage from "layouts/project/pages/myPage";
// import HomeTest from "./layouts/homepage/index";

// @mui icons
import Icon from "@mui/material/Icon";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Release from "layouts/release";
import ViewRelease from "layouts/release/create";

// name, icon, href, route, collapse
const routes = [

  {
    type: "collapse",
    name: "프로젝트 생성",
    key: "memberinfo",
    icon: <Icon fontSize="small">groups</Icon>,
    href:"/home/project/new",
    component: <NewProject />,
  },
  {
    type: "collapse",
    name: "마이페이지",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    href: "/home/mypage",
    component: <MyPage />,
  },
  {
    type: "collapse",
    name: "Log out",
    key: "log-out",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];


export default routes;
