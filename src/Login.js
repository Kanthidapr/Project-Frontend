import tree from "./assets/tree1.png";
import "./Login.css";

function Login({ onLogin }) {
  return (
    <div className="login-container">
      
      <div className="left">
        <img src={tree} alt="tree1" />
      </div>

      <div className="right">
        <h2>Get Started Now</h2>

        <input placeholder="Name" />
        <input placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button className="signup" onClick={onLogin}>
          Signup
        </button>
      </div>

    </div>
  );
}

export default Login;