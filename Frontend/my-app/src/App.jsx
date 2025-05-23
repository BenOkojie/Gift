import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import LoginSignup from "./LoginSignup";
import GifteeDetail from "./GifteeDetail"; // ✅ the new page
import React, { useState, useEffect } from "react";
import { supabase } from "./supabase";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <Routes>
        {session ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/giftee/:id" element={<GifteeDetail />} />
          </>
        ) : (
          <Route path="/" element={<LoginSignup />} />
        )}
      </Routes>
    </Router>
  );
}
export default App;
