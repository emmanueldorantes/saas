import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import PageLayout from "examples/LayoutContainers/PageLayout";
import Footer from "layouts/authentication/components/Footer";
import { makeStyles } from "@mui/styles"; // Importar makeStyles para personalizar los estilos

// Crear los estilos personalizados
const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#ffffff", // Fondo blanco
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function BasicLayout({ children }) {
  const classes = useStyles();

  return (
    <PageLayout>
      <MDBox className={classes.root}>
        <MDBox px={1} width="100%" height="100vh" mx="auto">
          <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
            <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
              {children}
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer light />
    </PageLayout>
  );
}

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
