import { useState } from "react";
import "./WalletDetail.css";

function WalletDetail({
  wallet,
  onBack,
  onAddTransaction,
  onDeleteTransaction,
  onEditTransaction,
  transactions
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("income");

  // ✏️ edit state แยกออกมา
  const [editID, setEditID] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editType, setEditType] = useState("income");

  // ✅ เพิ่มรายการ
  const handleAdd = () => {
    if (!title || !amount) return;

    const num = Number(amount);

    const newTx = {
      id: Date.now(),
      title,
      amount: type === "expense" ? -Math.abs(num) : Math.abs(num),
      type,
      wallet: wallet.name,
      date: date || new Date().toLocaleDateString(),
      note: ""
    };

    onAddTransaction(newTx);

    setTitle("");
    setAmount("");
    setDate("");
    setType("income");
  };

  // ✅ filter ตาม wallet
  const walletTx = (transactions || []).filter(
    t => t.wallet === wallet.name
  );

  return (
    <div className="wallet-detail">

      <h2>💼 {wallet.name}</h2>

      {/* 🧾 FORM */}
      <div className="form">

        <input
          placeholder="ชื่อรายการ"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="จำนวนเงิน"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">รายรับ</option>
          <option value="expense">รายจ่าย</option>
        </select>

        <button onClick={handleAdd}>+ เพิ่ม</button>

      </div>

      {/* 📋 รายการ */}
      <div className="tx-list">
        {walletTx.length === 0 ? (
          <p style={{ opacity: 0.5 }}>ยังไม่มีรายการ</p>
        ) : (
          walletTx.map(tx => (
            <div key={tx.id} className="tx-item">

              {editID === tx.id ? (
                <>
                  {/* ✏️ EDIT MODE */}
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />

                  <input
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                  />

                  <select
                    value={editType}
                    onChange={(e) => setEditType(e.target.value)}
                  >
                    <option value="income">รายรับ</option>
                    <option value="expense">รายจ่าย</option>
                  </select>

                  <button
                    onClick={() => {
                      const num = Number(editAmount);

                      onEditTransaction({
                        ...tx,
                        title: editTitle,
                        amount:
                          editType === "expense"
                            ? -Math.abs(num)
                            : Math.abs(num),
                        type: editType,
                      });

                      setEditID(null);
                    }}
                  >
                    💾
                  </button>
                </>
              ) : (
                <>
                  {/* 👁 VIEW MODE */}
                  <div>
                    <div>{tx.title}</div>
                    <div style={{ fontSize: 12 }}>{tx.date}</div>
                  </div>

                  <div className={tx.type}>
                    {tx.type === "income" ? "+" : "-"}
                    {Math.abs(tx.amount)}
                  </div>

                  {/* ✏️ EDIT */}
                  <button
                    onClick={() => {
                      setEditID(tx.id);
                      setEditTitle(tx.title);
                      setEditAmount(Math.abs(tx.amount));
                      setEditType(tx.type);
                    }}
                  >
                    ✏️
                  </button>

                  {/* 🗑 DELETE */}
                  <button
                    onClick={() => onDeleteTransaction(tx.id)}
                  >
                    🗑
                  </button>
                </>
              )}

            </div>
          ))
        )}
      </div>

      <button onClick={onBack}>← กลับ</button>

    </div>
  );
}

export default WalletDetail;