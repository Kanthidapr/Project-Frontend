import "./AddWallet.css";
import { useState } from "react";

function AddWallet({ onClose, onAdd }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name) return;
    onAdd(name);
    setName("");
    onClose();
  };

  return (
    <div className="wallet-box">
      <h2 className="wallet-title">เพิ่มกระเป๋าตังค์</h2>

      <div className="wallet-form">
        <input
          type="text"
          placeholder="ชื่อกระเป๋า"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="wallet-buttons">
          <button className="cancel" onClick={onClose}>
            ยกเลิก
          </button>

          <button className="confirm" onClick={handleSubmit}>
            + เพิ่ม
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddWallet; // ⭐ ต้องมีบรรทัดนี้