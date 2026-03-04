export default function IssuerIssue() {
  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>Issue Credential</h1>
      <p>Fill in the details to issue a new credential.</p>

      {/* Sample Form UI */}
      <div style={{ marginTop: "20px" }}>
        <input
          placeholder="Recipient Name"
          style={inputStyle}
        />

        <input
          placeholder="Recipient Email"
          style={inputStyle}
        />

        <input
          placeholder="Course Name"
          style={inputStyle}
        />

        <input
          placeholder="Certificate Title"
          style={inputStyle}
        />

        <button style={buttonStyle}>
          Issue Credential
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  display: "block",
  marginBottom: "12px",
  padding: "10px",
  width: "300px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
};

const buttonStyle = {
  padding: "10px 16px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(90deg, #7b61ff, #5ac8fa)",
  color: "white",
  cursor: "pointer",
};