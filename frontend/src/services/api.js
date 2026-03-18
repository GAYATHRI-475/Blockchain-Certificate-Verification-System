// const BASE_URL = "http://localhost:5000/api/certificate";

// // 🔹 Issue Certificate
// export const issueCertificate = async (data) => {
//   const res = await fetch(`${BASE_URL}/issue`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) throw new Error("Failed to issue certificate");
//   return res.json();
// };

// // 🔹 Verify Certificate
// export const verifyCertificate = async (id) => {
//   const res = await fetch(`${BASE_URL}/verify/${id}`);

//   if (!res.ok) throw new Error("Failed to verify certificate");
//   return res.json();
// };



const BASE_URL = "http://localhost:5000/api";

// 🔹 Issue Certificate (unchanged)
export const issueCertificate = async (data) => {
  const res = await fetch(`${BASE_URL}/certificates/issue`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to issue certificate");
  return res.json();
};

// 🔹 Verify Certificate by HASH
export const verifyCertificate = async (certificateHash) => {
  const res = await fetch(`${BASE_URL}/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ certificateHash }),
  });

  if (!res.ok) throw new Error("Failed to verify certificate");
  return res.json();
};