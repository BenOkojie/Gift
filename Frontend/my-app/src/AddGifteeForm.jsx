import React, { useState } from "react";
import { supabase } from "./supabase";

export default function AddGifteeForm() {
  const [form, setForm] = useState({
    name: "",
    birthdate: "",
    hobbies: "",
    relationship: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const session = await supabase.auth.getSession();
    const token = session.data.session.access_token;

    const payload = {
      ...form,
      hobbies: form.hobbies.split(",").map(h => h.trim()), // convert string to list
    };

    const res = await fetch("http://localhost:8000/add-giftee", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="date" name="birthdate" onChange={handleChange} required />
      <input type="text" name="hobbies" placeholder="Hobbies (comma separated)" onChange={handleChange} required />
      <input type="text" name="relationship" placeholder="Relationship" onChange={handleChange} required />
      <button type="submit">Add Giftee</button>
    </form>
  );
}
