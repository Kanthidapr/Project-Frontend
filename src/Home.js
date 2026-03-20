import "./Home.css";
import { useEffect, useState } from "react";
import treeSmall from "./assets/tree-small.png";
import treeMedium from "./assets/tree-medium.png";
import treeBig from "./assets/tree-big.png";
import AddWallet from "./AddWallet";

function Home() {
  // 🔥 state
  const [transactions, setTransactions] = useState([]); // ยังใช้แค่ sidebar
  const [wallets, setWallets] = useState([]); // ⭐ ใช้แสดงการ์ด
  const [showModal, setShowModal] = useState(false);

  // 🔥 fetch data (ไว้ใช้ sidebar + คำนวณต้นไม้)
  const fetchData = () => {
    fetch("http://127.0.0.1:8000/transactions")
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 คำนวณรายรับ/รายจ่าย (เอาไว้ใช้ต้นไม้)
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  // 🌳 เลือกต้นไม้
  let treeImage = treeSmall;

  if (balance > 5000) {
    treeImage = treeBig;
  } else if (balance > 1000) {
    treeImage = treeMedium;
  }

  // 🔥 เพิ่ม wallet
  const handleAddWallet = (walletName) => {
    const newWallet = {
      name: walletName,
      balance: 0,
    };

    setWallets(prev => [...prev, newWallet]);
  };

  return (
    <div className="home-container">

      {/* 🌸 Sidebar */}
      <div className="sidebar">
        <h2>🌸 Money Tree</h2>

        <button className="active">หน้าหลัก</button>

        <button onClick={() => setShowModal(true)}>
          เพิ่มกระเป๋าตังค์
        </button>

        <button>ลบกระเป๋าตังค์</button>
        <button>รายการ</button>

        {/* 📜 รายการล่าสุด */}
        <div className="sidebar-recent">
          <h4>รายการล่าสุด</h4>

          {transactions.slice(0, 3).map((t, i) => (
            <div key={i} className="recent-item">
              <span>{t.date || "-"}</span>
              <span>{t.title}</span>
              <span className={t.type === "income" ? "income" : "expense"}>
                {t.amount}
              </span>
            </div>
          ))}

          <div className="view-all">
            ดูรายการ &gt;
          </div>
        </div>
      </div>

      {/* 🧩 Main */}
      <div className="main">

        {/* 🌳 LEFT */}
        <div className="left-panel">
          <div className="tree-section">
            <img src={treeImage} alt="tree" className="grow" />
          </div>
        </div>

        {/* 📊 RIGHT */}
        <div className="right-panel">

          {/* 🔝 Header */}
          <div className="header">
            <h3>🌸 Money Tree</h3>

            <div className="header-right">
              🔔
              👤
            </div>
          </div>

          {/* 🌱 Progress */}
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>

          {/* 💰 Summary */}
          <div className="summary">
            <div className="card income">
              <p>รายรับ</p>
              <h3>+{income} บาท</h3>
            </div>

            <div className="card expense">
              <p>รายจ่าย</p>
              <h3>-{expense} บาท</h3>
            </div>
          </div>

          {/* 🧩 Wallet Cards เท่านั้น */}
          <div className="cards">
            {wallets.length === 0 ? (
              <p style={{ opacity: 0.5 }}>ยังไม่มีกระเป๋า</p>
            ) : (
              wallets.map((w, i) => (
                <div key={i} className="item-card">
                  💼 {w.name}
                  <br />
                  {w.balance} บาท
                </div>
              ))
            )}
          </div>

        </div>
      </div>

      {/* 🔥 Modal */}
      {showModal && (
        <AddWallet
          onClose={() => setShowModal(false)}
          onAdd={handleAddWallet}
        />
      )}

    </div>
  );
}

export default Home;