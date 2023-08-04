import SignIn from "layouts/authentication/sign-in";
import NewProject from "layouts/project/pages/newProject";
import MyPage from "layouts/project/pages/myPage";

// @mui icons
import Icon from "@mui/material/Icon";

// name, icon, href, route, collapse
const routes = [

  {
    type: "collapse",
    name: "프로젝트 생성",
    key: "memberinfo",
    icon: <Icon fontSize="small">groups</Icon>,
    route:"/home/project/new",
    component: <NewProject />,
  },
  {
    type: "collapse",
    name: "마이페이지",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/home/mypage",
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
