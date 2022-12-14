import {
  Form,
  Input,
  message,
  Modal,
  Select,
  Table,
  Tag,
  DatePicker,
  Button,
} from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import TransactionModal from "../components/TransactionModal";
import "../resources/transactions.css";
import moment from "moment";
import Analytics from "../components/Analytics";

export default function Home() {
  const { RangePicker } = DatePicker;
  const [selectedEditItem, setSelectedEditItem] = useState(null);
  const [transactionData, setTransactionData] = useState([]);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [frequency, setFrequency] = useState("7");
  const [selectedRange, setSelectedRange] = useState([]);
  const [type, setType] = useState("all");
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [viewType, setViewType] = useState("table");
  const { Option } = Select;
  const deleteTransaction = async (_id) => {
    try {
      setIsLoading(true);
      await axios.delete("/api/transactions/delete", { data: { _id: _id } });
      setIsLoading(false);
      loadTableData();
    } catch (error) {
      setIsLoading(false);
      message.error(error);
    }
  };
  const loadTableData = async (values) => {
    try {
      const response = await axios.get("/api/transactions/all", {
        params: {
          userId: user._id,
          frequency: frequency,
          ...(frequency === "custom" && { selectedRange }),
          type: type,
        },
      });
      setIsLoading(false);
      setTransactionData(response.data);
    } catch (error) {
      message.error("Something went wrong");
    }
  };
  useEffect(() => {
    loadTableData();
  }, [frequency, selectedRange, type]);
  const columns = [
    {
      title: "Date",
      dataIndex: "date",

      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div>
            <EditOutlined
              className="action-icons"
              onClick={() => {
                setSelectedEditItem(record);
                setShowTransactionModal(true);
              }}
            />
            <DeleteOutlined
              className="action-icons"
              onClick={() => {
                deleteTransaction(record._id);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <DefaultLayout>
      {isLoading && <Spinner />}
      <div className="toolbar d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-left align-items-center filter">
          <div className="d-flex flex-column filter-items">
            <h6>Date</h6>
            <Select
              className="selects"
              value={frequency}
              onChange={(value) => setFrequency(value)}
              defaultValue="7"
            >
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 year</Select.Option>
              <Select.Option value="all">All time</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === "custom" && (
              <div className="mt-2">
                <RangePicker
                  value={selectedRange}
                  onChange={(value) => setSelectedRange(value)}
                />
              </div>
            )}
          </div>
          <div className="d-flex flex-column filter-items">
            <h6>Type</h6>
            <Select
              className="selects"
              value={type}
              onChange={(value) => setType(value)}
              key={type}
              options={[
                {
                  value: "all",
                  label: "All",
                },
                {
                  value: "expense",
                  label: "Expense",
                },
                {
                  value: "income",
                  label: "Income",
                },
              ]}
            ></Select>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <UnorderedListOutlined
            onClick={() => setViewType("table")}
            className={`analytic-icons ${
              viewType === "table" ? "active-icon" : "inactive-icon"
            }`}
          />

          <AreaChartOutlined
            onClick={() => setViewType("analytics")}
            className={`analytic-icons ${
              viewType === "analytics" ? "active-icon" : "inactive-icon"
            }`}
          />
          <PlusOutlined
            className="analytic-icons plus"
            onClick={() => {
              setShowTransactionModal(true);
              setSelectedEditItem(null);
            }}
          >
            ADD
          </PlusOutlined>
        </div>
      </div>
      <div className="table-analytics">
        {viewType === "table" && (
          <div className="table">
            <Table columns={columns} dataSource={transactionData} />
          </div>
        )}
        {viewType === "analytics" && <Analytics dataSource={transactionData} />}
      </div>
      {showTransactionModal && (
        <TransactionModal
          showTransactionModal={showTransactionModal}
          setShowTransactionModal={setShowTransactionModal}
          loadTableData={loadTableData}
          selectedEditItem={selectedEditItem}
        />
      )}
    </DefaultLayout>
  );
}
