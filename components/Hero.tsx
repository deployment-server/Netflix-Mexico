import React from 'react';
import { Play, Plus, Info, Check } from 'lucide-react';
import { Movie } from '../types';

interface HeroProps {
  movie: Movie;
  onPlay: () => void;
  onInfo?: () => void;
  onToggleMyList: () => void;
  isInList: boolean;
}

const Hero: React.FC<HeroProps> = ({ movie, onPlay, onInfo, onToggleMyList, isInList }) => {
  return (
    <div className="relative h-[85vh] w-full mb-8 group">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={movie.imageUrl} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-[10s] ease-linear group-hover:scale-105" 
        />
        {/* Gradients for readability and blending with content */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#141414]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute top-[30%] md:top-[40%] left-4 md:left-12 max-w-xl z-10">
        <div className="flex items-center gap-2 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
             <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Series</span>
             <span className="text-gray-300 text-sm font-semibold tracking-widest uppercase">Sci-Fi</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg leading-none animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          {movie.title}
        </h1>
        
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-300 font-medium animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
             <span className="text-green-400 font-bold">99% Match</span>
             <span>{movie.year}</span>
             <span className="border border-gray-500 px-1 text-xs">16+</span>
             <span>{movie.duration}</span>
        </div>

        <p className="text-white text-base md:text-lg mb-8 drop-shadow-md line-clamp-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          {movie.description}
        </p>

        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <button 
            onClick={onPlay}
            className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded hover:bg-opacity-80 transition font-bold text-lg active:scale-95"
          >
            <Play fill="currentColor" size={24} />
            Play Now
          </button>
          
          <button 
            onClick={onToggleMyList}
            className="flex items-center gap-2 bg-gray-500/70 text-white px-6 md:px-8 py-2 md:py-3 rounded hover:bg-gray-500/50 transition font-bold text-lg backdrop-blur-sm active:scale-95"
          >
            {isInList ? <Check size={24} /> : <Plus size={24} />}
            {isInList ? 'My List' : 'My List'}
          </button>

          {onInfo && (
              <button 
                onClick={onInfo}
                className="flex items-center gap-2 bg-gray-500/70 text-white px-6 md:px-8 py-2 md:py-3 rounded hover:bg-gray-500/50 transition font-bold text-lg backdrop-blur-sm active:scale-95"
              >
                <Info size={24} />
                More Info
              </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;