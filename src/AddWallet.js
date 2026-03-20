import "./AddWallet.css";
import { useState } from "react";

function AddWallet({ onClose, onAdd }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name) return;

    onAdd(name); // ✅ ส่งชื่อกลับไป Home
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>เพิ่มกระเป๋าตังค์</h2>

        <input
          type="text"
          placeholder="ชื่อกระเป๋า"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="modal-buttons">
          <button onClick={onClose}>ยกเลิก</button>
          <button onClick={handleSubmit}>+ เพิ่ม</button>
        </div>

      </div>
    </div>
  );
}

export default AddWallet;