import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "./Auth.module.css";
import Line2 from "../lines/rightLine";
function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      Swal.fire(
        "Success",
        "Registration successful! Please log in.",
        "success"
      );
      navigate("/login");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError("Registration failed. Please try again.");
        Swal.fire("Error", "Registration failed. Please try again.", "error");
      } else {
        Swal.fire("Error", "Network error. Please try again.", "error");
      }
    }
  };

  return (
    <div className={styles.authContainer}>
      <Line2 customStyles={{ zIndex: "0", transform: "rotateY(180deg)" }} />
      <div className={styles.authCard}>
        <h2 className={styles.authHeading}>Join us!</h2>
        {/* <p className={styles.authSubheading}>
          Create your account and start your journey.
        </p> */}
        <form onSubmit={handleSubmit} className={styles.authForm}>
          {error && <div className={styles.authError}>{error}</div>}

          <div className={styles.row}>
            <input
              type="text"
              placeholder="First Name"
              className={styles.authInput}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className={styles.authInput}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            className={styles.authInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.authInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.authInput}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className={styles.authButton}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className={styles.authSwitch}>
          Already have an account?{" "}
          <button
            className={styles.authLink}
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
