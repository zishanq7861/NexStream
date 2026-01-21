import React, { useState } from 'react';
import { Search, Bell, User, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import UploadModal from './UploadModal';
import api from '../utils/axios';

export default function Header({ onMenuClick, setSearchQuery }) {
  // We pull user and loading from our AuthContext
  const { user, setUser } = useAuth(); 
  const [showDropdown, setShowDropdown] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/users/logout');
      setUser(null);
      setShowDropdown(false);
      navigate('/');
    } catch (error) {
      setUser(null);
      navigate('/login');
    }
  };

  return (
    <>
      <header className="bg-black h-16 flex items-center justify-between px-6 border-b border-gray-800 sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
        
        {/* LEFT: LOGO */}
        <div className="flex items-center gap-4">
          <Menu 
            className="text-white cursor-pointer hover:text-[#00F2FF] transition-colors" 
            onClick={onMenuClick} 
          />
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <h1 className="text-white font-black text-2xl tracking-tighter italic uppercase">
              NEX<span className="text-[#00F2FF] drop-shadow-[0_0_5px_#00F2FF]">STREAM</span>
            </h1>
          </div>
        </div>

        {/* CENTER: SEARCH - Midnight Blue #0F172A */}
        <div className="hidden md:flex items-center bg-[#0F172A] border border-gray-800 rounded-full px-4 py-1.5 w-1/3 focus-within:border-[#00F2FF] transition-all">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search videos..." 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="bg-transparent border-none focus:outline-none text-white text-sm ml-3 w-full placeholder:text-blue-200/40" 
          />
        </div>

        {/* RIGHT: ACTIONS */}
        <div className="flex items-center gap-5 min-w-[160px] justify-end">
          {user ? (
            <>
              {/* LOGGED IN VIEW */}
              <button 
                onClick={() => setIsUploadOpen(true)}
                className="hidden sm:block text-[10px] font-bold text-[#00F2FF] border border-[#00F2FF]/50 px-4 py-2 rounded uppercase tracking-tighter hover:bg-[#00F2FF] hover:text-black transition-all shadow-[0_0_10px_rgba(0,242,255,0.2)]"
              >
                Upload
              </button>
              <Bell size={20} className="text-white cursor-pointer hover:text-[#00F2FF]" />
              
              <div className="relative">
                <div 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-9 h-9 rounded-full border-2 border-gray-800 flex items-center justify-center cursor-pointer overflow-hidden hover:border-[#00F2FF] transition-colors"
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={18} className="text-white" />
                  )}
                </div>

                {showDropdown && (
                  /* DROPDOWN: Lighter grey #1E293B for depth */
                  <div className="absolute right-0 mt-2 w-48 bg-[#1E293B] border border-gray-800 rounded-xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-700 mb-2">
                      <p className="text-[#FFFFFF] text-xs font-bold">{user?.fullName}</p>
                      <p className="text-blue-200/70 text-[10px]">@{user?.username}</p>
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
            </>
          ) : (
            /* GUEST VIEW - PURE WHITE BUTTONS */
            <div className="flex items-center gap-4">
              <Link 
                to="/login" 
                className="text-white text-xs font-bold uppercase tracking-widest hover:text-[#00F2FF] transition-colors"
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="bg-[#FFFFFF] text-black text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-[#00F2FF] transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </header>

      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </>
  );
}