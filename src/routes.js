
// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import OtherTeams from "layouts/otherTeams";

import IssueSearch from "layouts/issue";

import IssueSearchid from "layouts/issue/index";

import Members from "layouts/myteam";

import IssueManage from "layouts/issue-manage";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Rejoin from "layouts/authentication/rejoin";
import Pm from "layouts/pm";

import Projects from "layouts/project"
import CreateGroup from "layouts/authentication/sign-up/creategroup";
import JoinGroup from "layouts/authentication/sign-up/joingroup";

import ReCreateGroup from "layouts/authentication/rejoin/creategroup";
import ReJoinGroup from "layouts/authentication/rejoin/joingroup";
import CreateRelease from "layouts/release/create";

import NewProject from "layouts/project/pages/newProject";
import MyPage from "layouts/project/pages/myPage";
import HomeCustom from "./layouts/homepage/index";

// @mui icons
import Icon from "@mui/material/Icon";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Release from "layouts/release";



const handleLogout = () => {
  // 로그아웃 버튼 클릭 시 실행되어야 할 작업을 여기에 정의합니다.
  console.log('로그아웃 버튼이 클릭되었습니다!');
  // 여기서 로그아웃 처리를 할 수 있습니다. 예를 들어, API 호출이나 로컬 상태 변경 등을 수행할 수 있습니다.
};
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
    name: "Members' Info",
    key: "memberinfo",
    icon: <Icon fontSize="small">groups</Icon>,
    route: "/members",
    component: <Members />,
  },
  {
    type: "collapse",
    name: "Members' Project",
    key: "memberproject",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/members-project",
    component: <OtherTeams />,
  },

  {
    type: "collapse",
    name: "Search Issues",
    key: "issueSearch",
    icon: <Icon fontSize="small">search</Icon>,
    route: "/issuesearch",
    component: <IssueSearch />,
  },
  {
    type: "collapse",
    name: "Manage Issues",
    key: "issue manage",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/issuemanagement",
    component: <IssueManage />,
  },
  {
    type: "collapse",
    name: "Release Note",
    key: "release",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/release",
    component: <Release />,
  },
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
    name: "PM",
    key: "pm",
    icon: <ManageAccountsIcon fontSize="small">pm</ManageAccountsIcon>,
    route: "/PM",
    component: <Pm />,
  },
  {
    type: "collapse",
    name: "Log out",
    key: "log-out",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "",
    name: "",
    key: "manage-project",
    icon: "",
    route: "/home/manage-project", // 상위 페이지 URL
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
    route: "/authentication/sign-up/create-group",
    component: <CreateGroup />,
  }, {
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
    key: "rejoin",
    icon: "",
    route: "/authentication/rejoin",
    component: <Rejoin />,
  },
  {
    type: "",
    name: "",
    key: "rejoin",
    icon: "",
    route: "/authentication/rejoin/create-group",
    component: <ReCreateGroup />,
  }, {
    type: "",
    name: "",
    key: "join-group",
    icon: "",
    route: "/authentication/rejoin/join-group",
    component: <ReJoinGroup />,
  },
  {
    type: "",
    name: "",
    key: "create-release",
    route: "/release/create",
    component: <CreateRelease />
  },
  {
    type: "",
    name: "",
    key: "/issuesearch-id",
    route: "/issuesearch/:id", // Use ":id" as a placeholder for the dynamic parameter
    component: <IssueSearchid />,
  },
  {
    type: "",
    name: "",
    key: "home",
    icon: "",
    route: "/home/project/new",
    component: <NewProject />,
  },
  {
    type: "",
    name: "",
    key: "home",
    icon: "",
    route: "/home/mypage",
    component: <MyPage />,
  },
  {
    type: "",
    name: "home",
    key: "home",
    icon: "",
    route: "/home",
    component: <HomeCustom />,
  },
];


export default routes;
