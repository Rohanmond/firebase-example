import { useState } from "react";
import "./styles.css";
import { app } from "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function App() {
  const [username, setUsername] = useState("");
  let auth = getAuth();
  const [password, setPassword] = useState("");

  const submitHanlder = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
      console.log(res);
    } catch (err) {
      console.log(err.message);
    } finally {
      setPassword("");
      setUsername("");
    }
  };
  return (
    <div className="App">
      <form onSubmit={submitHanlder}>
        <input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
