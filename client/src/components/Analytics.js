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
    (totalExpenseTransactions / totalTransactions) * 100;
  const allIncomeTransactions = dataSource.filter(
    (transaction) => transaction.type === "income"
  );
  const allExpenseTransactions = dataSource.filter(
    (transaction) => transaction.type === "expense"
  );

  let totalIncomeTurnover = 0;
  let totalExpenseTurnover = 0;
  for (let i = 0; i < allIncomeTransactions.length; i++) {
    totalIncomeTurnover += allIncomeTransactions[i].amount;
  }
  for (let i = 0; i < allExpenseTransactions.length; i++) {
    totalExpenseTurnover += allExpenseTransactions[i].amount;
  }
  const totalTurnover = totalExpenseTurnover + totalIncomeTurnover;
  const totalIncomeTurnoverPercentage =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercentage =
    (totalExpenseTurnover / totalTurnover) * 100;
  const totalNetProfit = totalIncomeTurnover - totalExpenseTurnover;

  return (
    <div>
      <div className="row">
        <div className="col">
          <div className="transactions-analytics">
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
                percent={totalIncomeTransactionPercentage.toFixed(0)}
              />
              <Progress
                strokeColor="red"
                type="circle"
                percent={totalExpenseTransactionPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="transactions-analytics">
            <h4 className="d-flex justify-content-center">
              Total Net Profit: {totalNetProfit}
            </h4>
            <hr />
            <div className="transactions-headers">
              <h5>Income: {totalIncomeTurnover}</h5>
              <h5>Expense: {totalExpenseTurnover}</h5>
            </div>
            <div className="progress-bars">
              <Progress
                strokeColor="green"
                type="circle"
                percent={totalIncomeTurnoverPercentage.toFixed(0)}
              />
              <Progress
                strokeColor="red"
                type="circle"
                percent={totalExpenseTurnoverPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
