import { Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import "../resources/transactions.css";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  return (
    <DefaultLayout>
      <div className="filter d-flex justify-content-between align-items-center">
        <div></div>
        <div>
          <button className="primary" onClick={() => setShowModal(true)}>
            ADD NEW
          </button>
        </div>
      </div>
      <div className="table-analytics"></div>
      <Modal
        title="Add Transaction"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout="vertical" className="transaction-form">
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="Category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="freelance">Freelance</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="entertainment">Entertainment</Select.Option>
              <Select.Option value="education">Education</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Amount" name="amount">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button className="primary">SAVE</button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
}
