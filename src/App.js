import { useState } from "react";
import Login from "./Login";
import Home from "./Home";

function App() {
  const [page, setPage] = useState("login");

  return (
    <>
      {page === "login" ? (
        <Login onLogin={() => setPage("home")} />
      ) : (
        <Home />
      )}
    </>
  );
}

export default App;