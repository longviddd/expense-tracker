import { Modal } from "antd";
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
      ></Modal>
    </DefaultLayout>
  );
}
