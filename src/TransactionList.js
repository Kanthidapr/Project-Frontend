import { useState } from "react";
import "./TransactionList.css";

function TransactionList({ transactions, onBack, refreshData }) {
  const [editID, setEditID] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");

  const API = "http://127.0.0.1:8000"; // ✅ แก้ IP

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/transactions/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "ลบไม่สำเร็จ");
        return;
      }

      alert("ลบสำเร็จ ✅");
      refreshData();

    } catch (err) {
      console.error(err);
      alert("เชื่อมต่อ server ไม่ได้");
    }
  };

  // ✅ EDIT
  const handleEdit = async (tx) => {
    try {
      const res = await fetch(`${API}/transactions/${tx._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          amount: Math.abs(Number(editAmount)), // ให้ backend จัด + -
          wallet: tx.wallet,
          type: tx.type, // ✅ สำคัญ
          date: tx.date
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "แก้ไขไม่สำเร็จ");
        return;
      }

      alert("บันทึกสำเร็จ ✅");
      setEditID(null);
      refreshData();

    } catch (err) {
      console.error(err);
      alert("เชื่อมต่อ server ไม่ได้");
    }
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
            <tr key={tx._id}> {/* ✅ ใช้ _id */}

              <td>{tx.date}</td>

              <td>
                {tx.type === "income" ? "💰 รายรับ" : "💸 รายจ่าย"}
              </td>

              <td>{tx.wallet}</td>

              {editID === tx._id ? (
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
                        setEditID(tx._id); // ✅
                        setEditTitle(tx.title);
                        setEditAmount(Math.abs(tx.amount));
                      }}
                    >
                      ✏️
                    </button>

                    <button
                      onClick={() => handleDelete(tx._id)} // ✅
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