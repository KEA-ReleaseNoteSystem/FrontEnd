
// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Members from "layouts/myteam";
// import HomeTest from "./layouts/homepage/index";
// @mui icons
import Icon from "@mui/material/Icon";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
// name, icon, href, route, collapse
const routes = [
  {
    type: "collapse",
    name: "회원가입",
    key: "dashboard",
    icon: <AppRegistrationIcon fontSize="small">dashboard</AppRegistrationIcon>,
    route: "/authentication/sign-up",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "로그인",
    key: "memberinfo",
    icon: <LoginIcon fontSize="small">groups</LoginIcon>,
    route:"/authentication/sign-in",
    component: <Members />,
  },
];


export default routes;
