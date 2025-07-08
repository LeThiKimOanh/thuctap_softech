import React, { useState } from "react";
import { Layout, Menu, ConfigProvider } from "antd";
import AboutEnglish from "./about";
import LoginFormModal from "../pages/login";

import FeatureCards from "./aboutus";
import LearningCard from "./text";

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: "home",
    label: "Trang chủ",
  },
  {
    key: "phuongnam",
    label: "Phương Nam",
  },
  {
    key: "login",
    label: "Đăng nhập",
  },
  {
    key: "signup",
    label: "Đăng kí học sinh",
  },
];

const App = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const handleMenuClick = (e) => {
    if (e.key === "login") {
      setIsLoginVisible(true);
    }
  };

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgb(230, 236, 241) ",
          boxShadow: "0 4px 8px rgba(121, 114, 114, 0.6)",
          zIndex: 1000,
        }}
      >
        <div className="demo-logo" style={{ fontSize: 20, fontWeight: "bold" }}>
          <img
            src="https://sachso-preview.vercel.app/static/media/sachso_logo.ea7f2393.png"
            alt="Logo"
            style={{ width: 100, height: 100, objectFit: "contain" }}
          />
        </div>

        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemColor: "#007bff",
                itemHoverColor: "#0056b3",
                itemSelectedColor: "#1a73e8",
              },
            },
          }}
        >
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["4"]}
            items={items}
            onClick={handleMenuClick}
            style={{
              flex: 1,
              minWidth: 3,
              background: "rgb(230, 236, 241) ",
              margin: "20px",
              fontSize: 16,
            }}
          />
        </ConfigProvider>
      </Header>

      <Content style={{ padding: "0 " }}>
        <AboutEnglish />
        <FeatureCards />
        <LearningCard />
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED 231 Nguyễn Văn
        Cừ - Phường 4 - Quận 5 - TP.HCM (028) 73 035 556 Thời gian làm việc
        (08:00 - 17:00)
      </Footer>

      <LoginFormModal
        visible={isLoginVisible}
        onClose={() => setIsLoginVisible(false)}
      />
    </Layout>
  );
};
export default App;
