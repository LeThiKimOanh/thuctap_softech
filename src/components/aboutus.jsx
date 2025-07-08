import React from "react";
import { Row, Col, Card, Typography, Button } from "antd";
import {
  RobotOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const features = [
  {
    icon: <RobotOutlined style={{ fontSize: 32, color: "#fff" }} />,
    color: "#007bff",
    title: "CHẤM ĐIỂM AI TỰ ĐỘNG",
    description:
      "Việc tích hợp hệ thống AI chấm điểm giúp hạn chế việc lấy đi một khoảng thời gian đáng kể trong khi thời gian đó có thể được sử dụng để trao đổi với học sinh...",
    buttons: ["CÁC BÀI TRẮC NGHIỆM", "LUYỆN TẬP VỚI AI"],
  },
  {
    icon: <TeamOutlined style={{ fontSize: 32, color: "#fff" }} />,
    color: "#ffa500",
    title: "GIÁO VIÊN QUẢN LÝ HỌC SINH",
    description:
      "Xây dựng hệ thống quản lý lớp học từ xa. Là nơi giáo viên có thể chủ động theo dõi việc học và làm bài của học sinh...",
    buttons: ["QUẢN LÝ LỚP", "ĐÁNH GIÁ KẾT QUẢ HỌC TẬP"],
  },
  {
    icon: <UsergroupAddOutlined style={{ fontSize: 32, color: "#fff" }} />,
    color: "#6c63ff",
    title: "PHỤ HUYNH THEO DÕI HỌC SINH",
    description:
      "Nhu cầu theo dõi việc học tập của con cái đối với phụ huynh là một nhu cầu hàng đầu. Hệ thống được xây dựng với mục đích đáp ứng nhu cầu đó...",
    buttons: ["THEO DÕI KẾT QUẢ HỌC TẬP"],
  },
];

const FeatureCards = () => {
  return (
    <div style={{ background: "#f5f8ff", padding: "48px 24px" }}>
      <Title
        level={2}
        style={{ textAlign: "center", color: "#007bff", fontWeight: "bold" }}
      >
        TÍNH NĂNG NỔI BẬT
      </Title>

      <Row gutter={[24, 24]} justify="center">
        {features.map((feature, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card
              bordered={false}
              style={{
                borderRadius: 12,
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  background: feature.color,
                  borderRadius: "50%",
                  width: 80,
                  height: 80,
                  margin: "auto",
                  marginBottom: 16,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {feature.icon}
              </div>
              <Title
                level={5}
                style={{ color: feature.color, fontWeight: "bold" }}
              >
                {feature.title}
              </Title>
              <Paragraph style={{ minHeight: 120 }}>
                {feature.description}
              </Paragraph>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {feature.buttons.map((btn, i) => (
                  <Button
                    key={i}
                    type="primary"
                    style={{
                      background: feature.color,
                      borderColor: feature.color,
                    }}
                  >
                    {btn}
                  </Button>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeatureCards;
