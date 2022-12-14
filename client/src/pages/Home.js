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
