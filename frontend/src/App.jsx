import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Component Imports
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import VideoCard from './components/VideoCard';

// Page Imports
import Login from './pages/Login';
import Signup from './pages/Signup';
import VideoPlayer from './pages/VideoPlayer';

// Context Import
import { AuthProvider } from './context/AuthContext';

/**
 * DASHBOARD COMPONENT
 */
const Dashboard = ({ searchQuery }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/v1/videos', {
          withCredentials: true
        });
        
        // LOG THE DATA: Right-click page -> Inspect -> Console to see this!
        console.log("Backend Raw Response:", response.data);

        // Your backend uses ApiResponse(status, data, message)
        // So videos are in response.data.data
        const fetchedVideos = response.data?.data;

        if (Array.isArray(fetchedVideos)) {
            setVideos(fetchedVideos);
        } else {
            console.error("Data is not an array:", fetchedVideos);
            setVideos([]);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // Filter logic with extra safety
  const filteredVideos = videos.filter(video => {
    const title = video?.title?.toLowerCase() || "";
    const search = (searchQuery || "").toLowerCase();
    return title.includes(search);
  });

  return (
    <main className="flex-1 p-4 md:p-8">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-8 bg-[#00F2FF] rounded-full shadow-[0_0_10px_#00F2FF]"></span>
          Recommended
        </h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[1,2,3,4].map(i => (
               <div key={i} className="aspect-video bg-[#1E293B] animate-pulse rounded-xl" />
             ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-[#1E293B] rounded-2xl border border-dashed border-gray-700">
                <p className="text-blue-200/50 italic">No videos found. Try clearing your search or uploading a video!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 
  
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0F172A] text-white flex flex-col overflow-hidden">
        
        <Header 
          onMenuClick={toggleSidebar} 
          setSearchQuery={setSearchQuery} 
        /> 
        
        <div className="flex flex-1 overflow-hidden relative">
          <Sidebar isOpen={isSidebarOpen} />
          
          <div className="flex-1 overflow-y-auto bg-[#0F172A]">
            <Routes>
              <Route path="/" element={<Dashboard searchQuery={searchQuery} />} />
              <Route path="/video/:videoId" element={<VideoPlayer />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;