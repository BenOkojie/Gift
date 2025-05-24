import React from "react";

export default function GiftResults({ gifts }) {
  if (!gifts?.length) return <p>No gift ideas yet.</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {gifts.map((gift, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h3 style={{ margin: 0 }}>{gift.name}</h3>
            {gift.isdiy && <span style={badgeStyle}>DIY</span>}
            {gift.isevent && <span style={{ ...badgeStyle, background: "#ffafcc" }}>Event</span>}
          </div>

          <p style={{ margin: "0.5rem 0" }}>{gift.description}</p>
          <p><strong>Price:</strong> ${gift.price}</p>
          {gift.link && (
            <p>
              <a href={gift.link} target="_blank" rel="noreferrer">
                View Product
              </a>
            </p>
          )}

          {/* Optional Recipe Block */}
          {gift.recipe && (
            <div style={sectionStyle}>
              <h4>🛠 Recipe</h4>
              <p><strong>Total Time:</strong> {gift.recipe.totaltime}</p>
              <ul>
                {gift.recipe.steps?.map((step, idx) => (
                  <li key={idx}>{step} — {gift.recipe.time?.[idx]}</li>
                ))}
              </ul>
              <ul>
                {gift.recipe.materials?.map((mat, idx) => (
                  <li key={idx}>
                    {mat.quantity} {mat.unit} of {mat.name} (${mat.price})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Optional Event Block */}
          {gift.event && (
            <div style={sectionStyle}>
              <h4>🎉 Event</h4>
              <p><strong>When:</strong> {gift.event.when}</p>
              <p><strong>Where:</strong> {gift.event.where}</p>
              <p><strong>Total Time:</strong> {gift.event.totaltime}</p>
              <ul>
                {gift.event.activities?.map((act, idx) => (
                  <li key={idx}>{act} at {gift.event.time?.[idx]}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const badgeStyle = {
  padding: "0.2rem 0.5rem",
  background: "#caffbf",
  borderRadius: "6px",
  fontSize: "0.8rem",
  fontWeight: "bold",
};

const sectionStyle = {
  marginTop: "1rem",
  padding: "0.5rem",
  background: "#f9f9f9",
  borderRadius: "6px",
};
