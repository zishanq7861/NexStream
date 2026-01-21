import React, { useState, useEffect } from 'react'; // Added useEffect
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import VideoCard from './components/VideoCard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import axios from 'axios'; // Import axios to talk to backend
import VideoPlayer from './pages/VideoPlayer'; // Add this at the top!

const Dashboard = ({ isSidebarOpen, toggleSidebar }) => {
  // 1. Create a state to store the videos from MongoDB
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch the videos when the page loads
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Change this URL if your backend port is different
        const response = await axios.get('http://localhost:8000/api/v1/videos', {
          withCredentials: true
        });
        
        // Save the real videos from backend into our state
        setVideos(response.data.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-main-bg text-white flex flex-col overflow-hidden">
      <Header onMenuClick={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 transition-all duration-300">
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-neon-cyan rounded-full shadow-[0_0_10px_#00F2FF]"></span>
              Recommended
            </h2>
            
            {loading ? (
              <p className="text-gray-400 italic">Connecting to NexStream servers...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                {/* 3. Map over the REAL videos from state instead of mockVideos */}
                {videos.length > 0 ? (
                  videos.map((video) => (
                    <VideoCard key={video._id} video={video} />
                  ))
                ) : (
                  <p className="text-gray-500">No videos found. Start by uploading one!</p>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/video/:videoId" element={<VideoPlayer />} />
      <Route path="/" element={<Dashboard isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;