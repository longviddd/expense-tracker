import {
  Form,
  Input,
  message,
  Modal,
  Select,
  Table,
  Tag,
  DatePicker,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import TransactionModal from "../components/TransactionModal";
import "../resources/transactions.css";
import moment from "moment";

export default function Home() {
  const { RangePicker } = DatePicker;
  const [transactionData, setTransactionData] = useState([]);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [frequency, setFrequency] = useState("");
  const [selectedRange, setSelectedRange] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const loadTableData = async (values) => {
    try {
      const response = await axios.get("/api/transactions/all", {
        params: {
          userId: user._id,
          frequency: frequency,
          ...(frequency === "custom" && { selectedRange }),
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
  }, [frequency, selectedRange]);
  console.log(frequency);
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
      title: "category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
  ];
  return (
    <DefaultLayout>
      {isLoading && <Spinner />}
      <div className="filter d-flex justify-content-between align-items-center">
        <div>
          <div className="d-flex flex-column">
            <h6>Date Filter</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 year</Select.Option>
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
        </div>
        <div>
          <button
            className="primary"
            onClick={() => setShowTransactionModal(true)}
          >
            ADD NEW
          </button>
        </div>
      </div>
      <div className="table-analytics">
        <div className="table">
          <Table columns={columns} dataSource={transactionData} />
        </div>
      </div>
      {showTransactionModal && (
        <TransactionModal
          showTransactionModal={showTransactionModal}
          setShowTransactionModal={setShowTransactionModal}
          loadTableData={loadTableData}
        />
      )}
    </DefaultLayout>
  );
}
