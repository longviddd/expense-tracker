import { Progress } from "antd";
import React from "react";
import "../resources/analytics.css";

function Analytics({ dataSource }) {
  const totalTransactions = dataSource.length;
  const totalIncomeTransactions = dataSource.filter(
    (transaction) => transaction.type === "income"
  ).length;
  const totalExpenseTransactions = dataSource.filter(
    (transaction) => transaction.type === "expense"
  ).length;
  const totalIncomeTransactionPercentage =
    (totalIncomeTransactions / totalTransactions) * 100;
  const totalExpenseTransactionPercentage =
    100 - totalIncomeTransactionPercentage;
  console.log(totalIncomeTransactions);
  console.log(totalTransactions);

  return (
    <div>
      <div className="row">
        <div className="col">
          <div className="transactions-count">
            <h4 className="d-flex justify-content-center">
              Total Transactions: {totalTransactions}
            </h4>
            <hr />
            <div className="transactions-headers">
              <h5>Income: {totalIncomeTransactions}</h5>
              <h5>Expense: {totalExpenseTransactions}</h5>
            </div>
            <div className="progress-bars">
              <Progress
                strokeColor="green"
                type="circle"
                percent={totalExpenseTransactionPercentage.toFixed(0)}
              />
              <Progress
                strokeColor="red"
                type="circle"
                percent={totalIncomeTransactionPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
