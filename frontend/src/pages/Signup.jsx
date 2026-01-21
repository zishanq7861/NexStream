import React, { useState } from 'react';
import { Lock, User, Mail, UserPlus, Upload, Image as ImageIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/axios';

export default function Signup() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: ''
  });
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("avatar", avatar);
    if (coverImage) data.append("coverImage", coverImage);

    try {
      const response = await api.post('/users/register', data);
      // FRIENDLY MESSAGE:
      alert("Account created! You're all set to sign in.")
      navigate('/login');
    } catch (error) {
      // SAFE ERROR CHECK:
      alert(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-cyan/10 rounded-full blur-[120px]" />
      
      <div className="w-full max-w-xl z-10">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">
            NEX<span className="text-neon-cyan">STREAM</span>
          </h1>
          {/* FRIENDLY: Create your account */}
          <p className="text-gray-500 text-[10px] font-bold tracking-[0.2em] mt-2 uppercase">Create your account</p>
        </div>

        <div className="bg-main-bg/80 backdrop-blur-xl border border-gray-800 p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-neon-cyan transition-all" 
                  placeholder="John Doe" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Username</label>
                <input 
                  type="text" 
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-neon-cyan transition-all" 
                  placeholder="johndoe" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-neon-cyan transition-all" 
                  placeholder="john@example.com" 
                  required 
                />
              </div>
              <div className="space-y-2">
                {/* FRIENDLY: Create a Password */}
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Create a Password</label>
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-neon-cyan transition-all" 
                  placeholder="••••••••" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Profile Photo</label>
                <label className="border-2 border-dashed border-gray-800 rounded-xl p-4 text-center hover:border-neon-cyan transition-colors cursor-pointer group block">
                  <Upload className={`mx-auto mb-2 ${avatar ? 'text-neon-cyan' : 'text-gray-600'}`} />
                  <p className="text-[10px] text-gray-500 uppercase">{avatar ? avatar.name : 'Select Photo'}</p>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => setAvatar(e.target.files[0])}
                    required 
                  />
                </label>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Cover Image</label>
                <label className="border-2 border-dashed border-gray-800 rounded-xl p-4 text-center hover:border-neon-cyan transition-colors cursor-pointer group block">
                  <ImageIcon className={`mx-auto mb-2 ${coverImage ? 'text-neon-cyan' : 'text-gray-600'}`} />
                  <p className="text-[10px] text-gray-500 uppercase">{coverImage ? coverImage.name : 'Select Cover'}</p>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => setCoverImage(e.target.files[0])}
                  />
                </label>
              </div>
            </div>

            <button 
              disabled={loading}
              className="md:col-span-2 w-full bg-neon-cyan text-black font-black py-3 rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-[0_0_20px_#00F2FF] transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* FRIENDLY: Sign Up */}
              {loading ? "Creating Account..." : <><UserPlus size={18} /> Sign Up</>}
            </button>
          </form>

          {/* FRIENDLY: Already have an account? Sign in here */}
          <p className="mt-6 text-center text-gray-500 text-xs">
            Already have an account? <Link to="/login" className="text-neon-cyan hover:underline">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}