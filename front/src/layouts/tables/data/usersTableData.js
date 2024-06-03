import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Importa PropTypes
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { getUsers } from "api"; // Importa la función para obtener los usuarios

export default function usersTableData() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const usersData = await getUsers();
      setUsers(usersData);
    }
    fetchUsers();
  }, []);

  const User = ({ name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  User.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  };

  return {
    columns: [
      { Header: "Name", accessor: "name", width: "45%", align: "left" },
      { Header: "Email", accessor: "email", align: "left" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: users.map((user) => ({
      name: (
        <User
          name={`${user.first_name} ${user.paternal_last_name} ${user.maternal_last_name}`}
          email={user.email}
        />
      ),
      email: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {user.email}
        </MDTypography>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </MDTypography>
      ),
    })),
  };
}
