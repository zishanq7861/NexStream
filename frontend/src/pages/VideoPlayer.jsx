import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VideoPlayer = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showLoginMsg, setShowLoginMsg] = useState(false);
  
  // Comment States
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  // Helper for "Time Ago" without needing extra libraries
  const formatTimeAgo = (date) => {
    if (!date) return "just now";
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return hours < 24 ? `${hours}h ago` : `${Math.floor(hours/24)}d ago`;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // 1. Fetch Video
        const response = await axios.get(`http://localhost:8000/api/v1/videos/${videoId}`, { withCredentials: true });
        const videoData = response.data.data;
        setVideo(videoData);

        // 2. Fetch Like Status
        const likeRes = await axios.get(`http://localhost:8000/api/v1/likes/videos`, { withCredentials: true });
        setIsLiked(likeRes.data.data?.some(item => item.video?._id === videoId));

        // 3. Fetch Sub Status
        const subRes = await axios.get(`http://localhost:8000/api/v1/subscriptions/c/${videoData.owner._id}`, { withCredentials: true });
        setIsSubscribed(subRes.data.data?.subscribedByMe || false);

        // 4. Fetch Comments
        const commentRes = await axios.get(`http://localhost:8000/api/v1/comments/${videoId}`);
        setComments(commentRes.data.data.docs || commentRes.data.data);

      } catch (error) {
        console.error("Error loading data", error);
      }
    };
    if (videoId) fetchAllData();
  }, [videoId]);

  const handleLikeToggle = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/likes/toggle/v/${videoId}`, {}, { withCredentials: true });
      setIsLiked(res.data.data.isLiked);
    } catch (err) { alert("Please login to like!"); }
  };

  const handleSubscribeToggle = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/subscriptions/c/${video.owner._id}`, {}, { withCredentials: true });
      setIsSubscribed(res.data.data.subscribed);
    } catch (err) {
      setShowLoginMsg(true);
      setTimeout(() => setShowLoginMsg(false), 3000);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/comments/${videoId}`, { content: commentText }, { withCredentials: true });
      setComments([res.data.data, ...comments]);
      setCommentText("");
    } catch (err) { alert("Please login to comment!"); }
  };

  if (!video) return <div className="h-screen bg-[#0F172A] flex items-center justify-center text-[#00F2FF]">Loading...</div>;

  return (
    <div className="max-w-[1200px] mx-auto p-4 lg:p-8 bg-[#0F172A] min-h-screen text-white">
      {/* 1. THE PLAYER */}
      <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-gray-800 shadow-2xl">
        <video src={video.videoFile} controls autoPlay className="w-full h-full" />
      </div>

      {/* 2. TITLE & VIEWS */}
      <div className="mt-6">
        <h1 className="text-2xl font-bold">{video.title}</h1>
        <p className="text-sm text-gray-400 mt-1">{video.views} views • {new Date(video.createdAt).toLocaleDateString()}</p>
      </div>

      {/* 3. INTERACTION BAR (Owner Info + Like + Sub) */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pb-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <img src={video.owner?.avatar} className="w-12 h-12 rounded-full border border-[#00F2FF]/30" alt="avatar" />
          <div>
            <p className="font-bold">{video.owner?.fullName}</p>
            <p className="text-xs text-[#00F2FF]">@{video.owner?.username}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Like Button */}
          <button onClick={handleLikeToggle} className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs transition-all border ${isLiked ? 'bg-[#00F2FF] text-black border-[#00F2FF]' : 'bg-transparent border-gray-600'}`}>
            {isLiked ? 'Liked' : 'Like'}
          </button>

          {/* Subscribe Button */}
          <div className="relative">
            {showLoginMsg && <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-red-500 text-[10px] px-2 py-1 rounded">Login!</div>}
            <button onClick={handleSubscribeToggle} className={`px-5 py-2 rounded-full font-bold text-xs uppercase border ${isSubscribed ? 'bg-gray-700 text-gray-400 border-transparent' : 'bg-white text-black border-white'}`}>
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>

      {/* 4. DESCRIPTION */}
      <div className="mt-6 p-4 bg-[#1E293B] rounded-xl text-sm text-blue-100/70">
        {video.description}
      </div>

      {/* 5. COMMENTS SECTION */}
      <div className="mt-10">
        <h3 className="text-lg font-bold mb-6">{comments.length} Comments</h3>
        
        <form onSubmit={handleAddComment} className="flex gap-4 mb-8">
          <div className="w-10 h-10 rounded-full bg-gray-800 flex-shrink-0"></div>
          <div className="flex-1">
            <input 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..." 
              className="w-full bg-transparent border-b border-gray-700 focus:border-[#00F2FF] outline-none py-2 text-sm"
            />
            <div className="flex justify-end mt-2">
              <button className="bg-[#00F2FF] text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase">Comment</button>
            </div>
          </div>
        </form>

        <div className="space-y-6">
          {comments.map((c) => (
            <div key={c._id} className="flex gap-4">
              <img src={c.owner?.avatar} className="w-10 h-10 rounded-full object-cover" alt="avatar" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">@{c.owner?.username}</span>
                  <span className="text-[10px] text-gray-500">{formatTimeAgo(c.createdAt)}</span>
                </div>
                <p className="text-sm text-blue-100/80 mt-1">{c.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;