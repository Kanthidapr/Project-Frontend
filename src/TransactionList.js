import { useState } from "react";
import "./TransactionList.css";

function TransactionList({
  transactions,
  onBack,
  refreshData
}) {
  const [editID, setEditID] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");

  // ❌ ลบ
  const handleDelete = (id) => {
    fetch(`http://192.168.56.1:8000/transactions/${id}`, {
      method: "DELETE",
    })
      .then(() => refreshData())
      .catch(err => console.error("delete error:", err));
  };

  // ✏️ edit
  const handleEdit = (tx) => {
    fetch(`http://192.168.56.1:8000/transactions/${tx.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editTitle,
        amount:
          tx.type === "expense"
            ? -Math.abs(Number(editAmount))
            : Math.abs(Number(editAmount)),
        wallet: tx.wallet
      }),
    })
      .then(() => {
        setEditID(null);
        refreshData();
      })
      .catch(err => console.error("edit error:", err));
  };

  return (
    <div className="tx-container">

      <h2>📋 รายการทั้งหมด</h2>

      <table className="tx-table">
        <thead>
          <tr>
            <th>วันที่</th>
            <th>ประเภท</th>
            <th>หมวดหมู่</th>
            <th>หมายเหตุ</th>
            <th>จำนวนเงิน</th>
            <th>จัดการ</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>

              <td>{tx.date}</td>

              <td>
                {tx.type === "income" ? "💰 รายรับ" : "💸 รายจ่าย"}
              </td>

              <td>{tx.wallet}</td>

              {editID === tx.id ? (
                <>
                  <td>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  </td>

                  <td>
                    <input
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                    />
                  </td>

                  <td>
                    <button onClick={() => handleEdit(tx)}>
                      💾
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{tx.title}</td>

                  <td
                    style={{
                      color: tx.type === "income" ? "green" : "red"
                    }}
                  >
                    {tx.type === "income" ? "+" : "-"}
                    {Math.abs(tx.amount)}
                  </td>

                  <td>
                    <button
                      onClick={() => {
                        setEditID(tx.id);
                        setEditTitle(tx.title);
                        setEditAmount(Math.abs(tx.amount)); // ✅ แก้ตรงนี้
                      }}
                    >
                      ✏️
                    </button>

                    <button
                      onClick={() => handleDelete(tx.id)}
                      style={{ color: "red", marginLeft: 5 }}
                    >
                      🗑
                    </button>
                  </td>
                </>
              )}

            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={onBack}>← กลับ</button>
    </div>
  );
}

export default TransactionList;