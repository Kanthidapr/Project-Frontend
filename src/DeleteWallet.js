import "./DeleteWallet.css";
import { useState } from "react";

function DeleteWallet({ wallets, onDelete, onClose }) {
  const [selected, setSelected] = useState("");

  const handleDelete = () => {
    if (!selected) return;
    onDelete(selected);
    onClose();
  };

  return (
    <div className="delete-box">

      <h2>ลบกระเป๋าตังค์</h2>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">-- เลือกกระเป๋า --</option>

        {wallets.map((w, i) => (
          <option key={i} value={w.name}>
            {w.name}
          </option>
        ))}
      </select>

      <div className="delete-buttons">
        <button onClick={onClose}>ยกเลิก</button>
        <button className="danger" onClick={handleDelete}>
          🗑 ลบ
        </button>
      </div>

    </div>
  );
}

export default DeleteWallet;