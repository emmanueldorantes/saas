<<<<<<< HEAD
import React from "react"; // Comillas dobles en lugar de simples
// Asegúrate de importar cualquier otro componente o librería necesaria para este componente
// Por ejemplo:
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";

function UsersPage() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>Contenido de la página de usuarios aquí</MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default UsersPage;
=======
import Dashboard from "layouts/dashboard";
import UsersPage from "layouts/users/UsersPage"; // Asegúrate de que la ruta y el nombre del archivo sean correctos
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
    type: "collapse",
    name: "",
    key: "sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export default routes;
>>>>>>> 16b7cee11c837688b9310dd3470549e967640c19
