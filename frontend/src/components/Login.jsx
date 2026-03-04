import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ onClose }) {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/google",
          {
            access_token: tokenResponse.access_token, // ✅ send access token
          }
        );

        localStorage.setItem("token", res.data.token);

        onClose();
        navigate("/dashboard");

      } catch (err) {
        console.error(err);
        alert("Access denied. Not an authorized issuer.");
      }
    },
    onError: () => console.log("Login Failed"),
  });

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Sign in</h2>
        <p>Sign in with Google to access your decentralized identity</p>

        {/* ✅ YOUR CUSTOM BUTTON (CSS WILL WORK NOW) */}
        <button className="google-btn" onClick={() => login()}>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            width="18"
          />
          Sign in with Google
        </button>

        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}