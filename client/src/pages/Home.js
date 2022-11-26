import { Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import TransactionModal from "../components/TransactionModal";
import "../resources/transactions.css";

export default function Home() {
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  console.log(showTransactionModal);
  return (
    <DefaultLayout>
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
      <div className="table-analytics"></div>
      {showTransactionModal && (
        <TransactionModal
          showTransactionModal={showTransactionModal}
          setShowTransactionModal={setShowTransactionModal}
        />
      )}
    </DefaultLayout>
  );
}
