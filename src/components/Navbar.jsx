import { NavLink } from "react-router-dom";
const Navbar = ({setIsModalOpen}) => {
  return (
    
    <nav className="flex justify-between items-center bg-slate-800 p-4 px-8 text-white shadow-2xl border-b border-slate-700">
      
     
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold">J</div>
        <h1 className="text-xl font-bold tracking-tight">Job<span className="text-blue-400">Tracker</span></h1>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <NavLink 
  to="/" 
  className={({ isActive }) => 
    isActive ? "text-blue-400 font-bold" : "hover:text-blue-400 transition-colors text-slate-400"
  }
>
  Dashboard
</NavLink>

<NavLink 
  to="/applications" 
  className={({ isActive }) => 
    isActive ? "text-blue-400 font-bold" : "hover:text-blue-400 transition-colors text-slate-400"
  }
>
  My Applications
</NavLink>
        
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full font-semibold transition-all shadow-lg active:scale-95"
        onClick={() => setIsModalOpen(true)}
        >
          + New Job
        </button>
      </div>

      <div className="md:hidden text-2xl">☰</div>

    </nav>
  );
};

export default Navbar;