import "./TransactionPage.css";
import { useState } from "react";

function TransactionPage({ transactions, onBack }) {
  const [filter, setFilter] = useState("all"); 
  // all | income | expense

  const filtered = transactions.filter((t) => {
    if (filter === "all") return true;
    return t.type === filter;
  });

  return (
    <div className="transaction-page">

      {/* 🌸 Header */}
      <div className="tp-header">
        <h2>📋 รายการทั้งหมด</h2>

        <div className="tp-tabs">
          <button
            className={filter === "income" ? "active" : ""}
            onClick={() => setFilter("income")}
          >
            รายรับ
          </button>

          <button
            className={filter === "expense" ? "active" : ""}
            onClick={() => setFilter("expense")}
          >
            รายจ่าย
          </button>

          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            ทั้งหมด
          </button>
        </div>
      </div>

      {/* 💰 Summary */}
      <div className="tp-summary">
        <div className="income">
          +{transactions
            .filter(t => t.type === "income")
            .reduce((s, t) => s + t.amount, 0)} บาท
        </div>

        <div className="expense">
          -{transactions
            .filter(t => t.type === "expense")
            .reduce((s, t) => s + t.amount, 0)} บาท
        </div>
      </div>

      {/* 📊 Table */}
      <div className="tp-table">
        <div className="tp-row header">
          <div>วันที่</div>
          <div>ประเภท</div>
          <div>หมวดหมู่</div>
          <div>หมายเหตุ</div>
          <div>จำนวนเงิน</div>
        </div>

        {filtered.map((t) => (
          <div className="tp-row" key={t.id}>
            <div>{t.date}</div>
            <div>
              {t.type === "income" ? "💰 รายรับ" : "💸 รายจ่าย"}
            </div>
            <div>{t.wallet}</div>
            <div>{t.title}</div>
            <div className={t.type}>
              {t.type === "income" ? "+" : "-"}
              {t.amount}
            </div>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={onBack}>
        ← กลับ
      </button>
    </div>
  );
}

export default TransactionPage;