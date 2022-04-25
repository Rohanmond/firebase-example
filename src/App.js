import { useEffect, useState } from "react";
import "./styles.css";
import { app, auth, db } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where
} from "firebase/firestore";
const initialLogin = {
  email: "",
  password: ""
};
const initialSignup = {
  email: "",
  password: ""
};

export default function App() {
  const [signup, setSignup] = useState(initialSignup);
  const [login, setLogin] = useState(initialLogin);
  const [update, setUpdate] = useState(0);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    if (token && userId) {
      (async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", userId));
          onSnapshot(q, (data) => {
            setUser({ ...data.docs[0].data(), id: data.docs[0].id });
          });
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [token]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getDocs(collection(db, "users"));
        setAllData(
          res.docs.map((item) => {
            return { ...item.data(), id: item.id };
          })
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const updateHandler = async (e) => {
    e.preventDefault();

    await updateDoc(doc(db, "users", user.id), {
      score: [...user.score, update]
    });
  };

  const loginSubmitHanlder = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        login.email,
        login.password
      );
      setToken(res.user.accessToken);
      setUserId(res.user.uid);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLogin(initialLogin);
    }
  };

  const signupSubmitHanlder = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        signup.email,
        signup.password
      );

      await addDoc(collection(db, "users"), {
        uid: res.user.uid,
        score: [],
        email: res.user.email
      });
      setToken(res.user.accessToken);
      setUserId(res.user.uid);
    } catch (err) {
      console.log(err.message);
    } finally {
      setSignup(initialLogin);
    }
  };

  const logoutHandler = () => {
    signOut(auth);
    setToken("");
    setUserId("");
    setUser({});
  };
  console.log(auth.currentUser);
  return (
    <div className="App">
      {!token ? (
        <>
          <form onSubmit={loginSubmitHanlder}>
            <input
              placeholder="username"
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
            <input
              placeholder="password"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
            <input type="submit" value="Login" />
          </form>
          <form onSubmit={signupSubmitHanlder}>
            <input
              placeholder="username"
              value={signup.email}
              onChange={(e) => setSignup({ ...signup, email: e.target.value })}
            />
            <input
              placeholder="password"
              value={signup.password}
              onChange={(e) =>
                setSignup({ ...signup, password: e.target.value })
              }
            />
            <input type="submit" value="Signup" />
          </form>
        </>
      ) : (
        <div>
          <button onClick={logoutHandler}>Logout</button>
          <form onSubmit={updateHandler}>
            <input
              value={update}
              type="number"
              placeholder="update"
              onChange={(e) => setUpdate(e.target.value)}
            />
            <input type="submit" value="update" />
          </form>
        </div>
      )}
      <div>
        <ul>
          {allData.map((el) => {
            return <li>{JSON.stringify(el)}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
