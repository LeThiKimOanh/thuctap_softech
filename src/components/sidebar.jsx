// src/components/Sidebar.jsx
import React from "react";
import "../styles/menuicon.css";
import { Link, useLocation } from "react-router-dom";

import { Layout, Menu, Divider } from "antd";
import {
  HomeOutlined,
  BellOutlined,
  BookOutlined,
  ToolOutlined,
  ReadOutlined,
  AppstoreOutlined,
  InfoCircleOutlined,
  FolderOpenOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  DatabaseOutlined,
  UserOutlined,
  SettingOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const Sidebar = () => {
  const location = useLocation();
  const selectedKey = location.pathname.split("/admin/")[1] || "home";

  return (
    <Sider width={250} style={{ background: "#fff", minHeight: "100vh" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
          borderBottom: "1px solid #eee",
        }}
      >
        <img
          src="https://sachso-preview.vercel.app/static/media/sachso_logo.ea7f2393.png"
          alt="Logo"
          style={{ width: 100, marginRight: 8 }}
        />
        <MenuOutlined style={{ marginLeft: "auto" }} />
      </div>

      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{ borderRight: 0 }}
      >
        <Menu.Item
          key="home"
          icon={
            <HomeOutlined
              className={`menu-icon ${selectedKey === "home" ? "active" : ""}`}
            />
          }
        >
          <Link to="/admin">Trang chủ</Link>
        </Menu.Item>

        <Menu.Item
          key="noti"
          icon={
            <BellOutlined
              className={`menu-noti ${selectedKey === "noti" ? "active" : ""}`}
            />
          }
        >
          <Link to="/admin/noti">Thông báo</Link>
        </Menu.Item>

        <Menu.Item
          key="offline"
          icon={
            <BookOutlined
              className={`menu-off ${
                selectedKey === "offline" ? "active" : ""
              }`}
            />
          }
        >
          <Link to="/admin/offline">Sách điện tử (offline)</Link>
        </Menu.Item>

        <Menu.Item
          key="tools"
          icon={
            <ToolOutlined
              className={`menu-tool ${selectedKey === "tools" ? "active" : ""}`}
            />
          }
        >
          <Link to="/admin/tools">Công cụ</Link>
        </Menu.Item>

        <Menu.Item
          key="books"
          icon={
            <ReadOutlined
              className={`menu-book ${selectedKey === "books" ? "active" : ""}`}
            />
          }
        >
          <Link to="/admin/books">Sách điện tử</Link>
        </Menu.Item>

        <Menu.Item
          key="class"
          icon={
            <AppstoreOutlined
              className={`menu-class ${
                selectedKey === "class" ? "active" : ""
              }`}
            />
          }
        >
          <Link to="/admin/class">Lớp học</Link>
        </Menu.Item>

        <Menu.Item
          key="game"
          icon={
            <InfoCircleOutlined
              className={`menu-game ${selectedKey === "game" ? "active" : ""}`}
            />
          }
        >
          <Link to="/admin/game">Education Game</Link>
        </Menu.Item>

        <Menu.Item
          key="guide"
          icon={
            <ReadOutlined
              className={`menu-guide ${
                selectedKey === "guide" ? "active" : ""
              }`}
            />
          }
        >
          <Link to="/admin/guide">Hướng dẫn sử dụng</Link>
        </Menu.Item>

        <Divider style={{ margin: "12px 0" }} />
        <div style={{ padding: "0 16px", fontSize: 12, color: "#999" }}>
          ADMINISTRATORS
        </div>

        <Menu.Item
          key="library"
          icon={
            <FolderOpenOutlined
              className={`menu-library ${
                selectedKey === "library" ? "active" : ""
              }`}
            />
          }
        >
          <Link to="/admin/library">Thư viện</Link>
        </Menu.Item>

        <Menu.Item
          key="questions"
          icon={
            <QuestionCircleOutlined
              className={`menu-question ${
                selectedKey === "questions" ? "active" : ""
              }`}
            />
          }
        >
          <Link to="/admin/questions">Quản lý câu hỏi</Link>
        </Menu.Item>

        <Menu.Item
          key="class-mgmt"
          icon={
            <TeamOutlined
              className={`menu-mg ${
                selectedKey === "class-mgmt" ? "active" : ""
              }`}
            />
          }
        >
          <Link to="/admin/class-mgmt">Quản lý lớp học</Link>
        </Menu.Item>

        <Menu.Item
          key="bank"
          icon={
            <DatabaseOutlined
              className={`menu-bank ${selectedKey === "bank" ? "active" : ""}`}
            />
          }
        >
          <Link to="/admin/bank">Ngân hàng đề kiểm tra</Link>
        </Menu.Item>

        <Menu.Item
          key="users"
          icon={
            <UserOutlined
              className={`menu-user ${selectedKey === "users" ? "active" : ""}`}
            />
          }
        >
          <Link to="/admin/users">Quản lý người dùng</Link>
        </Menu.Item>

        <Menu.Item
          key="type"
          icon={
            <SettingOutlined
              className={`menu-type ${selectedKey === "type" ? "active" : ""}`}
            />
          }
        >
          <Link to="/admin/type">Type & OptionType</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
