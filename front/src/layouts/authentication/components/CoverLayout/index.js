import React from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import PageLayout from "examples/LayoutContainers/PageLayout";

function CoverLayout({ children }) {
  return (
    <PageLayout>
      <MDBox
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
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
    </PageLayout>
  );
}

CoverLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
