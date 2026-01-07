import React from 'react';
import { MOCK_CATEGORIES } from '../constants';
import MovieCard from './MovieCard';
import { Bell, ChevronRight, Download, Menu, Search, Settings, Play } from 'lucide-react';
import { Movie } from '../types';

interface MyListProps {
    movies?: Movie[];
    onRemove?: (movie: Movie) => void;
}

const MyList: React.FC<MyListProps> = ({ movies = [], onRemove }) => {
  // Use passed movies prop, fallback to empty array if undefined
  const myListMovies = movies;
  const watchedTrailers = MOCK_CATEGORIES[0].movies; // Keep mock for trailers section

  return (
    <div className="min-h-screen bg-[#141414] animate-in fade-in duration-500 pb-20">
      
      {/* --- DESKTOP VIEW (Classic Grid) --- */}
      <div className="hidden md:block pt-28 px-12 pb-12">
        <h1 className="text-3xl font-bold text-white mb-6">My List</h1>
        {myListMovies.length === 0 ? (
            <div className="text-gray-500 text-lg flex flex-col items-center justify-center py-20">
                <p>You haven't added any titles to your list yet.</p>
                <p className="text-sm mt-2">Click the (+) icon on any movie to add it here.</p>
            </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-4">
              {myListMovies.map((movie) => (
                <div key={movie.id} className="w-full flex justify-center">
                   <MovieCard movie={movie} />
                </div>
              ))}
            </div>
        )}
      </div>

      {/* --- MOBILE VIEW (My Netflix Hub) --- */}
      <div className="md:hidden bg-black text-white">
          {/* Mobile Header */}
          <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-sm flex items-center justify-between px-4 py-4">
               <h1 className="text-2xl font-bold">My Netflix</h1>
               <div className="flex items-center gap-4">
                   <Search size={24} className="text-white" />
                   <Menu size={24} className="text-white" />
               </div>
          </div>

          <div className="px-4 py-6 text-center flex flex-col items-center border-b border-gray-800">
               <div className="w-20 h-20 rounded bg-blue-600 mb-3 overflow-hidden shadow-lg">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover" />
               </div>
               <div className="flex items-center gap-1 mb-1">
                   <h2 className="text-2xl font-bold">Felix</h2>
                   <ChevronRight size={20} className="text-gray-400" />
               </div>
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-6 space-y-4">
              <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                       <Bell size={20} fill="white" />
                   </div>
                   <div className="flex-1">
                       <div className="font-bold text-base">Notifications</div>
                   </div>
                   <ChevronRight size={20} className="text-gray-500" />
              </div>
              <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                       <Download size={20} />
                   </div>
                   <div className="flex-1">
                       <div className="font-bold text-base">Downloads</div>
                   </div>
                   <ChevronRight size={20} className="text-gray-500" />
              </div>
          </div>

          <div className="h-2 bg-[#222]"></div>

          {/* My List Horizontal Section */}
          <div className="py-6 pl-4">
              <h3 className="text-lg font-bold mb-4">TV Shows & Movies You Liked</h3>
              {myListMovies.length === 0 ? (
                  <p className="text-gray-500 text-sm pr-4">Your list is empty. Add shows to see them here.</p>
              ) : (
                <div className="flex overflow-x-auto gap-3 no-scrollbar pb-4 pr-4">
                    {myListMovies.map((movie) => (
                        <div key={movie.id} className="flex-none w-28">
                            <div className="aspect-[2/3] rounded overflow-hidden mb-2 relative">
                                <img src={movie.imageUrl} className="w-full h-full object-cover" loading="lazy" />
                                <div className="absolute top-1 right-1 bg-black/60 rounded p-0.5">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Netflix_N_Logo_2016.png/64px-Netflix_N_Logo_2016.png" className="w-2 h-4 object-contain" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
              )}
          </div>

          <div className="h-2 bg-[#222]"></div>

          {/* Trailers Section */}
          <div className="py-6 pl-4">
              <h3 className="text-lg font-bold mb-4">Trailers You Watched</h3>
              <div className="flex overflow-x-auto gap-3 no-scrollbar pb-4 pr-4">
                  {watchedTrailers.map((movie) => (
                      <div key={movie.id} className="flex-none w-60">
                          <div className="aspect-video rounded overflow-hidden mb-2 relative group">
                               <img src={movie.imageUrl} className="w-full h-full object-cover" loading="lazy" />
                               <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                   <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white">
                                       <Play size={16} fill="white" />
                                   </div>
                               </div>
                               <div className="absolute bottom-2 left-2 right-2">
                                   <span className="text-xs font-bold text-white drop-shadow-md line-clamp-1">{movie.title}</span>
                               </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};

export default MyList;