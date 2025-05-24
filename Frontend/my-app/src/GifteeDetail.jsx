import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { supabase } from "./supabase";
import GiftResults from "./GiftResults";
import dayjs from "dayjs";

export default function GifteeDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [giftee, setGiftee] = useState(location.state?.giftee || null);
  const [giftIdeas, setGiftIdeas] = useState([]);

  useEffect(() => {
    if (!giftee) {
      fetchGifteeFromDB();
    }
  }, [id]);

  const fetchGifteeFromDB = async () => {
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

  const generateGifts = async () => {
    const session = await supabase.auth.getSession();
    const token = session.data.session.access_token;

    const res = await fetch("http://localhost:8000/generategift", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(giftee),
    });

    const ideas = await res.json();
    setGiftIdeas(ideas);
  };

  if (!giftee) return <p>Loading giftee info...</p>;

  const age = dayjs().diff(dayjs(giftee.birthdate), "year");

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h2>{giftee.name}</h2>
      <p>
        <strong>Age:</strong> {age}
      </p>
      <p>
        <strong>Hobbies:</strong> {giftee.hobbies?.join(", ")}
      </p>

      <button style={{ margin: "1rem 0" }} onClick={generateGifts}>
        🎁 Generate Gift Ideas 
      </button>

      {giftIdeas.length > 0 && (
        <GiftResults gifts={giftIdeas} />
      )}
    </div>
  );
}
