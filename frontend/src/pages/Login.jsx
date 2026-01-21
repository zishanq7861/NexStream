import React, { useState } from 'react';
import { Lock, User, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/axios';

export default function Login() {
  const [identifier, setIdentifier] = useState(''); 
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = identifier.includes('@') 
      ? { email: identifier, password } 
      : { username: identifier, password };

    try {
      const response = await api.post('/users/login', payload);
      
      if (response.data.success) {
        // Friendly success logic
        navigate('/');
      }
    } catch (error) {
      // Simple error message for the user
      alert(error.response?.data?.message || "Oops! Wrong username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-cyan/10 rounded-full blur-[120px]" />
      
      <div className="w-full max-w-md z-10">
        <div className="flex flex-col items-center mb-8 text-center">
          <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">
            NEX<span className="text-neon-cyan drop-shadow-[0_0_8px_#00F2FF]">STREAM</span>
          </h1>
          {/* Simple subtitle */}
          <p className="text-gray-500 text-[10px] font-bold tracking-[0.2em] mt-2 uppercase">Welcome Back</p>
        </div>

        {/* Card using your requested #0F172A color */}
        <div className="bg-main-bg/80 backdrop-blur-xl border border-gray-800 p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Username or Email</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-neon-cyan transition-colors" size={18} />
                <input 
                  type="text" 
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-neon-cyan transition-all"
                  placeholder="Enter your username or email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              {/* FRIENDLY: Password */}
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-neon-cyan transition-colors" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-neon-cyan transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-transparent border-2 border-neon-cyan text-neon-cyan font-black py-3 rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_20px_#00F2FF] transition-all group disabled:opacity-50"
            >
              {/* FRIENDLY: Sign In */}
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-xs">
              {/* FRIENDLY: Create an account */}
              New to NexStream? <Link to="/signup" className="text-neon-cyan hover:underline font-bold uppercase tracking-widest">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}