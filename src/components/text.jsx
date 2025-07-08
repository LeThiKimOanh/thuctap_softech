import React from "react";
import { Row, Col, Typography, Card, List } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const bieudoData = [
  { percent: "5%", text: "Nghe giảng", color: "#0d6efd" },
  { percent: "10%", text: "Đọc sách", color: "#0d8cf0" },
  { percent: "20%", text: "Xem video", color: "#17a2b8" },
  { percent: "30%", text: "Thấy thực tế", color: "#20c997" },
  { percent: "50%", text: "Thảo luận nhóm", color: "#28a745" },
  { percent: "70%", text: "Thực hành", color: "#198754" },
  { percent: "90%", text: "Dạy lại người khác", color: "#0f5132" },
];

const methodList = [
  "Bài học thiết kế hấp dẫn, giúp học sâu theo từng chủ đề.",
  "Tăng khả năng ghi nhớ qua trải nghiệm thực tế và lặp lại.",
  "Kết hợp hình ảnh, âm thanh và cảm xúc trong việc học.",
];

const LearningCard = () => {
  return (
    <div style={{ background: "#f5f8ff", padding: "48px 24px" }}>
      <Row gutter={[32, 32]} justify="center" align="middle">
        <Col xs={24} md={12}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {bieudoData.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: item.color,
                  color: "#fff",
                  width: `${90 - index * 7}%`,
                  padding: "10px 16px",
                  textAlign: "left",
                  borderRadius: 6,
                  marginBottom: 8,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <strong style={{ marginRight: 12 }}>{item.percent}</strong>
                <span>Là mức độ ghi nhớ khi bạn {item.text}</span>
              </div>
            ))}
          </div>
        </Col>

        <Col xs={24} md={12}>
          <Card
            style={{
              background: "#eef2ff",
              borderRadius: 12,
              boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
              padding: 24,
            }}
          >
            <Title level={3} style={{ color: "#3f51b5" }}>
              Phương pháp học hiện đại theo “Tháp học tập”
            </Title>

            <List
              dataSource={methodList}
              renderItem={(item) => (
                <List.Item style={{ border: "none", padding: "6px 0" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CheckCircleOutlined
                      style={{ color: "#4caf50", marginRight: 8, fontSize: 16 }}
                    />
                    <Text>{item}</Text>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LearningCard;
