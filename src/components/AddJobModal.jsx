const AddJobModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
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
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
              placeholder="e.g. Google"
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
