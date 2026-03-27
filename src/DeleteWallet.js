import "./DeleteWallet.css";
import { useState } from "react";

function DeleteWallet({ wallets, onDelete, onClose }) {
  const [selected, setSelected] = useState("");

  const handleDelete = async () => {
    if (!selected) {
      alert("กรุณาเลือกกระเป๋าที่ต้องการลบ");
      return;
    }

    if (!window.confirm(`คุณแน่ใจใช่ไหมที่จะลบกระเป๋า "${selected}"?`)) return;

    try {
      // ✅ แก้: encode URL กันชื่อภาษาไทยพัง
      const response = await fetch(
        `http://127.0.0.1:8000/wallets/${encodeURIComponent(selected)}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // ✅ ให้ Home refresh ใหม่
        if (onDelete) onDelete(selected);

        alert("ลบกระเป๋าเงินเรียบร้อยแล้ว");
        onClose();
      } else {
        const err = await response.json();
        alert(`ลบไม่ได้: ${err.detail}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <div className="delete-box">
      <h2 className="delete-title">ลบกระเป๋าตังค์</h2>

      <div className="delete-form">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="wallet-select"
        >
          <option value="">-- เลือกกระเป๋า --</option>
          {wallets.map((w, i) => (
            <option key={i} value={w.name}>
              {w.name} (คงเหลือ: {w.balance})
            </option>
          ))}
        </select>

        <div className="delete-buttons">
          <button className="cancel" onClick={onClose}>
            ยกเลิก
          </button>
          <button className="danger-btn" onClick={handleDelete}>
            🗑 ลบกระเป๋า
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteWallet;