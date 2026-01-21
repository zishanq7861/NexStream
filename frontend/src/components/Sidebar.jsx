import React from 'react';
import { Home, Compass, PlaySquare, Clock, ThumbsUp, History, Film, Flame } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active }) => (
  <div className={`relative flex items-center gap-4 px-6 py-3 cursor-pointer transition-all duration-300 group
    ${active 
      ? 'bg-neon-cyan/10 text-neon-cyan' 
      : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
    
    {active && (
      <div className="absolute left-0 w-1 h-6 bg-neon-cyan rounded-r-full shadow-[0_0_15px_#00F2FF]" />
    )}
    
    <Icon size={22} className={`${active ? 'drop-shadow-[0_0_8px_#00F2FF]' : 'group-hover:text-neon-cyan'}`} />
    <span className="text-xs font-bold tracking-widest uppercase">{label}</span>
  </div>
);

// We added the 'isOpen' prop here
const Sidebar = ({ isOpen }) => {
  return (
    <aside 
      className={`flex flex-col bg-black border-r border-gray-900 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto scrollbar-hide transition-all duration-300 ease-in-out z-40
      ${isOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 -translate-x-full border-none'}`}
    >
      {/* Wrapped in a fixed-width div to prevent content squishing during animation */}
      <div className="w-64 flex flex-col h-full">
        {/* Primary Section */}
        <div className="py-4">
          <SidebarItem icon={Home} label="Home" active />
          <SidebarItem icon={Flame} label="Trending" />
          <SidebarItem icon={Compass} label="Explore" />
        </div>

        <div className="h-px bg-linear-to-r from-transparent via-gray-800 to-transparent mx-4 my-2" />

        {/* Library Section */}
        <div className="py-2">
          <h3 className="px-6 text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-2">Library</h3>
          <SidebarItem icon={History} label="History" />
          <SidebarItem icon={Film} label="Your Clips" />
          <SidebarItem icon={Clock} label="Watch Later" />
          <SidebarItem icon={ThumbsUp} label="Liked" />
        </div>

        <div className="h-px bg-linear-to-r from-transparent via-gray-800 to-transparent mx-4 my-2" />
        
        {/* Footer Info */}
        <div className="mt-auto p-6">
          <div className="p-4 rounded-xl bg-linear-to-b from-gray-900 to-black border border-gray-800">
            <p className="text-[10px] text-gray-500 font-bold leading-tight">
              NEXSTREAM <span className="text-neon-cyan">v1.0.4</span>
            </p>
            <p className="text-[9px] text-gray-600 mt-1">System operational</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;