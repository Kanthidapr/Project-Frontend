import "./Home.css";
import { useEffect, useState } from "react";

import treeSmall from "./assets/tree-small.png";
import treeMedium from "./assets/tree-medium.png";
import treeBig from "./assets/tree-big.png";

import AddWallet from "./AddWallet";
import DeleteWallet from "./DeleteWallet";
import TransactionList from "./TransactionList";
import WalletDetail from "./WalletDetail";

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [mode, setMode] = useState("home");
  const [selectedWallet, setSelectedWallet] = useState(null);

  // โหลดข้อมูล
  useEffect(() => {
    fetchTransactions();
    fetchWallets();
  }, []);

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

  // คำนวณ
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = income - expense;

  // 🌳 รูปเดิม (ไม่แตะ)
  let treeImage = treeSmall;
  if (balance > 5000) treeImage = treeBig;
  else if (balance > 1000) treeImage = treeMedium;

  // เพิ่ม wallet
  const handleAddWallet = (walletName) => {
    fetch("http://127.0.0.1:8000/wallets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: walletName, balance: 0 }),
    }).then(() => fetchWallets());
  };

  // ลบ wallet
  const handleDeleteWallet = (name) => {
    fetch(`http://127.0.0.1:8000/wallets/${name}`, {
      method: "DELETE",
    }).then(() => fetchWallets());
  };

  // ลบ transaction
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

      {/* 🌸 Sidebar */}
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

      {/* MAIN */}
      {mode === "walletDetail" ? (
        <div className="main full">
          <WalletDetail
            wallet={selectedWallet}
            transactions={transactions}

            onBack={() => setMode("home")}

            onAddTransaction={(tx) => {
              fetch("http://127.0.0.1:8000/transactions", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(tx),
              }).then(() => {
                fetchTransactions();
                fetchWallets();
              });
            }}

            onDeleteTransaction={(id) => {
              fetch(`http://127.0.0.1:8000/transactions/${id}`, {
                method: "DELETE",
              }).then(() => {
                fetchTransactions();
                fetchWallets();
              });
            }}

            onEditTransaction={(tx) => {
              fetch(`http://127.0.0.1:8000/transactions/${tx.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(tx),
              }).then(() => {
                fetchTransactions();
                fetchWallets();
              });
            }}
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

          {/* 🌳 LEFT (เหมือนเดิม 100%) */}
          <div className="left-panel">
            <div className="tree-section">

              {mode === "add" ? (
                <AddWallet
                  onAdd={handleAddWallet}
                  onClose={() => setMode("home")}
                />
              ) : mode === "delete" ? (
                <DeleteWallet
                  wallets={wallets}
                  onDelete={handleDeleteWallet}
                  onClose={() => setMode("home")}
                />
              ) : (
                <img src={treeImage} alt="tree" />
              )}

            </div>
          </div>

          {/* 📊 RIGHT */}
          <div className="right-panel">

            <div className="header">
              <h3>🌸 Money Tree</h3>
              <div className="header-right">🔔 👤</div>
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

            {/* 💼 Wallet */}
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