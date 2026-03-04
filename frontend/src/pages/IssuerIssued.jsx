export default function IssuerIssued() {
  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>Issued Credentials</h1>
      <p>List of all credentials you have issued.</p>

      {/* Sample Table */}
      <div style={{ marginTop: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Certificate</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td style={tdStyle}>John Doe</td>
              <td style={tdStyle}>john@example.com</td>
              <td style={tdStyle}>Blockchain Basics</td>
            </tr>

            <tr>
              <td style={tdStyle}>John Doe</td>
              <td style={tdStyle}>john@example.com</td>
              <td style={tdStyle}>Blockchain Basics</td>
            </tr>

            <tr>
              <td style={tdStyle}>John Doe</td>
              <td style={tdStyle}>john@example.com</td>
              <td style={tdStyle}>Blockchain Basics</td>
            </tr>

            <tr>
              <td style={tdStyle}>John Doe</td>
              <td style={tdStyle}>john@example.com</td>
              <td style={tdStyle}>Blockchain Basics</td>
            </tr>
            
            <tr>
              <td style={tdStyle}>John Doe</td>
              <td style={tdStyle}>john@example.com</td>
              <td style={tdStyle}>Blockchain Basics</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  borderBottom: "1px solid #444",
  padding: "10px",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #222",
};