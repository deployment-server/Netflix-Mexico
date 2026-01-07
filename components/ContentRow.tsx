import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface ContentRowProps {
  title: string;
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

const ContentRow: React.FC<ContentRowProps> = ({ title, movies, onMovieClick }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: 'left' | 'right') => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
      
      if (direction === 'left' && scrollTo <= 0) {
          setIsMoved(false);
      }
    }
  };

  return (
    <div className="mb-8 pl-4 md:pl-12 group/row relative z-10">
      
      {/* Enhanced Title Section */}
      <h2 className="flex items-end gap-1 text-base md:text-xl font-bold text-[#e5e5e5] mb-2 cursor-pointer w-fit transition-colors duration-300 group-hover/row:text-white">
        {title}
        <div className="flex items-center text-[#54b9c5] text-xs font-bold opacity-0 -translate-x-4 group-hover/row:opacity-100 group-hover/row:translate-x-0 transition-all duration-500 ease-out ml-2 mb-[3px] tracking-wide">
          <span className="hidden md:inline">Explore All</span>
          <span className="md:hidden">View</span>
          <ChevronRight className="w-3 h-3 ml-1 transition-transform duration-300 group-hover/row:translate-x-1" strokeWidth={3} />
        </div>
      </h2>

      <div className="relative group">
        {/* Navigation Arrows - Full Height Hover Area Style */}
        <div 
          className={`absolute top-0 bottom-0 left-0 z-40 w-12 bg-black/50 cursor-pointer hidden md:flex items-center justify-center opacity-0 hover:bg-black/70 group-hover:opacity-100 transition-all duration-300 rounded-r-md ${!isMoved && 'hidden'}`}
          onClick={() => handleClick('left')}
        >
            <ChevronLeft className="w-8 h-8 text-white transition-transform hover:scale-125" />
        </div>

        {/* 
            Row Container
            Adjusted padding: py-4 is sufficient for the scale-up effect of smaller cards.
            Added gap-1.5 for dense packing.
        */}
        <div 
          ref={rowRef}
          className="flex items-center gap-1.5 overflow-x-scroll overflow-y-visible no-scrollbar py-4 px-0 scroll-smooth"
        >
          {movies.map((movie) => (
            <MovieCard 
                key={movie.id} 
                movie={movie} 
                onInfoClick={onMovieClick}
            />
          ))}
        </div>

        <div 
           className="absolute top-0 bottom-0 right-0 z-40 w-12 bg-black/50 cursor-pointer hidden md:flex items-center justify-center opacity-0 hover:bg-black/70 group-hover:opacity-100 transition-all duration-300 rounded-l-md"
           onClick={() => handleClick('right')}
        >
            <ChevronRight className="w-8 h-8 text-white transition-transform hover:scale-125" />
        </div>
      </div>
    </div>
  );
};

export default ContentRow;