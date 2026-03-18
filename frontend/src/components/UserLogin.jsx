// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useGoogleLogin } from "@react-oauth/google";

// export default function UserLogin({ onClose }) {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isRegister, setIsRegister] = useState(false);
//   const [name, setName] = useState("");

//   // Email/password login
//   const handleLogin = async () => {
//     console.log("Sending login data:", { email, password });
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/user-login", {
//         email,
//         password,
//       });
//       localStorage.setItem("token", res.data.token);
//       onClose();
//       navigate("/user-dashboard");
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   // User registration
//   const handleRegister = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/auth/user-register", {
//         name,
//         email,
//         password,
//       });
//       alert("Registration successful! Please login.");
//       setIsRegister(false);
//       setEmail("");
//       setPassword("");
//       setName("");
//     } catch (err) {
//       alert(err.response?.data?.message || "Registration failed");
//     }
//   };

//   // Google login
//   const loginWithGoogle = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       try {
//         const res = await axios.post("http://localhost:5000/api/auth/user-google-login", {
//           access_token: tokenResponse.access_token,
//         });

//         // If email not registered, backend returns 403
//         localStorage.setItem("token", res.data.token);
//         onClose();
//         navigate("/user-dashboard");
//       } catch (err) {
//         if (err.response?.status === 403) {
//           alert("Email not registered. Register first.");
//         } else {
//           alert("Google login failed");
//         }
//       }
//     },
//     onError: () => alert("Google login failed"),
//   });

//   return (
//     <div className="modal-overlay">
//       <div className="modal">
//         {!isRegister ? (
//           <>
//             <h2>Sign in to your Account</h2>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button onClick={handleLogin}>Login</button>

//             <p>
//               <span
//                 style={{ color: "blue", cursor: "pointer" }}
//                 onClick={() => loginWithGoogle()}
//               >
//                 Login with Google
//               </span>
//             </p>

//             <p>
//               New user?{" "}
//               <span
//                 style={{ color: "blue", cursor: "pointer" }}
//                 onClick={() => setIsRegister(true)}
//               >
//                 Create Account
//               </span>
//             </p>
//           </>
//         ) : (
//           <>
//             <h2>Register New Account</h2>
//             <input
//               type="text"
//               placeholder="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button onClick={handleRegister}>Register</button>
//             <p
//               style={{ color: "blue", cursor: "pointer" }}
//               onClick={() => setIsRegister(false)}
//             >
//               Back to Login
//             </p>
//           </>
//         )}

//         <button className="cancel-btn" onClick={onClose}>
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }

// File: src/components/UserLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import "./UserLogin.css"; // Optional, for styling the modal

export default function UserLogin({ onClose }) {
  const navigate = useNavigate();

  // State for login/register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  // ------------------ Email/Password Login ------------------
  const handleLogin = async () => {
    console.log("Login clicked, sending:", { email, password });
    if (!email || !password) {
      alert("Please fill in both email and password");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user-auth/user-login",
        { email, password }
      );
      console.log("Login response:", res.data);
      localStorage.setItem("token", res.data.token);
      onClose();
      navigate("/user-dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // ------------------ User Registration ------------------
  const handleRegister = async () => {
    console.log("Register clicked, sending:", { name, email, password });
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user-auth/user-register",
        { name, email, password }
      );
      console.log("Registration response:", res.data);
      alert("Registration successful! Please login.");
      setIsRegister(false);
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  // ------------------ Google Login ------------------
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google login token:", tokenResponse.access_token);
      try {
        const res = await axios.post(
          "http://localhost:5000/api/user-auth/user-google-login",
          { access_token: tokenResponse.access_token }
        );
        console.log("Google login response:", res.data);
        localStorage.setItem("token", res.data.token);
        onClose();
        navigate("/user-dashboard");
      } catch (err) {
        console.error("Google login error:", err.response?.data || err.message);
        if (err.response?.status === 403) {
          alert("Email not registered. Register first.");
        } else {
          alert("Google login failed");
        }
      }
    },
    onError: () => alert("Google login failed"),
  });

  return (
    <div className="modal-overlay">
      <div className="modal">
        {!isRegister ? (
          <>
            <h2>Sign in to your Account</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>

            <p>
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => loginWithGoogle()}
              >
                Login with Google
              </span>
            </p>

            <p>
              New user?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setIsRegister(true)}
              >
                Create Account
              </span>
            </p>
          </>
        ) : (
          <>
            <h2>Register New Account</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            <p
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setIsRegister(false)}
            >
              Back to Login
            </p>
          </>
        )}
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}