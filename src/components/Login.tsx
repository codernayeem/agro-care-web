import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        const errMsg = err.message;
        if (errMsg.includes("auth/user-not-found")) {
          setError("User not found");
        } else if (errMsg.includes("auth/invalid-credential")) {
          setError(
            "Invalid credential. Please sign in with correct email and password"
          );
        } else if (errMsg.includes("auth/too-many-requests")) {
          setError("Too many requests. Try again later");
        } else if (errMsg.includes("auth/invalid-email")) {
          setError("Invalid email");
        } else if (errMsg.includes("auth/user-disabled")) {
          setError("User disabled");
        } else {
          setError(err.message || "Failed to login");
        }
      } else {
        setError("Failed to login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to sign in with Google");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded-md transition ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2 flex items-center justify-center bg-white border rounded-md shadow-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <img src="/svg/google.svg" alt="Google" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>
        </div>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-green-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
