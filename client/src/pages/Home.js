import { Form, Input, message, Modal, Select, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import TransactionModal from "../components/TransactionModal";
import "../resources/transactions.css";

export default function Home() {
  const [transactionData, setTransactionData] = useState([]);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const loadTableData = async (values) => {
    try {
      const response = await axios.get("/api/transactions/all", {
        params: { userId: user._id },
      });
      console.log(typeof user._id);
      setIsLoading(false);
      setTransactionData(response.data);
      console.log(transactionData);
    } catch (error) {
      message.error("Something went wrong");
    }
  };
  useEffect(() => {
    loadTableData();
  }, []);
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
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
        <div></div>
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
