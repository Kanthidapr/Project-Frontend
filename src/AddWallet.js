import "./AddWallet.css";
import { useState } from "react";

function AddWallet({ onClose, onAdd }) {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    if (!name) return;

    try {
      // 🚀 1. ส่งข้อมูลไปที่ Backend
      const response = await fetch("http://127.0.0.1:8000/wallets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          balance: 0, // เริ่มต้นที่ 0 บาท
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        
        // 🚀 2. เรียกฟังก์ชัน onAdd เพื่ออัปเดต UI ในหน้าหลัก (ถ้ามี)
        if (onAdd) onAdd(name); 

        setName("");
        onClose(); // ปิดหน้าต่าง Popup
      } else {
        const errorData = await response.json();
        alert(`เกิดข้อผิดพลาด: ${errorData.detail}`);
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
      alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <div className="wallet-box">
      <h2 className="wallet-title">เพิ่มกระเป๋าตังค์</h2>

      <div className="wallet-form">
        <input
          type="text"
          placeholder="ชื่อกระเป๋า (เช่น เงินสด, กสิกร)"
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