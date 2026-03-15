const JobTable = ({ jobs, onStatusChange }) => {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden mt-6">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase">
          <tr>
            <th className="p-4">Company</th>
            <th className="p-4">Role</th>
            <th className="p-4">Date</th>
            <th className="p-4 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {jobs.map((job) => (
            <tr
              key={job.id}
              className="hover:bg-slate-700/30 transition-colors"
            >
              <td className="p-4 text-white font-medium">{job.company}</td>
              <td className="p-4 text-slate-300">{job.role}</td>
              <td className="p-4 text-slate-400 text-sm">{job.date}</td>
              <td className="p-4 text-right">
                <select
                  value={job.status}
                  onChange={(e) => onStatusChange(job.id, e.target.value)}
                  className="bg-slate-900 text-blue-400 border border-blue-500/30 px-2 py-1 rounded text-xs font-bold outline-none cursor-pointer hover:border-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Interview">Interview</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
