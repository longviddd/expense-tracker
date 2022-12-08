import {
  Form,
  Input,
  message,
  Modal,
  Select,
  Divider,
  Space,
  Button,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../resources/modal.css";

function TransactionModal({
  showTransactionModal,
  setShowTransactionModal,
  loadTableData,
  selectedEditItem,
}) {
  if (selectedEditItem !== null) {
    selectedEditItem.date = moment(selectedEditItem.date).format("YYYY-MM-DD");
  }

  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const onNameChange = (event) => {
    setCurrentInput(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    let newArray = [...items];
    newArray.push(currentInput);
    localStorage.setItem("category_items", JSON.stringify(newArray));
    setItems(items.concat(currentInput));

    setCurrentInput("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      setLoading(true);
      if (selectedEditItem !== null) {
        await axios.put("/api/transactions/edit", {
          ...values,
          userId: user._id,
          _id: selectedEditItem._id,
        });
        message.success("Transaction Edited");
      } else {
        await axios.post("/api/transactions/add", {
          ...values,
          userId: user._id,
        });
        message.success("Transaction added");
      }
      loadTableData();
      setLoading(false);
      setShowTransactionModal(false);
    } catch (error) {
      message.error("Something went wrong");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      localStorage.getItem("category_items") === null ||
      localStorage.getItem("category_items").length === 0
    ) {
      const defaultItems = [
        "Salary",
        "Food",
        "Entertainment",
        "Travel",
        "Education",
        "Medical",
        "Tax",
      ];
      setItems(defaultItems);
      localStorage.setItem("category_items", JSON.stringify(defaultItems));
    } else {
      setItems(JSON.parse(localStorage.getItem("category_items")));
    }
  }, []);
  return (
    <Modal
      title={selectedEditItem ? "Edit Transaction" : "Add Transaction"}
      visible={showTransactionModal}
      onCancel={() => setShowTransactionModal(false)}
      footer={false}
    >
      <Form
        initialValues={selectedEditItem}
        layout="vertical"
        className="transaction-form"
        onFinish={onFinish}
      >
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
                <div className="input-space">
                  <Input
                    className="category-input"
                    placeholder="Please enter item"
                    ref={inputRef}
                    value={currentInput}
                    onChange={onNameChange}
                  />
                  <Button
                    type="text"
                    className="add-button"
                    icon={<PlusOutlined />}
                    onClick={addItem}
                  >
                    Add item
                  </Button>
                </div>
              </>
            )}
            options={items.map((item) => ({
              label: item,
              value: item,
            }))}
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
