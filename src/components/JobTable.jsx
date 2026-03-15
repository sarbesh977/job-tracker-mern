const JobTable = () => {
  const jobs = [
    {
      id: 1,
      company: "Google",
      role: "Frontend Developer",
      status: "Interview",
    },
    { id: 2, company: "Amazon", role: "Junior Dev", status: "Pending" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden mt-6">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase">
          <tr>
            <th className="p-4">Company</th>
            <th className="p-4">Role</th>
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
              <td className="p-4 text-right">
                <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-bold">
                  {job.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
