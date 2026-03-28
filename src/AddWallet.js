import "./AddWallet.css";
import { useState } from "react";

function AddWallet({ onClose, onAdd }) {
  const [name, setName] = useState("");

  // ✅ ใช้ localhost ให้ตรงกับ backend
  const API = "http://127.0.0.1:8000";

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("กรุณาใส่ชื่อกระเป๋า");
      return;
    }

    try {
      const response = await fetch(`${API}/wallets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          balance: 0,
        }),
      });

      const data = await response.json();

      // ❌ ถ้ามี error จาก backend
      if (!response.ok) {
        alert(data.detail || "เพิ่มไม่สำเร็จ");
        return;
      }

      // ✅ สำเร็จ
      alert("เพิ่มสำเร็จ ✅");

      // อัปเดตหน้า Home
      if (onAdd) onAdd(name);

      setName("");
      onClose();

    } catch (error) {
      console.error("Fetch error:", error);
      alert("เชื่อมต่อ server ไม่ได้ ❌");
    }
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

export default AddWallet;