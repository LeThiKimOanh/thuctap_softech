// src/pages/usermanagement/AddUserForm.jsx
import React from "react";
import { Form, Input, Button, Select, message } from "antd";

const { Option } = Select;

const AddUserForm = ({ onSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: "123456",
          avatar: "https://api.lorem.space/image/face?w=150&h=150",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        message.success("Thêm người dùng thành công!");
        onSuccess(result); // cập nhật danh sách ở cha
        form.resetFields();
      } else {
        throw new Error(result.message || "Lỗi khi thêm người dùng");
      }
    } catch (error) {
      message.error("Thêm thất bại: " + error.message);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item label="Họ và tên" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Email" name="email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Cấp" name="grade" rules={[{ required: true }]}>
        <Select>
          <Option value="Cấp 1">Cấp 1</Option>
          <Option value="Cấp 2">Cấp 2</Option>
          <Option value="Cấp 3">Cấp 3</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Thêm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddUserForm;
