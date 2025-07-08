import React from "react";
import { Row, Col, Typography, Image } from "antd";

const { Title, Paragraph } = Typography;

const AboutEnglish = () => {
  return (
    <div style={{ background: "#f5f8ff", padding: "48px 24px" }}>
      <Row gutter={[32, 32]} align="middle" justify="center">
        <Col xs={24} md={10} style={{ textAlign: "center" }}>
          <Image
            src="https://sachso-preview.vercel.app/static/media/Banner.9161fe34.png"
            alt="Family"
            preview={false}
            style={{ maxWidth: "100%", borderRadius: 8 }}
          />
        </Col>

        <Col xs={24} md={12}>
          <Title
            level={2}
            style={{
              color: "#007bff",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            SÁCH GIÁO KHOA TIẾNG ANH
          </Title>
          <Paragraph
            style={{
              maxWidth: "800px",
              margin: "auto",
              fontSize: "16px",
              lineHeight: 1.8,
              color: "#333",
            }}
          >
            Áp dụng phương pháp học tập khoa học mới hệ thống học trực tuyến
            thông minh, ứng dụng công nghệ 4.0 với trí tuệ nhân tạo. Việc áp
            dụng phương pháp mới này không những mang lại hiệu quả cao, tiết
            kiệm thời gian mà còn mang đến tính sáng tạo, tư duy độc lập, sự tìm
            tòi, nghiên cứu của học sinh.
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
};

export default AboutEnglish;
