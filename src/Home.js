import "./Home.css";
import tree from "./assets/tree.png";

function Home() {
  return (
    <div className="home-container">

      {/* 🌸 Sidebar */}
      <div className="sidebar">
        <h2>🌸 Money Tree</h2>

        <button className="active">หน้าหลัก</button>
        <button>เพิ่มกระเป๋าตังค์</button>
        <button>ลบกระเป๋าตังค์</button>
        <button>รายการ</button>

        {/* 📜 รายการล่าสุด (ย้ายมาไว้ตรงนี้แล้ว) */}
        <div className="sidebar-recent">
          <h4>รายการล่าสุด</h4>

          <div className="recent-item">
            <span>12/02</span>
            <span>มะพร้าว</span>
            <span className="expense">250</span>
          </div>

          <div className="recent-item">
            <span>11/02</span>
            <span>กินข้าว</span>
            <span className="income">20,000</span>
          </div>

          <div className="recent-item">
            <span>10/02</span>
            <span>กิ๊กก๊อก</span>
            <span className="expense">15,000</span>
          </div>

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
            <img src={tree} alt="tree" />
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
              <h3>+0 บาท</h3>
            </div>

            <div className="card expense">
              <p>รายจ่าย</p>
              <h3>-0 บาท</h3>
            </div>
          </div>

          {/* 🧩 Cards */}
          <div className="cards">
            <div className="item-card">💰 เงินเก็บ<br />0</div>
            <div className="item-card">💳 บัตรเครดิต<br />0</div>
            <div className="item-card">🍜 ค่าอาหาร<br />0</div>
            <div className="item-card">💰 เงินเก็บ<br />0</div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;