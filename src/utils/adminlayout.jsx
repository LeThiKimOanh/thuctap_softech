import React from "react";
import { Layout, Avatar, Badge, Dropdown } from "antd";
import { BellOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const AdminLayout = () => {
  const userMenuItems = [
    { key: "profile", label: "Thông tin cá nhân" },
    { key: "logout", label: "Đăng xuất" },
  ];

  return (
    <Layout style={{ minHeight: "100vh", position: "relative" }}>
      <Sidebar />

      <Layout className="bg-gradient-to-r from-cyan-100 to-blue-200 text-white relative">
        <div className="bg-cyan-600 h-[100px] px-6 shadow flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-10">
            <h2 className="text-lg font-semibold text-white">
              Quản lý người dùng
            </h2>
            <p className="text-sm text-white">
              <HomeOutlined /> Administration &gt; Quản lý người dùng
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge count={5}>
              <BellOutlined className="text-xl text-gray-100 cursor-pointer hover:text-white" />
            </Badge>

            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar icon={<UserOutlined />} className="bg-blue-500" />
                <span className="text-white">Admin</span>
              </div>
            </Dropdown>
          </div>
        </div>
        <Content
          className="absolute top-20 bottom-0 left-2 right-2 bg-white rounded shadow "
          style={{ zIndex: 20 }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
