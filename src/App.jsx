import { useAuth } from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
  const { user, displayName, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="center-screen">
        <div className="spinner" aria-label="Loading" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="center-screen">
      <div className="card">
        <h1 className="brand">ZYNOVA</h1>
        <p className="muted">
          Welcome{displayName ? ", " + displayName : ""}. You are logged in.
        </p>
        <button className="btn" onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
}
