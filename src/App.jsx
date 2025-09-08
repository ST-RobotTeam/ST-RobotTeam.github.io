import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth, provider, db } from "./firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import Login from "./components/Login";
import AccessDenied from "./components/AccessDenied";
import Dashboard from "./components/Dashboard";
import Admin from "./components/Admin";

function App() {
  const [user, setUser] = useState(null);
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const memberRef = doc(db, "members", currentUser.email);
          const memberSnap = await getDoc(memberRef);

          if (memberSnap.exists()) {
            const memberData = memberSnap.data();
            setUser({
              ...currentUser,
              username: memberData.username || currentUser.displayName,
              role: memberData.role || "user",
            });
            setAllowed(true);
          } else {
            setUser(currentUser);
            setAllowed(false);
          }
        } catch (error) {
          console.error("Error checking whitelist:", error);
          setUser(currentUser);
          setAllowed(false);
        }
      } else {
        setUser(null);
        setAllowed(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    signOut(auth);
    setUser(null);
    setAllowed(false);
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <Router>
      <Routes>
        {/* หน้า login */}
        <Route
          path="/login"
          element={!user ? <Login login={login} /> : <Navigate to="/dashboard" />}
        />

        {/* หน้า access denied */}
        <Route
          path="/access-denied"
          element={user && !allowed ? <AccessDenied logout={logout} /> : <Navigate to="/dashboard" />}
        />

        {/* หน้า dashboard สำหรับ user */}
        <Route
          path="/dashboard"
          element={
            user
              ? allowed
                ? <Dashboard user={user} logout={logout} />
                : <Navigate to="/access-denied" />
              : <Navigate to="/login" />
          }
        />

        {/* /admin route ยังคงเข้าถึงเฉพาะ admin */}
        <Route
          path="/admin"
          element={
            user && allowed && user.role === "admin"
              ? <Admin user={user} />
              : <Navigate to="/dashboard" />
          }
        />

        {/* หน้าเริ่มต้น (default) */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
