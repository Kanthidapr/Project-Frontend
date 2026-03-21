import { useState } from "react";
import "./TransactionList.css";

function TransactionList({ transactions, onDeleteTransaction, onEditTransaction, onBack }) {

  const [editID, setEditID] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");

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

              {/* ✏️ EDIT MODE */}
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
                    <button
                      onClick={() => {
                        onEditTransaction({
                          ...tx,
                          title: editTitle,
                          amount: Number(editAmount),
                        });
                        setEditID(null);
                      }}
                    >
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
                        setEditAmount(tx.amount);
                      }}
                    >
                      ✏️
                    </button>

                    <button
                      onClick={() => onDeleteTransaction(tx.id)}
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