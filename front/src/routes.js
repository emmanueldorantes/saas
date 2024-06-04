// src/routes.js
import Dashboard from "layouts/dashboard";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import UsersTable from "layouts/tables/UsersTable";
import ProfilesTable from "layouts/profiles/ProfilesTable";

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
    key: "users-table",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/users-table",
    component: <UsersTable />,
  },
  {
    type: "route",
    name: "Profile",
    key: "profile",
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Profiles",
    key: "profiles",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profiles",
    component: <ProfilesTable />,
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
