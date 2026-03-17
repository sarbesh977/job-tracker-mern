import Navbar from "./components/Navbar";
import StatCard from "./components/StatCards";
import JobTable from "./components/JobTable";
import AddJobModal from "./components/AddJobModal";
import { useState } from "react";
import { BrowserRouter,Routes, Route } from "react-router-dom";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: "Google",
      role: "Frontend Developer",
      date: "2026-03-10",
      status: "Interview",
    },
    {
      id: 2,
      company: "Amazon",
      role: "Junior Dev",
      date: "2026-03-12",
      status: "Pending",
    },
  ]);
  const addJob = (newJob) => {
    newJob.id = Date.now();
    const updatedList = [newJob, ...jobs];
    setJobs(updatedList);
  };
  const handleStatusChange = (id, newStatus) => {
    const updatedJobs = jobs.map((job) => {
      if (job.id === id) {
        return { ...job, status: newStatus };
      }
      return job;
    });
    setJobs(updatedJobs);
  };
  const deleteJob=(id)=>{
    const isconfirmed=window.confirm("Are you sure you want to delete this job?");
    if(isconfirmed){
    setJobs(jobs.filter((job) => job.id !==id));
    }
  };
  return (
    <BrowserRouter>
    <div className="min-h-screen bg-slate-900 font-sans">
      <Navbar setIsModalOpen={setIsModalOpen} />
      
      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addJob}
      />

      <main className="max-w-7xl mx-auto p-6">
        <Routes>
          <Route path="/" element={
            <>
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-white">Dashboard</h2>
          <p className="text-slate-400">
            Welcome back! Here is your application status.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <StatCard
            title="Total Applications"
            count={jobs.length}
            color="text-blue-400"
          />
          <StatCard
            title="Interviews"
            count={jobs.filter((job) => job.status === "Interview").length}
            color="text-emerald-400"
          />
          <StatCard
            title="Pending"
            count={jobs.filter((job) => job.status === "Pending").length}
            color="text-amber-400"
          />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 px-6py-2 rounded-lg font-bold transition-colors"
        >
          + Add New
        </button>

        <section>
          <h3 className="text-xl font-semibold text-white mb-4">
            Recent Applications
          </h3>
          <JobTable jobs={jobs} onStatusChange={handleStatusChange} />
        </section>
          </>
        }/>
        <Route path={"/applications"} element={
          <section>
            <h2 className="text-2xl text-white font-bold mb-4">My Applications</h2>
            <JobTable jobs={jobs} onStatusChange={handleStatusChange} onDelete={deleteJob}/>
          </section>
        }/>
        </Routes>
        <div className="p-4 border-t border-slate-700/50 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">
            Made with ⚡ by <span className="text-blue-500">Sarbesh</span>
          </p>
        </div>
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
