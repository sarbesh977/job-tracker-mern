import Navbar from "./components/Navbar";
import StatCard from "./components/StatCards";
import JobTable from "./components/JobTable";
import AddJobModal from "./components/AddJobModal";
import { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Navbar />
      <AddJobModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <main className="max-w-7xl mx-auto p-6">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-white">Dashboard</h2>
          <p className="text-slate-400">
            Welcome back! Here is your application status.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <StatCard
            title="Total Applications"
            count={12}
            color="text-blue-400"
          />
          <StatCard title="Interviews" count={3} color="text-emerald-400" />
          <StatCard title="Pending" count={5} color="text-amber-400" />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-bold transition-colors"
        >
          + Add New
        </button>

        <section>
          <h3 className="text-xl font-semibold text-white mb-4">
            Recent Applications
          </h3>
          <JobTable />
        </section>
        <div className="p-4 border-t border-slate-700/50 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">
            Made with ⚡ by <span className="text-blue-500">Sarbesh</span>
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
