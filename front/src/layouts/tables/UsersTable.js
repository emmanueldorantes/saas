import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, DatePicker, Select } from "antd";
import moment from "moment";
import { useMaterialUIController, setTransparentNavbar } from "context";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

const { Option } = Select;

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [controller, dispatch] = useMaterialUIController();

  useEffect(() => {
    const fetchData = async () => {
      const usersResponse = await axios.get("http://localhost:8000/users");
      setUsers(usersResponse.data);
      const profilesResponse = await axios.get("http://localhost:8000/profiles");
      setProfiles(profilesResponse.data);
    };
    fetchData();
  }, []);

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalVisible(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleDeleteUser = async (userId) => {
    await axios.delete(`http://localhost:8000/users/${userId}`);
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleSaveUser = async (values) => {
    if (editingUser) {
      await axios.put(`http://localhost:8000/users/${editingUser._id}`, values);
    } else {
      await axios.post("http://localhost:8000/users", values);
    }
    const usersResponse = await axios.get("http://localhost:8000/users");
    setUsers(usersResponse.data);
    setIsModalVisible(false);
  };

  const columns = [
    { title: "First Name", dataIndex: "first_name", key: "first_name" },
    { title: "Paternal Last Name", dataIndex: "paternal_last_name", key: "paternal_last_name" },
    { title: "Maternal Last Name", dataIndex: "maternal_last_name", key: "maternal_last_name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Birth Date", dataIndex: "birth_date", key: "birth_date" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Profiles", dataIndex: "profiles", key: "profiles" },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button onClick={() => handleEditUser(record)}>Edit</Button>
          <Button onClick={() => handleDeleteUser(record._id)} type="link" danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const initialUser = editingUser || {
    first_name: "",
    paternal_last_name: "",
    maternal_last_name: "",
    email: "",
    birth_date: moment(),
    status: "active",
    profiles: [],
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Button type="primary" onClick={handleAddUser}>
          Add User
        </Button>
        <Table columns={columns} dataSource={users} rowKey="_id" />
        <Modal
          title={editingUser ? "Edit User" : "Add User"}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form initialValues={initialUser} onFinish={handleSaveUser} id="userForm">
            <Form.Item
              name="first_name"
              label="First Name"
              rules={[{ required: true, message: "Please input the first name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="paternal_last_name"
              label="Paternal Last Name"
              rules={[{ required: true, message: "Please input the paternal last name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="maternal_last_name"
              label="Maternal Last Name"
              rules={[{ required: true, message: "Please input the maternal last name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input the email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="birth_date"
              label="Birth Date"
              rules={[{ required: true, message: "Please select the birth date!" }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please select the status!" }]}
            >
              <Select>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="profiles"
              label="Profiles"
              rules={[{ required: true, message: "Please select the profiles!" }]}
            >
              <Select mode="multiple">
                {profiles.map((profile) => (
                  <Option key={profile._id} value={profile._id}>
                    {profile.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default UsersTable;
