import Navbar from "./components/Navbar";
import StatCard from "./components/StatCards";
import JobTable from "./components/JobTable";
import AddJobModal from "./components/AddJobModal";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import axios from 'axios';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user && user.token) {
      fetchJobs();
    }
  }, [user]);

  const fetchJobs = async () => {
    try {
      const token = user?.token;
      if (!token) return;

      const { data } = await axios.get('/api/v1/jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error.response?.data || error.message);
    }
  };

  const addJob = async (newJob) => {
    const token = user?.token;

    if (!token) {
      alert("No token found. Please log out and log in again.");
      return;
    }

    try {

      const jobToSubmit = {
        ...newJob,
        status: newJob.status.toLowerCase()
      };

      const { data } = await axios.post('/api/v1/jobs', jobToSubmit, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setJobs([data.job, ...jobs]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Add Job Error Details:", error.response?.data);
      alert(error.response?.data?.msg || "Failed to add job");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = user?.token;
      const { data } = await axios.patch(`/api/v1/jobs/${id}`, { status: newStatus.toLowerCase() }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const updatedJobs = jobs.map((job) => (job._id === id ? data.job : job));
      setJobs(updatedJobs);
    } catch (error) {
      alert("Update failed");
    }
  };

  const deleteJob = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const token = user?.token;
        await axios.delete(`/api/v1/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJobs(jobs.filter((job) => job._id !== id));
      } catch (error) {
        alert("Delete failed");
      }
    }
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900 font-sans flex flex-col">
        {user && <Navbar setIsModalOpen={setIsModalOpen} user={user} setUser={setUser} />}

        <AddJobModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={addJob}
        />

        <main className="max-w-7xl mx-auto p-6 flex-grow w-full">
          <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />

            <Route path="/dashboard" element={
              user ? (
                <>
                  <header className="mb-8">
                    <h2 className="text-3xl font-bold text-white">Dashboard</h2>
                    <p className="text-slate-400">Welcome back, {user.userName || user.name}!</p>
                  </header>

                  <div className="flex flex-col md:flex-row gap-6 mb-12">
                    <StatCard 
                      title="Total Applications" 
                      count={jobs.length} 
                      color="text-blue-400" 
                    />
                    <StatCard 
                      title="Interviews" 
                      count={jobs.filter(j => j.status.toLowerCase() === "interview").length} 
                      color="text-emerald-400" 
                    />
                    <StatCard 
                      title="Pending" 
                      count={jobs.filter(j => j.status.toLowerCase() === "pending").length} 
                      color="text-amber-400" 
                    />
                  </div>

                  <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-bold transition-colors text-white mb-8"
                  >
                    + Add New
                  </button>

                  <section>
                    <h3 className="text-xl font-semibold text-white mb-4">Recent Applications</h3>
                    <JobTable jobs={jobs.slice(0, 5)} onStatusChange={handleStatusChange} onDelete={deleteJob} />
                  </section>
                </>
              ) : (
                <Navigate to="/login" />
              )
            } />

            <Route path="/applications" element={
              user ? (
                <section>
                  <h2 className="text-2xl text-white font-bold mb-4">My Applications</h2>
                  <div className="mb-4">
                    <label className="text-sm text-slate-400 mr-2">Filter By:</label>
                    <select 
                      value={filterStatus} 
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="bg-slate-800 border border-slate-700 text-white rounded-md px-3 py-1.5"
                    >
                      <option value="All">All</option>
                      <option value="Interview">Interview</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <JobTable 
                    jobs={jobs.filter(j => filterStatus === "All" || j.status.toLowerCase() === filterStatus.toLowerCase())} 
                    onStatusChange={handleStatusChange} 
                    onDelete={deleteJob} 
                  />
                </section>
              ) : (
                <Navigate to="/login" />
              )
            } />
          </Routes>
        </main>

        <footer className="p-4 border-t border-slate-700/50 text-center mt-auto">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">
            Made with ⚡ by <span className="text-blue-500">Sarbesh</span>
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;