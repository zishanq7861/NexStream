import React, { useState } from 'react';
import { X, Upload, Film, Image as ImageIcon } from 'lucide-react';
import api from '../utils/axios';

export default function UploadModal({ isOpen, onClose }) {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("description", description);

    try {
      await api.post('/videos', formData);
      alert("Success! Your video is being processed.");
      onClose();
    } catch (error) {
      alert("Upload failed. Check if the file is too large.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-main-bg border border-gray-800 w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold text-white mb-6">Upload Video</h2>

        <form onSubmit={handleUpload} className="space-y-4">
          {/* Title */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Video Title</label>
            <input 
              type="text" 
              className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-neon-cyan outline-none"
              placeholder="Give your video a catchy title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
            <textarea 
              className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white h-24 focus:border-neon-cyan outline-none"
              placeholder="Tell viewers about your video"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Video File Pick */}
            <label className="border-2 border-dashed border-gray-800 rounded-xl p-6 text-center hover:border-neon-cyan cursor-pointer transition-all">
              <Film className="mx-auto mb-2 text-neon-cyan" />
              <p className="text-xs text-gray-400 uppercase">{videoFile ? videoFile.name : 'Select Video File'}</p>
              <input type="file" accept="video/*" className="hidden" onChange={(e) => setVideoFile(e.target.files[0])} required />
            </label>

            {/* Thumbnail Pick */}
            <label className="border-2 border-dashed border-gray-800 rounded-xl p-6 text-center hover:border-neon-cyan cursor-pointer transition-all">
              <ImageIcon className="mx-auto mb-2 text-neon-cyan" />
              <p className="text-xs text-gray-400 uppercase">{thumbnail ? thumbnail.name : 'Select Thumbnail'}</p>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setThumbnail(e.target.files[0])} required />
            </label>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-neon-cyan text-black font-black py-3 rounded-xl uppercase hover:shadow-[0_0_20px_#00F2FF] transition-all disabled:opacity-50"
          >
            {loading ? "Uploading to Cloud..." : "Publish Video"}
          </button>
        </form>
      </div>
    </div>
  );
}