import React, { useEffect, useState, useRef } from 'react';
import { Search, Bell, Sparkles, ChevronDown, User, Settings } from 'lucide-react';
import { Profile } from '../types';

interface NavbarProps {
  onOpenAI: () => void;
  onNavigate: (view: string) => void;
  currentProfile: Profile | null;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenAI, onNavigate, currentProfile }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  const avatarUrl = currentProfile?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix";

  return (
    <nav className={`fixed w-full z-50 transition-colors duration-500 ${isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center justify-between px-4 md:px-12 py-4 h-[68px]">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => onNavigate('home')}>
            <span className="text-[#E50914] text-2xl md:text-4xl font-bold tracking-tighter">NETFLIX</span>
            <span className="text-xl md:text-3xl font-bold bg-gradient-to-r from-[#006847] via-white to-[#CE1126] text-transparent bg-clip-text drop-shadow-sm">MEXICO</span>
          </div>
          
          {/* Desktop Links */}
          <ul className="hidden lg:flex gap-5 text-sm text-gray-200 font-medium">
            <li onClick={() => onNavigate('home')} className="hover:text-gray-300 cursor-pointer transition">Home</li>
            <li onClick={() => onNavigate('home')} className="hover:text-gray-300 cursor-pointer transition">TV Shows</li>
            <li onClick={() => onNavigate('home')} className="hover:text-gray-300 cursor-pointer transition">Movies</li>
            <li onClick={() => onNavigate('home')} className="hover:text-gray-300 cursor-pointer transition">New & Popular</li>
            <li onClick={() => onNavigate('mylist')} className="hover:text-gray-300 cursor-pointer transition">My List</li>
          </ul>
        </div>

        <div className="flex items-center gap-6 text-white font-normal">
          <button 
            onClick={onOpenAI}
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-3 py-1 rounded text-xs font-bold transition-all shadow-lg hover:shadow-purple-500/30 group"
          >
            <Sparkles size={14} className="text-yellow-200 group-hover:rotate-12 transition-transform" />
            <span>AI PICK</span>
          </button>

          {/* Search Bar Dropdown (Expandable) */}
          <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'border border-white bg-black/80 px-2 py-1' : ''}`}>
             <Search 
                className="w-6 h-6 cursor-pointer hover:text-gray-300 transition" 
                onClick={toggleSearch} 
             />
             <input
                ref={searchInputRef}
                className={`bg-transparent border-none outline-none text-white text-sm ml-2 transition-all duration-300 placeholder-gray-400 ${isSearchOpen ? 'w-48 md:w-60 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}
                placeholder="Titles, people, genres"
                onBlur={() => {
                   if (!searchInputRef.current?.value) setIsSearchOpen(false);
                }}
             />
          </div>

          {/* Notification Dropdown */}
          <div className="relative group">
             <Bell 
                className="w-6 h-6 cursor-pointer hover:text-gray-300 transition" 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} 
             />
             {isNotificationsOpen && (
                 <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsNotificationsOpen(false)}></div>
                    <div className="absolute right-0 top-full mt-4 w-80 bg-black/90 border-t-2 border-white text-white shadow-2xl z-20 cursor-default">
                        <div className="flex flex-col max-h-96 overflow-y-auto">
                            {[1, 2, 3, 4].map((_, i) => (
                              <div key={i} className="flex gap-4 p-4 hover:bg-gray-800 border-b border-gray-800/50 transition cursor-pointer">
                                  <div className="w-24 h-14 rounded overflow-hidden flex-none bg-gray-700">
                                      <img src={`https://picsum.photos/100/60?random=${100 + i}`} className="w-full h-full object-cover" alt="thumbnail" />
                                  </div>
                                  <div className="flex-1">
                                      <div className="text-gray-200 text-sm font-bold mb-1">New Arrival</div>
                                      <div className="text-gray-400 text-xs">Season {i + 1} is now available.</div>
                                      <div className="text-gray-500 text-[10px] mt-1">Today</div>
                                  </div>
                              </div>
                            ))}
                        </div>
                    </div>
                 </>
             )}
          </div>
          
          {/* Profile Dropdown */}
          <div className="group relative flex items-center gap-2 cursor-pointer z-20">
             <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center overflow-hidden">
                <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover bg-gray-800" />
             </div>
             <ChevronDown size={14} className={`group-hover:rotate-180 transition-transform duration-300`} />
             
             {/* Dropdown Triangle */}
             <div className="absolute right-2 top-[35px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"></div>

             {/* Dropdown Menu */}
             <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="w-48 bg-black/95 border border-gray-700 text-white shadow-xl text-sm py-2">
                    <div className="flex flex-col">
                        <div 
                          onClick={() => onNavigate('profiles')}
                          className="flex items-center gap-3 px-3 py-2 hover:underline cursor-pointer hover:text-gray-200"
                        >
                            <User size={16} className="text-gray-400" />
                            <span>Manage Profiles</span>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-700 my-2"></div>
                    
                    <div className="flex flex-col">
                         <span onClick={() => onNavigate('account')} className="px-3 py-2 hover:underline cursor-pointer hover:text-gray-200">Account</span>
                         <span onClick={() => onNavigate('settings')} className="px-3 py-2 hover:underline cursor-pointer hover:text-gray-200">Settings</span>
                         <span className="px-3 py-2 hover:underline cursor-pointer hover:text-gray-200">Help Center</span>
                         <span onClick={() => onNavigate('mylist')} className="px-3 py-2 hover:underline cursor-pointer hover:text-gray-200">My List</span>
                    </div>

                    <div className="border-t border-gray-700 my-2"></div>
                    
                    <div className="px-3 py-2 text-center">
                         <span onClick={() => onNavigate('login')} className="hover:underline cursor-pointer hover:text-gray-200">Sign out of Netflix</span>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
