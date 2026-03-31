import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/auth/login", values);
      
      const { user, token } = response.data;

      // 3. Validation check
      if (!token) {
        console.error("TOKEN MISSING: The backend did not send a token!");
        alert("Login failed: No security token received.");
        return;
      }

      const userData = { 
        userName: user.userName, 
        token: token 
      };
      
      // 5. Save to LocalStorage for persistence
      localStorage.setItem("user", JSON.stringify(userData));
      
      // 6. Update App state
      setUser(userData);
      
      alert("Login Successful!");
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Login Error:", error.response?.data);
      alert(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="max-w-md w-full bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700">
        <h2 className="text-3xl font-bold text-white text-center mb-2">Welcome Back</h2>
        <p className="text-center mb-8 text-slate-400">Login to manage your jobs</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="sarbesh@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-300">Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-all transform active:scale-95"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link to="/" className="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;