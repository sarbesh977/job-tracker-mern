const StatCard = ({ title, count, color }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex-1 shadow-md">
      <p className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">
        {title}
      </p>
      <h3 className={`text-4xl font-black ${color}`}>{count}</h3>
    </div>
  );
};

export default StatCard;
