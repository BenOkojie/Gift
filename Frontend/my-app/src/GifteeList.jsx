// src/GifteeList.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function GifteeList() {
  const [giftees, setGiftees] = useState([]);

  useEffect(() => {
    const loadGiftees = async () => {
      const session = await supabase.auth.getSession();
      const token = session.data.session.access_token;

      const res = await fetch("http://localhost:8000/get-giftees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setGiftees(data);
    };

    loadGiftees();
  }, []);

  return (
    <ul>
      {giftees.map((g) => (
        <li key={g.id}>{g.name}</li>
      ))}
    </ul>
  );
}
