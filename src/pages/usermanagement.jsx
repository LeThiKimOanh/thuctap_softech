import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Input,
  Select,
  Button,
  Space,
  Tooltip,
  Modal,
  message,
  Form,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  KeyOutlined,
  PhoneOutlined,
  CalendarOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import AddUserForm from "./addformuser";
import UserDetailModal from "../components/userdetailmodal";

const { Option } = Select;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const [form] = Form.useForm();

  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchGrade, setSearchGrade] = useState("Tất cả");
  const fetchUsers = async () => {
    const res = await fetch("https://api.escuelajs.co/api/v1/users");
    const data = await res.json();

    const randomGrades = ["Cấp 1", "Cấp 2", "Cấp 3"];

    const modifiedData = data.map((user, index) => {
      const hasPhone = Math.random() < 0.5;
      const phone = hasPhone
        ? "09" + Math.floor(100000000 + Math.random() * 900000000)
        : "";

      return {
        key: user.id || index,
        id: user.id,
        code: "HS" + Math.floor(1000 + Math.random() * 9000),
        name: user.name || "Không tên",
        email: user.email || "",
        type: "Học sinh",
        grade: randomGrades[Math.floor(Math.random() * randomGrades.length)],
        phone: phone,
        date: user.creationAt
          ? new Date(user.creationAt).toLocaleString("vi-VN")
          : "",
      };
    });

    setUsers(modifiedData);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserAdded = (newUser) => {
    const newFormattedUser = {
      key: newUser.id,
      id: newUser.id,
      code: "HS" + Math.floor(1000 + Math.random() * 9000),
      name: newUser.name,
      email: newUser.email,
      type: "Học sinh",
      grade: "Cấp 2",
      phone: "09" + Math.floor(100000000 + Math.random() * 900000000),
      date: new Date(newUser.creationAt).toLocaleString("vi-VN"),
    };

    setUsers((prev) => [...prev, newFormattedUser]);
    setIsModalVisible(false);
    message.success("Thêm người dùng thành công!");
  };

  const handleUpdateUser = () => {
    form.validateFields().then((values) => {
      const updatedUser = { ...editingUser, ...values };
      fetch(`https://api.escuelajs.co/api/v1/users/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers((prev) =>
            prev.map((u) =>
              u.id === data.id
                ? {
                    ...u,
                    ...data,
                    grade: u.grade,
                    phone: u.phone,
                    date: u.date,
                    type: "Học sinh",
                  }
                : u
            )
          );
          setIsEditModalVisible(false);
          message.success("Cập nhật người dùng thành công!");
        })
        .catch((error) => {
          console.error("Lỗi khi cập nhật người dùng:", error);
        });
    });
  };

  const handleDeleteUser = (id) => {
    fetch(`https://api.escuelajs.co/api/v1/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setUsers((prev) => prev.filter((user) => user.id !== id));
          message.success("Xóa người dùng thành công!");
        } else {
          throw new Error("Xóa thất bại");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi xóa người dùng:", error);
        message.error("Xóa người dùng thất bại!");
      });
  };

  const filteredUsers = users.filter((user) => {
    const matchEmail = user.email
      .toLowerCase()
      .includes(searchEmail.toLowerCase());
    const matchPhone = user.phone.includes(searchPhone);
    const matchGrade = searchGrade === "Tất cả" || user.grade === searchGrade;

    return matchEmail && matchPhone && matchGrade;
  });

  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      try {
        let successCount = 0;

        for (const row of jsonData) {
          const newUser = {
            name: row.name || "Không tên",
            email:
              row.email || `user${Math.floor(Math.random() * 10000)}@mail.com`,
            password: "123456",
            avatar: "https://api.lorem.space/image/face?w=150&h=150",
          };

          const response = await fetch(
            "https://api.escuelajs.co/api/v1/users/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newUser),
            }
          );

          if (response.ok) {
            successCount++;
          } else {
            const error = await response.json();
            console.warn("Lỗi khi tạo user:", error.message || error);
          }
        }

        message.success(` Đã tạo ${successCount} người dùng từ Excel.`);
        await fetchUsers();
      } catch (err) {
        console.error("Lỗi import:", err);
        message.error("Lỗi khi xử lý file Excel.");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 60,
      ellipsis: true,
    },
    {
      title: "Mã học sinh",
      dataIndex: "code",
      key: "code",
      render: (text) => <Tag color="purple">{text}</Tag>,
      width: 120,
      ellipsis: true,
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Loại tài khoản",
      dataIndex: "type",
      key: "type",
      render: () => <Tag color="blue">Học sinh</Tag>,
      width: 130,
      ellipsis: true,
    },
    {
      title: "Cấp",
      dataIndex: "grade",
      key: "grade",
      render: (text) => {
        const color =
          text === "Cấp 3" ? "red" : text === "Cấp 2" ? "gold" : "blue";
        return <Tag color={color}>{text}</Tag>;
      },
      width: 100,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 180,
      ellipsis: true,
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (text) =>
        text ? (
          <span>
            <PhoneOutlined /> {text}
          </span>
        ) : null,
      width: 140,
      ellipsis: true,
    },
    {
      title: "Ngày tạo",
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <span>
          <CalendarOutlined style={{ marginRight: 5 }} />
          {text}
        </span>
      ),
      width: 160,
      ellipsis: true,
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space>
          <Tooltip title="Sửa">
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setEditingUser(record);
                form.setFieldsValue(record);
                setIsEditModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<KeyOutlined />}
              onClick={() => {
                setSelectedUser(record);
                setIsDetailModalVisible(true);
              }}
            />
          </Tooltip>

          <Tooltip title="Xóa">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteUser(record.id)}
            />
          </Tooltip>
        </Space>
      ),
      width: 140,
    },
  ];

  return (
    <div style={{ height: "100%", background: "#fff" }}>
      <style>
        {`
          .ant-table th {
            white-space: nowrap;
          }
        `}
      </style>

      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#fff",
          padding: 10,
          borderBottom: "1px solid #eee",
        }}
      >
        <h2 style={{ marginBottom: 20 }}>Quản lý người dùng</h2>

        <Space style={{ marginBottom: 0 }} wrap>
          <Select defaultValue="Học sinh" style={{ width: 150 }} disabled>
            <Option value="Học sinh">Học sinh</Option>
          </Select>

          <Select
            defaultValue="Tất cả"
            style={{ width: 150 }}
            onChange={(value) => setSearchGrade(value)}
          >
            <Option value="Tất cả">Tất cả</Option>
            <Option value="Cấp 1">Cấp 1</Option>
            <Option value="Cấp 2">Cấp 2</Option>
            <Option value="Cấp 3">Cấp 3</Option>
          </Select>

          <Input
            placeholder="Email"
            style={{ width: 200 }}
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
          <Input
            placeholder="Điện thoại"
            style={{ width: 200 }}
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
          />
          <Button type="primary">Tìm kiếm</Button>

          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setIsModalVisible(true)}
          >
            Thêm người dùng
          </Button>

          <Button
            icon={<UploadOutlined />}
            onClick={() => document.getElementById("excelInput").click()}
          >
            Nhập từ Excel
          </Button>
          <input
            type="file"
            accept=".xlsx, .xls, .csv"
            id="excelInput"
            hidden
            onChange={handleExcelUpload}
          />
        </Space>
      </div>

      <div
        style={{
          maxHeight: "calc(100vh - 230px)",
          overflow: "auto",
          padding: 20,
        }}
      >
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          bordered
        />
      </div>
      <UserDetailModal
        visible={isDetailModalVisible}
        onClose={() => setIsDetailModalVisible(false)}
        user={selectedUser}
      />

      <Modal
        title="Thêm người dùng"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <AddUserForm onSuccess={handleUserAdded} />
      </Modal>

      <Modal
        title="Chỉnh sửa người dùng"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={handleUpdateUser}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Họ và tên" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Điện thoại" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Cấp" name="grade">
            <Select>
              <Option value="Cấp 1">Cấp 1</Option>
              <Option value="Cấp 2">Cấp 2</Option>
              <Option value="Cấp 3">Cấp 3</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
