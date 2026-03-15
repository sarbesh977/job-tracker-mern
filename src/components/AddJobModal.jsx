import { useState } from "react";

const AddJobModal = ({ isOpen, onClose, onAdd }) => {
  if (!isOpen) return null;

  const [companyName, setCompanyName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      company: companyName,
      role: jobRole,
      date: date,
      status: "Pending",
    };
    onAdd(newJob);
    setCompanyName("");
    setJobRole("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl shadow-xl">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-xl font-bold">Add New Job</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Company</label>
            <input
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
              placeholder="e.g. Google"
            />
            <div>
              <label className="block text-slate-400 text-sm mb-1">Role</label>
              <input
                type="text"
                placeholder="e.g. Frontend Developer"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white outline-none focus:border-blue-500"
                onChange={(e) => setJobRole(e.target.value)}
              />
            </div>
            <label className="block text-sm text-slate-400 mb-1">
              Date Applied
            </label>
            <input
              required
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              placeholder={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-700 py-2 rounded-lg font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 py-2 rounded-lg font-bold"
            >
              Save Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddJobModal;
