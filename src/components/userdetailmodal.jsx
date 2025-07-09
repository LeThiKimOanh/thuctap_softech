// src/components/UserDetailModal.js
import React from "react";
import { Modal, Button } from "antd";

const UserDetailModal = ({ visible, onClose, user }) => {
  return (
    <Modal
      title={
        <div className="text-xl font-semibold text-blue-600">
          Thông tin người dùng
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Đóng
        </Button>,
      ]}
    >
      {user ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
          <div>
            <p className="font-medium text-gray-600">ID:</p>
            <p className="text-base">{user.id}</p>
          </div>

          <div>
            <p className="font-medium text-gray-600">Mã học sinh:</p>
            <p className="text-base">{user.code}</p>
          </div>

          <div>
            <p className="font-medium text-gray-600">Họ và tên:</p>
            <p className="text-base">{user.name}</p>
          </div>

          <div>
            <p className="font-medium text-gray-600">Email:</p>
            <p className="text-base">{user.email}</p>
          </div>

          <div>
            <p className="font-medium text-gray-600">Điện thoại:</p>
            <p className="text-base">{user.phone || "Không có"}</p>
          </div>

          <div>
            <p className="font-medium text-gray-600">Cấp:</p>
            <p className="text-base">{user.grade}</p>
          </div>

          <div className="md:col-span-2">
            <p className="font-medium text-gray-600">Ngày tạo:</p>
            <p className="text-base">{user.date}</p>
          </div>
        </div>
      ) : (
        <p className="text-red-500">Không có dữ liệu người dùng</p>
      )}
    </Modal>
  );
};

export default UserDetailModal;
