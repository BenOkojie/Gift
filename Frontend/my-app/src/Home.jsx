import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { Link } from "react-router-dom";
export default function Home() {
  const [giftees, setGiftees] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    hobbies: "",
    relationship: "",
  });

  useEffect(() => {
    fetchGiftees();
  }, []);

  const fetchGiftees = async () => {
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddGiftee = async (e) => {
    e.preventDefault();

    const session = await supabase.auth.getSession();
    const token = session.data.session.access_token;
    console.log(token)

    const payload = {
      ...formData,
      hobbies: formData.hobbies.split(",").map((h) => h.trim()),
    };

    const res = await fetch("http://localhost:8000/add-giftee", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setShowForm(false);
      setFormData({ name: "", birthdate: "", hobbies: "", relationship: "" });
      fetchGiftees(); // refresh list
    }
  };

  const filteredGiftees = giftees.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>🎁 GiftSmart</h1>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search giftees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={() => setShowForm(true)}>+ Add Giftee</button>
      </div>

      <ul>
        {filteredGiftees.length > 0 ? (
       filteredGiftees.map((g) => (
        <li key={g.id} style={{ marginBottom: 10 }}>
            <Link to={`/giftee/${g.id}`} state={{ giftee: g }}>
            <strong>{g.name}</strong>
            </Link>
            <br />
            <small>Birthday: {g.birthdate}</small>
            <br />
            <small>Hobbies: {g.hobbies?.join(", ")}</small>
        </li>
        ))
        ) : (
          <p>No giftees found.</p>
        )}
      </ul>

      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}
        >
          <form
            onSubmit={handleAddGiftee}
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 8,
              width: "90%",
              maxWidth: 400,
            }}
          >
            <h3>Add New Giftee</h3>
            <input name="name" placeholder="Name" onChange={handleInputChange} required style={{ width: "100%", marginBottom: 10 }} />
            <input type="date" name="birthdate" onChange={handleInputChange} required style={{ width: "100%", marginBottom: 10 }} />
            <input name="hobbies" placeholder="Hobbies (comma-separated)" onChange={handleInputChange} required style={{ width: "100%", marginBottom: 10 }} />
            <input name="relationship" placeholder="Relationship" onChange={handleInputChange} required style={{ width: "100%", marginBottom: 10 }} />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button type="submit">Add</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
