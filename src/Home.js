import "./Home.css";
import { useEffect, useState } from "react";

import treeSmall from "./assets/tree-small.png";
import treeMedium from "./assets/tree-medium.png";
import treeBig from "./assets/tree-big.png";

import AddWallet from "./AddWallet";
import DeleteWallet from "./DeleteWallet";
import TransactionList from "./TransactionList";
import WalletDetail from "./WalletDetail";
import ProfileCard from "./ProfileCard"; // ✅ เพิ่ม

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [mode, setMode] = useState("home");
  const [selectedWallet, setSelectedWallet] = useState(null);

  const [showProfile, setShowProfile] = useState(false); // ✅ เพิ่ม

  const user = {
    name: "Kanthida",
    username: "kan_01",
    id: "10234",
    avatar: "https://i.imgur.com/1X5QH6V.png"
  };

  useEffect(() => {
    fetchTransactions();
    fetchWallets();
  }, []);

  // ✅ ปิด popup เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClick = () => setShowProfile(false);
    if (showProfile) {
      window.addEventListener("click", handleClick);
    }
    return () => window.removeEventListener("click", handleClick);
  }, [showProfile]);

  const fetchTransactions = () => {
    fetch("http://127.0.0.1:8000/transactions")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(t => ({
          ...t,
          id: t._id,
          type: t.amount > 0 ? "income" : "expense"
        }));
        setTransactions(formatted);
      });
  };

  const fetchWallets = () => {
    fetch("http://127.0.0.1:8000/wallets")
      .then(res => res.json())
      .then(data => setWallets(data));
  };

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = income - expense;

  let treeImage = treeSmall;
  if (balance > 5000) treeImage = treeBig;
  else if (balance > 1000) treeImage = treeMedium;

  const handleAddWallet = (walletName) => {
    fetch("http://127.0.0.1:8000/wallets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: walletName, balance: 0 }),
    }).then(() => fetchWallets());
  };

  const handleDeleteWallet = () => {
    fetchWallets();
  };

  const handleDeleteTransaction = (id) => {
    fetch(`http://127.0.0.1:8000/transactions/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchTransactions();
      fetchWallets();
    });
  };

  return (
    <div className="home-container">

      <div className="sidebar">
        <h2>🌸 Money Tree</h2>

        <button onClick={() => setMode("home")}>หน้าหลัก</button>
        <button onClick={() => setMode("add")}>เพิ่มกระเป๋า</button>
        <button onClick={() => setMode("delete")}>ลบกระเป๋า</button>
        <button onClick={() => setMode("list")}>รายการ</button>

        <div className="sidebar-recent">
          <h4>รายการล่าสุด</h4>

          {transactions.length === 0 ? (
            <p style={{ opacity: 0.5 }}>ยังไม่มีรายการ</p>
          ) : (
            transactions.slice(-3).reverse().map((t, i) => (
              <div key={i} className="recent-item">
                <div className="recent-left">
                  <div className="recent-date">{t.date}</div>
                  <div className="recent-title">{t.title}</div>
                </div>

                <div className={`recent-amount ${t.type}`}>
                  {t.type === "income" ? "+" : "-"}
                  {Math.abs(t.amount)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {mode === "walletDetail" ? (
        <div className="main full">
          <WalletDetail
            wallet={selectedWallet}
            transactions={transactions}
            onBack={() => setMode("home")}
          />
        </div>
      ) : mode === "list" ? (
        <div className="main full">
          <TransactionList
            transactions={transactions}
            onDeleteTransaction={handleDeleteTransaction}
            onBack={() => setMode("home")}
          />
        </div>
      ) : (
        <div className="main">

          <div className="left-panel">
            <div className="tree-section">
              {mode === "add" ? (
                <AddWallet onAdd={handleAddWallet} onClose={() => setMode("home")} />
              ) : mode === "delete" ? (
                <DeleteWallet wallets={wallets} onDelete={handleDeleteWallet} onClose={() => setMode("home")} />
              ) : (
                <img src={treeImage} alt="tree" />
              )}
            </div>
          </div>

          <div className="right-panel">

            <div className="header">
              <h3>🌸 Money Tree</h3>

              {/* ✅ แก้เฉพาะตรงนี้ */}
              <div className="header-right" style={{ position: "relative" }}>
                🔔
                <span
                  style={{ marginLeft: 10, cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowProfile(!showProfile);
                  }}
                >
                  👤
                </span>

                {showProfile && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <ProfileCard user={user} />
                  </div>
                )}
              </div>
            </div>

            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>

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

            <div className="cards">
              {wallets.length === 0 ? (
                <p style={{ opacity: 0.5 }}>ยังไม่มีกระเป๋า</p>
              ) : (
                wallets.map(w => (
                  <div
                    key={w._id}
                    className="item-card"
                    onClick={() => {
                      setSelectedWallet(w);
                      setMode("walletDetail");
                    }}
                  >
                    💼 {w.name}
                    <br />
                    {w.balance} บาท
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Home;