import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

const VideoPlayer = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/videos/${videoId}`, {
          withCredentials: true
        });
        setVideo(response.data.data);
      } catch (error) {
        console.error("Error loading video", error);
      }
    };
    fetchVideo();
  }, [videoId]);

  if (!video) return (
    <div className="bg-main-bg min-h-screen flex items-center justify-center text-white italic">
      Buffering NexStream...
    </div>
  );

  return (
    <div className="min-h-screen bg-main-bg text-white">
      <Header />
      <div className="max-w-300 mx-auto p-4 lg:p-8">
        {/* THE PLAYER BOX */}
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-card-bg shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <video src={video.videoFile} controls autoPlay className="w-full h-full" />
        </div>

        {/* DETAILS SECTION */}
        <div className="mt-6">
          <h1 className="text-2xl font-bold text-[#FFFFFF]">{video.title}</h1>
          <div className="flex items-center gap-4 mt-4 p-4 bg-card-bg rounded-xl border border-[#2D3748]">
            <img src={video.owner?.avatar} className="w-12 h-12 rounded-full object-cover border border-slate-600" alt="" />
            <div>
              <p className="font-bold text-[#FFFFFF]">{video.owner?.fullName}</p>
              <p className="text-sm text-[#CBD5E1]">@{video.owner?.username}</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-card-bg/50 rounded-xl">
             <p className="text-[#CBD5E1] leading-relaxed">{video.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;