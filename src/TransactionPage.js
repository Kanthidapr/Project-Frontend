import "./TransactionPage.css";
import { useState, useEffect } from "react";

function TransactionPage({ onBack }) {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    fetch("http://127.0.0.1:8000/transactions")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((t) => ({
          ...t,
          id: t._id,
          type: t.amount > 0 ? "income" : "expense",
        }));
        setTransactions(formatted);
      })
      .catch((err) => console.error("Error:", err));
  };

  // ❌ ลบ transaction
  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/transactions/${id}`, {
      method: "DELETE",
    }).then(() => fetchTransactions());
  };

  // 🔍 filter
  const filtered = transactions.filter((t) => {
    if (filter === "all") return true;
    return t.type === filter;
  });

  return (
    <div className="transaction-page">
      <h2>📋 รายการทั้งหมด</h2>

      {/* 🔘 Filter */}
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>ทั้งหมด</button>
        <button onClick={() => setFilter("income")}>รายรับ</button>
        <button onClick={() => setFilter("expense")}>รายจ่าย</button>
      </div>

      {/* 📄 LIST */}
      <div className="transaction-list">
        {filtered.length > 0 ? (
          filtered.map((t) => (
            <div
              key={t.id}
              className={`item ${t.type === "income" ? "plus" : "minus"}`}
            >
              <span>{t.date}</span>

              <strong>{t.title}</strong>

              <span>({t.wallet})</span>

              <b style={{ color: t.type === "income" ? "green" : "red" }}>
                {t.type === "income" ? "+" : "-"}
                {Math.abs(t.amount)} บาท
              </b>

              {/* 🗑 ปุ่มลบ */}
              <button
                onClick={() => handleDelete(t.id)}
                style={{ marginLeft: 10, color: "red" }}
              >
                🗑
              </button>
            </div>
          ))
        ) : (
          <p>ไม่มีข้อมูลรายการ</p>
        )}
      </div>

      <hr />
      <button onClick={onBack} className="back-btn">
        กลับหน้าหลัก
      </button>
    </div>
  );
}

export default TransactionPage;