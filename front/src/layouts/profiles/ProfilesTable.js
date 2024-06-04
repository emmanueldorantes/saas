import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Footer from "examples/Footer";
import axios from "axios";

const { Option } = Select;

const ProfilesTable = () => {
  const [profiles, setProfiles] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get("http://localhost:8000/profiles");
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  const handleAddProfile = () => {
    setEditingProfile(null);
    setIsModalVisible(true);
  };

  const handleEditProfile = (profile) => {
    setEditingProfile(profile);
    setIsModalVisible(true);
  };

  const handleDeleteProfile = async (profileId) => {
    try {
      await axios.delete(`http://localhost:8000/profiles/${profileId}`);
      fetchProfiles();
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  const handleSaveProfile = async (values) => {
    try {
      if (editingProfile) {
        await axios.put(`http://localhost:8000/profiles/${editingProfile._id}`, values);
      } else {
        await axios.post("http://localhost:8000/profiles", values);
      }
      setIsModalVisible(false);
      fetchProfiles();
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span>
          <Button type="link" onClick={() => handleEditProfile(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => handleDeleteProfile(record._id)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <h2>Profiles Table</h2>
          <Button type="primary" onClick={handleAddProfile}>
            Add Profile
          </Button>
        </MDBox>
        <Table columns={columns} dataSource={profiles} rowKey="_id" />
      </MDBox>
      <Footer />
      <Modal
        title={editingProfile ? "Edit Profile" : "Add Profile"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => {
          document
            .getElementById("profileForm")
            .dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
        }}
      >
        <Form
          id="profileForm"
          layout="vertical"
          onFinish={handleSaveProfile}
          initialValues={editingProfile || { name: "", status: "active" }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
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
        </Form>
      </Modal>
    </DashboardLayout>
  );
};

export default ProfilesTable;
