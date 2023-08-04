
// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Members from "layouts/myteam";
// import HomeTest from "./layouts/homepage/index";
// @mui icons
import Icon from "@mui/material/Icon";

// name, icon, href, route, collapse
const routes = [
  {
    type: "collapse",
    name: "회원가입",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/authentication/sign-up",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "로그인",
    key: "memberinfo",
    icon: <Icon fontSize="small">groups</Icon>,
    route:"/authentication/sign-in",
    component: <Members />,
  },
];


export default routes;
