import { useState } from "react";
import { useAuth, friendlyError } from "../context/AuthContext.jsx";

export default function Login() {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const isSignup = mode === "signup";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const cleanEmail = email.trim();
    if (isSignup && name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (!cleanEmail) {
      setError("Please enter your email.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setBusy(true);
    try {
      if (isSignup) {
        await signup(name.trim(), cleanEmail, password);
      } else {
        await login(cleanEmail, password);
      }
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  }

  function switchMode() {
    setMode(isSignup ? "login" : "signup");
    setError("");
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="logo-orb" />
        <h1 className="brand">ZYNOVA</h1>
        <p className="tagline">Your AI, Your World</p>
        <h2 className="auth-title">
          {isSignup ? "Create your account" : "Welcome back"}
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          {isSignup && (
            <label className="field">
              <span>Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                placeholder="Your name"
              />
            </label>
          )}

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>

          <label className="field">
            <span>Password</span>
            <div className="pw">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isSignup ? "new-password" : "current-password"}
                placeholder="At least 6 characters"
              />
              <button
                type="button"
                className="eye"
                onClick={() => setShow(!show)}
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          {error && (
            <div className="error" role="alert">
              {error}
            </div>
          )}

          <button className="btn" type="submit" disabled={busy}>
            {busy ? "Please wait..." : isSignup ? "Sign up" : "Log in"}
          </button>
        </form>

        <p className="switch">
          {isSignup ? "Already have an account?" : "New to ZYNOVA?"}{" "}
          <button type="button" className="link" onClick={switchMode}>
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}
