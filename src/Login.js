import { useState } from "react";
import tree from "./assets/tree1.png";
import "./Login.css";

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    fetch("http://127.0.0.1:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email.split("@")[0],
        email: email,
        password: password
      }),
    })
      .then(res => res.json())
      .then(data => {
        // ✅ เก็บ user หลังสมัคร
        const userData = {
          name: name,
          username: email.split("@")[0],
          id: data.user_id,
          avatar: "https://i.pravatar.cc/150"
        };

        localStorage.setItem("user", JSON.stringify(userData));

        onLogin(); // ไปหน้า Home
      })
      .catch(err => console.error(err));
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
          value={name}
          onChange={(e) => setName(e.target.value)}
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

        <button className="signup" onClick={handleSignup}>
          Signup
        </button>
      </div>

    </div>
  );
}

export default Login;