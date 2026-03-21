import "./Home.css";
import { useEffect, useState } from "react";

import treeSmall from "./assets/tree-small.png";
import treeMedium from "./assets/tree-medium.png";
import treeBig from "./assets/tree-big.png";

import AddWallet from "./AddWallet";
import DeleteWallet from "./DeleteWallet";
import WalletDetail from "./WalletDetail";
import TransactionList from "./TransactionList";

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [wallets, setWallets] = useState([]);

  const [mode, setMode] = useState("home"); 
  // home | add | delete | detail | list

  const [selectedWallet, setSelectedWallet] = useState(null);

  useEffect(() => {
    setTransactions([]);
  }, []);

  // ✅ คำนวณ
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  // 🌳 tree
  let treeImage = treeSmall;
  if (balance > 5000) treeImage = treeBig;
  else if (balance > 1000) treeImage = treeMedium;

  // ✅ เพิ่ม wallet
  const handleAddWallet = (walletName) => {
    const newWallet = {
      name: walletName,
      balance: 0,
    };
    setWallets(prev => [...prev, newWallet]);
  };

  // ✅ ลบ wallet
  const handleDeleteWallet = (name) => {
    setWallets(prev => prev.filter(w => w.name !== name));
  };

  // 🗑 ลบรายการ
  const handleDeleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // ✏️ แก้รายการ
  const handleEditTransaction = (updatedTx) => {
    setTransactions(prev =>
      prev.map(t => (t.id === updatedTx.id ? updatedTx : t))
    );
  };

  // ✅ เพิ่ม transaction
  const handleAddTransaction = (tx) => {
    setTransactions(prev => [...prev, tx]);

    // อัพเดทยอด wallet
    setWallets(prev =>
      prev.map(w =>
        w.name === tx.wallet
          ? {
              ...w,
              balance:
                tx.type === "income"
                  ? w.balance + Math.abs(tx.amount)
                  : w.balance - Math.abs(tx.amount),
            }
          : w
      )
    );
  };

  return (
    <div className="home-container">

      {/* 🌸 Sidebar */}
      <div className="sidebar">
        <h2>🌸 Money Tree</h2>

        <button onClick={() => setMode("home")}>หน้าหลัก</button>

        <button onClick={() => setMode("add")}>
          เพิ่มกระเป๋าตังค์
        </button>

        <button onClick={() => setMode("delete")}>
          ลบกระเป๋าตังค์
        </button>

        <button onClick={() => setMode("list")}>
          รายการ
        </button>

        {/* 📜 ล่าสุด */}
        <div className="sidebar-recent">
          <h4>รายการล่าสุด</h4>

          {transactions.length === 0 ? (
            <p style={{ opacity: 0.5 }}>ยังไม่มีรายการ</p>
          ) : (
            transactions
              .slice(-3)
              .reverse()
              .map((t, i) => (
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

      {/* 🧩 MAIN */}
      {mode === "list" ? (
        <div className="main full">
          <TransactionList
            transactions={transactions}
            onDeleteTransaction={handleDeleteTransaction}
            onEditTransaction={handleEditTransaction}
            onBack={() => setMode("home")}
          />
        </div>
      ) : (
        <div className="main">

          {/* 🌳 LEFT */}
          <div className="left-panel">
            <div className="tree-section">

              {mode === "add" && (
                <AddWallet
                  onClose={() => setMode("home")}
                  onAdd={handleAddWallet}
                />
              )}

              {mode === "delete" && (
                <DeleteWallet
                  wallets={wallets}
                  onDelete={handleDeleteWallet}
                  onClose={() => setMode("home")}
                />
              )}

              {mode === "detail" && selectedWallet && (
                <WalletDetail
                  wallet={selectedWallet}
                  onBack={() => setMode("home")}
                  onAddTransaction={handleAddTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                  onEditTransaction={handleEditTransaction}
                  transactions={transactions}
                />
              )}

              {mode === "home" && (
                <img src={treeImage} alt="tree" className="grow" />
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
                wallets.map((w, i) => (
                  <div
                    key={i}
                    className="item-card"
                    onClick={() => {
                      setSelectedWallet(w);
                      setMode("detail");
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