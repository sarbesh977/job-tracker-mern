import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [values, setValues] = useState({ userName: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/v1/auth/register', values);
      alert("User Registered Successfully!");
      navigate('/login');
    } catch (error) {
      console.error(error.response?.data?.msg || "Something went wrong");
      alert(error.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 font-sans">
      {}
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700/50">
        <h2 className="text-3xl font-extrabold text-white mb-2 text-center tracking-tight">Create Account</h2>
        <p className="text-slate-400 text-center mb-8">Join Job Tracker to start your journey</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Full Name</label>
            <input
              type="text"
              name="userName"
              autoComplete="name"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200"
              placeholder="Sarbesh Poudyal"
              onChange={handleChange}
              required
            />
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200"
              placeholder="name@example.com"
              onChange={handleChange}
              required
            />
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Password</label>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200"
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>

          {}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-lg shadow-indigo-500/20 transform active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>

        <p className="text-slate-400 mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link 
            to="/login" 
            className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;