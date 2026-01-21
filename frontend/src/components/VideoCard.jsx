import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link

export default function VideoCard({ video }) {
  return (
    // 2. Wrap everything in a Link to the video's unique ID
    <Link to={`/video/${video?._id}`} className="block group">
      <div className="cursor-pointer">
        
        {/* Thumbnail Container */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800 mb-3 border border-gray-800 shadow-lg">
          <img 
            src={video?.thumbnail} 
            alt={video?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            {video?.duration ? Math.floor(video.duration) + "s" : "00:00"}
          </span>
        </div>

        {/* Info Section */}
        <div className="flex gap-3">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-slate-700 shrink-0 overflow-hidden border border-gray-700">
            {video?.owner?.avatar ? (
              <img src={video.owner.avatar} className="w-full h-full object-cover" alt="avatar" />
            ) : (
              <div className="w-full h-full bg-slate-600" />
            )}
          </div>

          <div>
            {/* Title - Pure White */}
            <h3 className="text-sm font-bold text-[#FFFFFF] line-clamp-2 leading-tight group-hover:text-neon-cyan transition-colors">
              {video?.title || "Untitled Video"}
            </h3>
            
            {/* Uploader - Light Blue-Grey */}
            <p className="text-xs text-[#CBD5E1] mt-1 hover:text-white transition-colors">
              {video?.owner?.fullName || "Anonymous Creator"}
            </p>
            
            {/* Metadata - Light Blue-Grey */}
            <p className="text-[10px] text-description-text">
              {video?.views || 0} views • {new Date(video?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}