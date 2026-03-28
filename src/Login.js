import tree from "./assets/tree1.png";
import "./Login.css";
import { useState } from "react";

function Login({ onLogin }) {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {

    // ✅ บังคับกรอก
    if (!username.trim() || !password.trim() || !email.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // ---------------- LOGIN ----------------
      let res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      let data = await res.json();

      // ✅ LOGIN SUCCESS
      if (res.ok) {
        alert("Welcome back! User ID: " + data.user_id);
        if (onLogin) onLogin(data.user_id);
        return;
      }

      // ❌ ถ้า user ไม่มี → สมัคร
      if (data.detail === "User not found") {

        let signupRes = await fetch("http://127.0.0.1:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            email,
            password
          })
        });

        let signupData = await signupRes.json();

        if (!signupRes.ok) {
          alert(signupData.detail);
          return;
        }

        alert("New account created! Your ID: " + signupData.user_id);

        if (onLogin) onLogin(signupData.user_id);
        return;
      }

      // ❌ password ผิด
      alert(data.detail);

    } catch (err) {
      console.error(err);
      alert("Cannot connect to server");
    }
  };

  return (
    <div className="login-container">
      
      <div className="left">
        <img src={tree} alt="tree1" />
      </div>

      <div className="right">
        <h2>Get Started Now</h2>

        <input
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="signup" onClick={handleAuth}>
          Signup
        </button>
      </div>

    </div>
  );
}

export default Login;