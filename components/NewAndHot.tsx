import React, { useState } from 'react';
import { Bell, Info, Play, Share2, Search, Cast } from 'lucide-react';

const MOCK_UPCOMING = [
  {
    id: 1,
    title: "Stranger Things 5",
    month: "NOV",
    day: "06",
    description: "The beginning of the end. The Hawkins gang faces their biggest threat yet as the Upside Down bleeds into reality.",
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/24520.jpg",
    tags: ["Ominous", "Sci-Fi", "Teen"],
    logo: "Stranger Things"
  },
  {
    id: 2,
    title: "Squid Game: The Challenge",
    month: "NOV",
    day: "15",
    description: "456 players. $4.56 million. One winner. The global phenomenon comes to life in this high-stakes reality competition.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUK0bXq-Yf3MvY-fYiXcgxf8c-LiwQ1zWrR8snJ3mXoZsOkPvf&s",
    tags: ["Reality TV", "Competition", "Suspenseful"],
    logo: "Squid Game"
  },
  {
    id: 3,
    title: "One Piece: New Arc",
    month: "DEC",
    day: "01",
    description: "The Straw Hat Pirates embark on a new adventure in the mysterious Egghead Island. Future tech meets ancient history.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6wHb9QRmbb7aeWvOTCrotM28ZDwtYcFZLh9sjudjmJG1O_DS6&s",
    tags: ["Anime", "Action", "Adventure"],
    logo: "One Piece"
  }
];

const NewAndHot: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'coming_soon' | 'everyone_watching'>('coming_soon');

  return (
    <div className="min-h-screen bg-black text-white pb-24 md:pb-0">
      {/* Mobile Header */}
      <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-4 md:hidden">
            <h1 className="text-2xl font-bold">New & Hot</h1>
            <div className="flex items-center gap-4">
                <Cast size={24} className="text-white" />
                <Search size={24} className="text-white" />
            </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 px-4 py-3 overflow-x-auto no-scrollbar border-b border-gray-800 md:px-12">
            <button 
                onClick={() => setActiveTab('coming_soon')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'coming_soon' ? 'bg-white text-black' : 'bg-transparent text-white border border-gray-600'}`}
            >
                🍿 Coming Soon
            </button>
            <button 
                onClick={() => setActiveTab('everyone_watching')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'everyone_watching' ? 'bg-white text-black' : 'bg-transparent text-white border border-gray-600'}`}
            >
                🔥 Everyone's Watching
            </button>
        </div>
      </div>

      {/* Content Feed */}
      <div className="max-w-2xl mx-auto pt-6">
        {MOCK_UPCOMING.map((item) => (
            <div key={item.id} className="flex gap-4 px-4 mb-8">
                {/* Date Column */}
                <div className="flex flex-col w-12 flex-none pt-2">
                    <span className="text-gray-400 text-sm font-bold uppercase">{item.month}</span>
                    <span className="text-white text-3xl font-bold tracking-tighter">{item.day}</span>
                </div>

                {/* Content Column */}
                <div className="flex-1">
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-gray-800">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center">
                             {/* Fake Play Button for Trailer */}
                             <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white flex items-center justify-center">
                                 <Play size={20} fill="white" className="ml-1" />
                             </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            1m 24s
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                         <h3 className="text-2xl font-bold text-gray-200 w-2/3 leading-tight">{item.title}</h3>
                         <div className="flex flex-col items-center gap-1 cursor-pointer group">
                             <Bell size={24} className="text-white group-hover:text-red-600 transition" />
                             <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Remind Me</span>
                         </div>
                         <div className="flex flex-col items-center gap-1 cursor-pointer group">
                             <Share2 size={24} className="text-white group-hover:text-blue-500 transition" />
                             <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Share</span>
                         </div>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        {item.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 text-xs font-bold text-white">
                        {item.tags.map(tag => (
                            <span key={tag} className="flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        ))}
        
        {/* Footer Filler */}
        <div className="flex items-center justify-center py-8 text-gray-600 text-sm font-bold tracking-widest">
            That's all for now
        </div>
      </div>
    </div>
  );
};

export default NewAndHot;