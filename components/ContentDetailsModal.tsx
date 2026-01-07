import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Play, Plus, ThumbsUp, Volume2, VolumeX, ChevronDown, SkipForward, ArrowLeft, Check } from 'lucide-react';
import { Movie, Episode } from '../types';
import { MOCK_CATEGORIES } from '../constants';

interface ContentDetailsModalProps {
  movie: Movie | null;
  onClose: () => void;
  onPlay: (movie: Movie) => void;
  onMovieClick?: (movie: Movie) => void;
  autoPlay?: boolean;
  isInList?: boolean;
  onToggleList?: (movie: Movie) => void;
}

const ContentDetailsModal: React.FC<ContentDetailsModalProps> = ({ 
    movie, 
    onClose, 
    onPlay, 
    onMovieClick, 
    autoPlay = false,
    isInList = false,
    onToggleList
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingEpisodeId, setPlayingEpisodeId] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Helper to determine if content is a series based on duration text (e.g. "2 Seasons")
  const isSeries = movie ? (movie.duration?.toLowerCase().includes('season') || false) : false;

  useEffect(() => {
    if (movie) {
        setIsPlaying(autoPlay); // Start playing if autoPlay is requested
        setPlayingEpisodeId(null);
        
        // Mocking Episodes Data based on the movie
        const mockEpisodes: Episode[] = Array.from({ length: 8 }).map((_, i) => ({
            id: i + 1,
            title: `Episode ${i + 1}`,
            description: `Something dramatic happens in this chapter of ${movie.title}. The stakes are higher than ever before as characters face new challenges.`,
            duration: `${45 + (i % 10)}m`,
            thumbnail: movie.imageUrl
        }));
        setEpisodes(mockEpisodes);

        // Mocking "More Like This" using existing data
        const allMovies = MOCK_CATEGORIES.flatMap(c => c.movies);
        const shuffled = [...allMovies]
            .filter(m => m.id !== movie.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 9);
        setSimilarMovies(shuffled);
    }
  }, [movie, autoPlay]);

  // Handle Mute/Unmute for HTML5 video
  useEffect(() => {
      if (videoRef.current) {
          videoRef.current.muted = isMuted;
      }
  }, [isMuted]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (movie) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [movie]);

  if (!movie) return null;

  const handlePlayClick = () => {
    setIsPlaying(true);
    setPlayingEpisodeId(null); // Playing main movie/series start
  };

  const handlePlayEpisode = (episodeId: number) => {
    setPlayingEpisodeId(episodeId);
    setIsPlaying(true);
    // Scroll to top to see player
    if (modalRef.current) {
        modalRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handleSimilarClick = (m: Movie) => {
      if (modalRef.current) modalRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      if (onMovieClick) {
          onMovieClick(m);
      }
  };

  const videoSrc = movie.trailerUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const isYoutube = videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be');
  
  // Construct YouTube Embed URL
  let finalYoutubeUrl = videoSrc;
  if (isYoutube) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = videoSrc.match(regExp);
      const videoId = (match && match[2].length === 11) ? match[2] : null;

      if (videoId) {
           finalYoutubeUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&playsinline=1&modestbranding=1`;
      }
  }

  const modalContent = (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/70 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}>
      <div 
        ref={modalRef}
        className="modal-container relative w-full max-w-[850px] mx-auto mt-0 md:mt-12 mb-0 md:mb-8 bg-[#181818] rounded-none md:rounded-lg shadow-2xl overflow-hidden cursor-default min-h-screen md:min-h-0 text-white"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Close Button */}
        {!isPlaying && (
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-9 h-9 bg-[#181818] rounded-full flex items-center justify-center hover:bg-white hover:text-black transition text-white border border-transparent hover:border-black"
            >
                <X size={20} />
            </button>
        )}

        {/* Hero Section / Video Player */}
        <div className="relative aspect-video w-full bg-black group-player">
            {isPlaying ? (
                <div className="absolute inset-0 bg-black flex items-center justify-center group/video">
                    {/* Video Player Implementation */}
                    {isYoutube ? (
                         <iframe 
                            src={finalYoutubeUrl}
                            className="w-full h-full object-cover"
                            title={movie.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                         />
                    ) : (
                        <video 
                            ref={videoRef}
                            src={videoSrc}
                            className="w-full h-full object-contain"
                            controls
                            autoPlay
                        />
                    )}
                    
                    {/* Overlay Title if playing episode */}
                    {playingEpisodeId && (
                         <div className="absolute top-4 left-14 bg-black/60 px-3 py-1 rounded text-sm font-bold text-white z-20 pointer-events-none">
                             Playing: Episode {playingEpisodeId}
                         </div>
                    )}

                    {/* Back Button Overlay */}
                    <button 
                        onClick={() => setIsPlaying(false)}
                        className="absolute top-4 left-4 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition z-30 opacity-0 group-hover/video:opacity-100"
                    >
                        <ArrowLeft size={24} />
                    </button>
                </div>
            ) : (
                <>
                    <div className="absolute inset-0">
                        <img src={movie.imageUrl} alt={movie.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
                    </div>

                    <div className="absolute bottom-[5%] left-4 md:left-12 w-[95%] md:w-[60%]">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg leading-tight">{movie.title}</h1>
                        
                        <div className="flex items-center gap-3 mb-6 flex-wrap">
                            <button 
                                onClick={handlePlayClick}
                                className="bg-white text-black px-6 md:px-8 py-2 rounded font-bold flex items-center gap-2 hover:bg-gray-200 transition"
                            >
                                <Play fill="currentColor" size={24} />
                                <span>Play</span>
                            </button>

                            {!isSeries && (
                                <button 
                                    onClick={handlePlayClick}
                                    className="bg-gray-500/40 text-white border border-gray-400/50 px-6 py-2 rounded font-bold flex items-center gap-2 hover:bg-gray-500/60 transition backdrop-blur-sm"
                                >
                                    <Play size={24} />
                                    <span>Trailer</span>
                                </button>
                            )}

                            <button 
                                onClick={() => onToggleList && onToggleList(movie)}
                                className="w-10 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-300 hover:border-white hover:text-white transition bg-[#2a2a2a]/60"
                                title={isInList ? "Remove from My List" : "Add to My List"}
                            >
                                {isInList ? <Check size={20} /> : <Plus size={20} />}
                            </button>
                            
                            <button className="w-10 h-10 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-300 hover:border-white hover:text-white transition bg-[#2a2a2a]/60">
                                <ThumbsUp size={18} />
                            </button>
                            <div className="flex-1 md:flex-none"></div>
                            <button 
                                onClick={() => setIsMuted(!isMuted)}
                                className="w-10 h-10 border border-gray-500/50 rounded-full flex items-center justify-center text-gray-300 hover:border-white hover:text-white transition bg-[#2a2a2a]/60 ml-auto md:ml-0"
                            >
                                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>

        {/* Details Body */}
        <div className="px-4 md:px-12 py-4 bg-[#181818]">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column: Meta & Desc */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-6 flex-wrap text-sm md:text-base">
                        <span className="text-green-400 font-bold">{movie.matchScore || '95'}% Match</span>
                        <span className="text-gray-300">{movie.year || '2023'}</span>
                        <span className="border border-gray-500 px-1.5 text-xs text-gray-300">16+</span>
                        <span className="text-gray-300">{movie.duration || '2 Seasons'}</span>
                        <span className="border border-gray-500 rounded px-1 text-[10px] text-gray-300">HD</span>
                    </div>
                    <p className="text-white text-base leading-relaxed mb-6">
                        {movie.description}
                    </p>
                </div>

                {/* Right Column: Cast & Genres */}
                <div className="w-full md:w-[250px] flex-none text-sm space-y-3">
                    <div className="text-gray-400">
                        <span className="text-gray-500">Cast: </span>
                        {movie.cast ? movie.cast.join(', ') : 'Pedro Pascal, Bella Ramsey, Anna Torv'}
                    </div>
                    <div className="text-gray-400">
                        <span className="text-gray-500">Genres: </span>
                        {movie.genre?.join(', ')}
                    </div>
                    <div className="text-gray-400">
                        <span className="text-gray-500">This show is: </span>
                        {movie.tags ? movie.tags.join(', ') : 'Ominous, Exciting, Sci-Fi TV'}
                    </div>
                </div>
            </div>

            {/* Episodes Section - Only for Series */}
            {isSeries && (
                <div className="mt-12">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-white">Episodes</h3>
                        <div className="text-lg text-gray-400 font-medium">Season 1</div>
                    </div>

                    <div className="space-y-4">
                        {episodes.map((ep) => (
                            <div 
                                key={ep.id} 
                                onClick={() => handlePlayEpisode(ep.id)}
                                className="group flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg hover:bg-[#333] border-b border-gray-800 md:border-none cursor-pointer transition-colors"
                            >
                                <div className="text-xl text-gray-400 font-medium w-6 flex-none">{ep.id}</div>
                                
                                {/* Thumbnail */}
                                <div className="relative w-full md:w-40 aspect-video rounded overflow-hidden flex-none bg-gray-800">
                                    <img src={ep.thumbnail} alt={ep.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                        <div className="w-8 h-8 rounded-full bg-white/20 border border-white flex items-center justify-center backdrop-blur-sm">
                                            <Play fill="white" size={12} className="text-white ml-0.5" />
                                        </div>
                                    </div>
                                    {/* Progress Bar Mock */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                                        <div className="h-full bg-red-600" style={{ width: `${Math.random() * 80}%` }}></div>
                                    </div>
                                </div>

                                {/* Text Info */}
                                <div className="flex-1 w-full">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-white font-bold text-base">{ep.title}</h4>
                                        <span className="text-gray-400 text-sm">{ep.duration}</span>
                                    </div>
                                    <p className="text-gray-400 text-xs md:text-sm line-clamp-2 md:line-clamp-3">
                                        {ep.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Show More Button */}
                    <div className="w-full h-[1px] bg-gray-700 mt-8 mb-8 relative">
                        <div className="absolute left-1/2 -translate-x-1/2 -top-4">
                             <button className="w-8 h-8 rounded-full border border-gray-500 bg-[#181818] flex items-center justify-center hover:border-white transition">
                                 <ChevronDown size={20} className="text-white" />
                             </button>
                        </div>
                    </div>
                </div>
            )}

            {/* More Like This */}
            <div className="mt-8 pb-12">
                <h3 className="text-2xl font-bold text-white mb-6">More Like This</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {similarMovies.map(m => (
                        <div 
                           key={m.id} 
                           onClick={() => handleSimilarClick(m)}
                           className="bg-[#2f2f2f] rounded overflow-hidden cursor-pointer hover:bg-[#3f3f3f] transition group"
                        >
                            <div className="relative aspect-video bg-gray-800">
                                <span className="absolute top-2 right-2 text-[10px] font-bold text-white bg-black/60 px-1 rounded backdrop-blur-sm z-10">{m.duration || '2h 15m'}</span>
                                <img src={m.imageUrl} alt={m.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/30">
                                    <div className="w-10 h-10 rounded-full bg-white/20 border border-white flex items-center justify-center backdrop-blur-sm">
                                        <Play fill="white" size={16} />
                                    </div>
                                </div>
                            </div>
                            <div className="p-3">
                                <div className="flex items-center justify-between mb-2">
                                     <span className="text-green-400 text-sm font-bold">{m.matchScore}% Match</span>
                                     <div className="border border-gray-500 text-gray-400 text-[10px] px-1 rounded uppercase">HD</div>
                                </div>
                                <h4 className="text-white text-sm font-bold line-clamp-1 mb-2">{m.title}</h4>
                                <p className="text-gray-400 text-xs line-clamp-3">
                                    {m.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ContentDetailsModal;