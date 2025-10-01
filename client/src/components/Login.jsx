import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [activeRole, setActiveRole] = useState("buyer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const roleToPath = {
      buyer: "/buyer_home/petadoption",
      seller: "/seller_home/listanimals",
      veterinarian: "/vet_home/listservices",
    };
    for (const [k, path] of Object.entries(roleToPath)) {
      if (localStorage.getItem(k)) {
        navigate(path, { replace: true });
        break;
      }
    }
  }, [navigate]);

  const roleButtonClasses = (role) =>
    `flex-1 py-3 px-4 rounded-lg font-semibold text-center transition-all duration-300 ${
      activeRole === role
        ? "bg-white text-blue-600 shadow-md"
        : "text-gray-600 hover:bg-gray-200 hover:text-blue-600"
    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`;

  const handleLogin = () => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role: activeRole }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }

        const role = data.role || activeRole;
        const userObj = {
          firstName: data.firstName || "User",
          _id: data.userId,
          email,
          role,
        };
        ["buyer", "seller", "veterinarian", "vet"].forEach((k) =>
          localStorage.removeItem(k)
        );
        const storageKey = role === "veterinarian" ? "vet" : role;
        localStorage.setItem(storageKey, JSON.stringify(userObj));

        // Update auth context
        login(userObj);

        if (storageKey === "buyer")
          navigate("/buyer_home/petadoption", { replace: true });
        else if (storageKey === "seller")
          navigate("/seller_home/listanimals", { replace: true });
        else if (storageKey === "vet")
          navigate("/vet_home/listservices", { replace: true });
      })
      .catch((err) => {
        console.error("Login failed:", err);
        alert("Login failed");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4 py-24">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-purple-100">Sign in to your PetConnect account</p>
        </div>

        <div className="flex bg-gray-100 p-1 space-x-1">
          <button
            onClick={() => setActiveRole("buyer")}
            className={roleButtonClasses("buyer")}
            type="button"
          >
            Buyer
          </button>
          <button
            onClick={() => setActiveRole("seller")}
            className={roleButtonClasses("seller")}
            type="button"
          >
            Seller
          </button>
          <button
            onClick={() => setActiveRole("veterinarian")}
            className={roleButtonClasses("veterinarian")}
            type="button"
          >
            Veterinarian
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder={`Enter your ${activeRole} email`}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Sign In as {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              First time here?{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
