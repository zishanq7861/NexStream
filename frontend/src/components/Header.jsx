import React, { useState } from 'react';
import { Search, Bell, User, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UploadModal from './UploadModal';

// 1. ADD setSearchQuery TO THE PROPS HERE
export default function Header({ onMenuClick, setSearchQuery }) {
  const { user, setUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      <header className="bg-black h-16 flex items-center justify-between px-6 border-b border-gray-800 sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
        
        {/* LEFT: LOGO SECTION */}
        <div className="flex items-center gap-4">
          <Menu 
            className="text-white cursor-pointer hover:text-neon-cyan transition-colors" 
            onClick={onMenuClick} 
          />
          
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_8px_rgba(0,242,255,0.5)]">
              <path d="M10 30H25M10 50H20M10 70H25" stroke="#00F2FF" strokeWidth="4" strokeLinecap="round"/>
              <circle cx="28" cy="30" r="3" fill="#00F2FF" />
              <circle cx="23" cy="50" r="3" fill="#00F2FF" />
              <circle cx="28" cy="70" r="3" fill="#00F2FF" />
              <path d="M40 25V75L85 50L40 25Z" fill="#00F2FF" />
            </svg>

            <h1 className="text-white font-black text-2xl tracking-tighter italic uppercase">
              NEX<span className="text-neon-cyan drop-shadow-[0_0_5px_#00F2FF]">STREAM</span>
            </h1>
          </div>
        </div>

        {/* CENTER: SEARCH BAR - NOW CONNECTED */}
        <div className="hidden md:flex items-center bg-main-bg border border-gray-800 rounded-full px-4 py-1.5 w-1/3 focus-within:border-neon-cyan transition-all">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search videos..." 
            // 2. THIS IS THE MAGIC LINE
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="bg-transparent border-none focus:outline-none text-white text-sm ml-3 w-full placeholder:text-gray-600" 
          />
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="flex items-center gap-5">
          <button 
            onClick={() => setIsUploadOpen(true)}
            className="hidden sm:block text-[10px] font-bold text-neon-cyan border border-neon-cyan/50 px-4 py-2 rounded uppercase tracking-tighter hover:bg-neon-cyan hover:text-black transition-all shadow-[0_0_10px_rgba(0,242,255,0.2)]"
          >
            Upload
          </button>
          
          <Bell size={20} className="text-white cursor-pointer hover:text-neon-cyan transition-colors" />
          
          {/* PROFILE SECTION */}
          <div className="relative">
            <div 
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-9 h-9 rounded-full border-2 border-gray-800 flex items-center justify-center p-0.5 hover:border-neon-cyan transition-colors cursor-pointer overflow-hidden"
            >
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
              )}
            </div>

            {showDropdown && user && (
              <div className="absolute right-0 mt-2 w-48 bg-card-bg border border-gray-800 rounded-xl shadow-2xl py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-700 mb-2">
                  <p className="text-white text-xs font-bold">{user.fullName}</p>
                  <p className="text-[#CBD5E1] text-[10px]">@{user.username}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-black/20 text-xs font-bold transition-all"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <UploadModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
      />
    </>
  );
}