import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./supabase";
import dayjs from "dayjs";

export default function GifteeDetail() {
  const { id } = useParams();
  const [giftee, setGiftee] = useState(null);

  useEffect(() => {
    fetchGiftee();
  }, []);

  const fetchGiftee = async () => {
    const session = await supabase.auth.getSession();
    const token = session.data.session.access_token;

    const res = await fetch(`http://localhost:8000/giftee/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setGiftee(data);
  };

  if (!giftee) return <p>Loading giftee info...</p>;

  const age = dayjs().diff(dayjs(giftee.birthdate), "year");

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2>{giftee.name}</h2>
      <p>Age: {age}</p>
      <p>Hobbies: {giftee.hobbies?.join(", ")}</p>

      <button
        style={{ marginTop: 20 }}
        onClick={() => alert("🎁 AI gift generation coming soon!")}
      >
        Generate Gift Ideas
      </button>
    </div>
  );
}
