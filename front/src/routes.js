// src/routes.js
import Dashboard from "layouts/dashboard";
import UsersPage from "layouts/users/UsersPage";
import SignIn from "layouts/authentication/sign-in";

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
    name: "Users",
    key: "users",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/users",
    component: <UsersPage />,
  },
  {
    type: "route",
    name: "",
    key: "sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export default routes;
