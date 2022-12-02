import {
  Form,
  Input,
  message,
  Modal,
  Select,
  Divider,
  Space,
  InputRef,
} from "antd";
import React, { useState } from "react";
import axios from "axios";

function TransactionModal({
  showTransactionModal,
  setShowTransactionModal,
  loadTableData,
}) {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      setLoading(true);
      await axios.post("/api/transactions/add", {
        ...values,
        userId: user._id,
      });
      message.success("Transaction added");
      loadTableData();
      setLoading(false);
      setShowTransactionModal(false);
    } catch (error) {
      message.error("Something went wrong");
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Add Transaction"
      visible={showTransactionModal}
      onCancel={() => setShowTransactionModal(false)}
      footer={false}
    >
      <Form layout="vertical" className="transaction-form" onFinish={onFinish}>
        <Form.Item label="Amount" name="amount">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Type" name="type">
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Select
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="Please enter item"
                    ref={inputRef}
                    value={name}
                    onChange={onNameChange}
                  />
                </Space>
              </>
            )}
          />
        </Form.Item>
        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>
        <Form.Item label="Reference" name="reference">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input type="text" />
        </Form.Item>
        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default TransactionModal;
