import React, { useState } from 'react';
import { Play, ChevronDown, Plus, ThumbsUp } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  isRecommendation?: boolean; // Changes style slightly if it's in the AI modal
  onInfoClick?: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isRecommendation = false, onInfoClick }) => {
  const [isActive, setIsActive] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleMouseEnter = () => {
    // Disable hover effect on mobile devices (screens smaller than 768px)
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    if (isRecommendation) return;
    const timeout = setTimeout(() => {
        setIsActive(true);
    }, 400); // 400ms delay before expanding
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setIsActive(false);
  };

  // If clicked directly without waiting for hover expansion
  const handleClick = () => {
      setIsActive(false); // Ensure expanded state is closed
      if (onInfoClick) {
          onInfoClick(movie);
      }
  };

  return (
    <div 
      className={`relative bg-transparent transition-all duration-300 ${isRecommendation ? 'w-full mb-4 flex gap-4 hover:bg-gray-800 p-2 rounded' : 'w-[110px] md:w-[150px] flex-none mx-0.5'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={!isRecommendation ? handleClick : undefined}
    >
      
      {/* 
         STANDARD CARD (Static State)
         Reduced width to "Make all of them small" as requested.
      */}
      <div className={`rounded overflow-hidden relative shadow-lg cursor-pointer transition-all duration-300 bg-[#141414] ${isRecommendation ? 'w-32 h-20 flex-none rounded-md' : 'aspect-[2/3] w-full'}`}>
        
        {/* Loading Skeleton */}
        {!isImageLoaded && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse z-0" />
        )}

        <img 
          src={movie.imageUrl} 
          alt={movie.title} 
          onLoad={() => setIsImageLoaded(true)}
          decoding="async"
          className={`object-cover w-full h-full rounded transition-all duration-500 ease-in-out ${isImageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
          loading="lazy"
        />

        {!isRecommendation && !isActive && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-2 opacity-0 hover:opacity-100 transition-opacity">
                {/* Minimal Overlay for static card */}
            </div>
        )}
      </div>

      {/* 
         HOVER CARD (Expanded State) 
         Modernized: Scales up from center/origin, shows controls, metadata.
         Width is fixed relative to standard card to ensure consistent pop-out size.
      */}
      {isActive && !isRecommendation && (
        <div 
            className="absolute top-[-40px] left-[-25px] right-[-25px] z-[99] bg-[#141414] rounded-md shadow-2xl scale-110 origin-center animate-in fade-in duration-300 w-[160px] md:w-[200px]"
            style={{ transformOrigin: 'center center' }}
            onClick={(e) => e.stopPropagation()} 
        >
            {/* Image Area */}
            <div className="aspect-video w-full relative rounded-t-md overflow-hidden bg-[#2f2f2f]" onClick={handleClick}>
                 <img 
                    src={movie.imageUrl} 
                    alt={movie.title} 
                    className="w-full h-full object-cover" 
                    loading="eager" // Eager load the hover state image
                 />
                 <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#141414] to-transparent"></div>
                 <div className="absolute bottom-2 left-2 right-2">
                    <span className="text-white text-xs font-bold drop-shadow-md line-clamp-1">{movie.title}</span>
                 </div>
            </div>

            {/* Content Area */}
            <div className="p-3 shadow-lg rounded-b-md bg-[#181818]">
                <div className="flex items-center gap-2 mb-3">
                    <button className="w-6 h-6 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition" onClick={handleClick}>
                        <Play fill="black" size={10} />
                    </button>
                    <button className="w-6 h-6 rounded-full border border-gray-400 hover:border-white text-gray-300 hover:text-white flex items-center justify-center transition">
                        <Plus size={12} />
                    </button>
                    <button className="w-6 h-6 rounded-full border border-gray-400 hover:border-white text-gray-300 hover:text-white flex items-center justify-center transition">
                        <ThumbsUp size={10} />
                    </button>
                    <div className="flex-1"></div>
                    <button 
                        className="w-6 h-6 rounded-full border border-gray-400 hover:border-white text-gray-300 hover:text-white flex items-center justify-center transition"
                        onClick={handleClick}
                    >
                        <ChevronDown size={12} />
                    </button>
                </div>

                <div className="flex items-center gap-2 mb-1">
                    <span className="text-green-400 text-[10px] font-bold">{movie.matchScore}% Match</span>
                    <span className="border border-gray-500 text-gray-400 text-[10px] px-1 rounded-sm uppercase">16+</span>
                    <span className="text-gray-300 text-[10px] font-medium">{movie.duration || '2 Seasons'}</span>
                </div>

                <div className="flex items-center gap-1.5 text-[9px] text-gray-400 font-medium flex-wrap">
                    {movie.genre?.slice(0,3).map((g, i) => (
                        <span key={i} className="flex items-center">
                           {i > 0 && <span className="text-gray-600 mr-1.5">•</span>}
                           {g}
                        </span>
                    ))}
                </div>
            </div>
        </div>
      )}

      {/* Content for AI Recommendation List Style */}
      {isRecommendation && (
        <div className="flex flex-col justify-center flex-grow">
           <h3 className="font-bold text-base text-white mb-1 cursor-pointer hover:underline" onClick={handleClick}>{movie.title}</h3>
           <div className="flex items-center gap-3 mb-2 text-xs text-gray-400">
              <span className="text-green-400 font-bold">{movie.year}</span>
              <span>{movie.genre?.[0]}</span>
           </div>
           <p className="text-xs text-gray-300 line-clamp-2">{movie.description}</p>
        </div>
      )}
    </div>
  );
};

export default MovieCard;