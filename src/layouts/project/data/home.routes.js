import SignIn from "layouts/authentication/sign-in";
import NewProject from "layouts/project/pages/newProject";
import MyPage from "layouts/project/pages/myPage";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// @mui icons
import Icon from "@mui/material/Icon";
import NoteAddIcon from '@mui/icons-material/NoteAdd';

// name, icon, href, route, collapse
const routes = [

  {
    type: "collapse",
    name: "프로젝트 생성",
    key: "memberinfo",
    icon: <NoteAddIcon fontSize="small">NoteAdd</NoteAddIcon>,
    route:"/home/project/new",
    component: <NewProject />,
  },
  {
    type: "collapse",
    name: "마이페이지",
    key: "dashboard",
    icon: <AccountCircleIcon fontSize="small">dashboard</AccountCircleIcon>,
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
