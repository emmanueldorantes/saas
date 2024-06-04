// src/components/PageHeader.js

import React from "react";
import { useLocation } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const PageHeader = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  let pageTitle;
  switch (path) {
    case "dashboard":
      pageTitle = "Dashboard";
      break;
    case "users":
      pageTitle = "Users Table";
      break;
    case "profiles":
      pageTitle = "Profiles Table";
      break;
    default:
      pageTitle = "Page";
      break;
  }

  return (
    <MDBox mb={3}>
      <MDTypography variant="h4" fontWeight="medium">
        {pageTitle}
      </MDTypography>
    </MDBox>
  );
};

export default PageHeader;
