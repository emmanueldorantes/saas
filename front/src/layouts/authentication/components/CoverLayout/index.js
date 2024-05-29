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
  return (
    <PageLayout>
      <MDBox
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        minHeight="100vh"
        sx={{ paddingBottom: "40px" }}
      >
        <MDBox width={{ xs: "90%", sm: "80%", md: "70%", lg: "50%" }} mx="auto" my={5}>
          {children}
        </MDBox>
      </MDBox>
      <Footer />
    </PageLayout>
  );
}

// Setting default props for the CoverLayout
CoverLayout.defaultProps = {
  coverHeight: "35vh",
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  coverHeight: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
