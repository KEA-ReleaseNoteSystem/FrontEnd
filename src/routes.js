
// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import OtherTeams from "layouts/otherTeams";
import Myteam from "layouts/myteam";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

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
    name: "My team",
    key: "myTeam",
    icon: <Icon fontSize="small">groups</Icon>,
    route: "/my-team",
    component: <Myteam />,
  },
  {
    type: "collapse",
    name: "OtherTeams",
    key: "otherTeams",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/otherTeams",
    component: <OtherTeams />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Issue",
    key: "issue",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/issue",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Release",
    key: "release",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/release",
    component: <Notifications />,
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
    name: "Log out",
    key: "log-out",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/authentication/log-out",
    component: <SignIn />,
  },
];

export default routes;
