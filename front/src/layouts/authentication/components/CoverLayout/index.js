<<<<<<< HEAD
import React from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import PageLayout from "examples/LayoutContainers/PageLayout";

function CoverLayout({ children }) {
=======
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication layout components
import Footer from "layouts/authentication/components/Footer";

function CoverLayout({ coverHeight, children }) {
>>>>>>> 16b7cee11c837688b9310dd3470549e967640c19
  return (
    <PageLayout>
      <MDBox
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
<<<<<<< HEAD
        sx={{
          minHeight: "100vh",
          overflowY: "auto",
          paddingBottom: "0px",
        }}
      >
        <MDBox
          width={{ xs: "100%", sm: "90%", md: "75%", lg: "60%" }}
          mx="auto"
          my={2}
          sx={{
            padding: "20px",
            maxWidth: "1000px",
            marginBottom: "2px",
          }}
        >
          {children}
        </MDBox>
      </MDBox>
=======
        minHeight="100vh"
        sx={{ paddingBottom: "40px" }}
      >
        <MDBox width={{ xs: "90%", sm: "80%", md: "70%", lg: "50%" }} mx="auto" my={5}>
          {children}
        </MDBox>
      </MDBox>
      <Footer />
>>>>>>> 16b7cee11c837688b9310dd3470549e967640c19
    </PageLayout>
  );
}

<<<<<<< HEAD
CoverLayout.propTypes = {
=======
// Setting default props for the CoverLayout
CoverLayout.defaultProps = {
  coverHeight: "35vh",
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  coverHeight: PropTypes.string,
>>>>>>> 16b7cee11c837688b9310dd3470549e967640c19
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
