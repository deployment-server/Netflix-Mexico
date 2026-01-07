import React, { useState } from 'react';
import { X, Sparkles, Send, Loader2 } from 'lucide-react';
import { getAIRecommendations } from '../services/geminiService';
import { AIRecommendation, Movie } from '../types';
import MovieCard from './MovieCard';

interface AISearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AISearchModal: React.FC<AISearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Movie[]>([]);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');
    setResults([]);

    try {
      const recommendations: AIRecommendation[] = await getAIRecommendations(query);
      
      // Map AI results to Movie type for the Card component
      const movieResults: Movie[] = recommendations.map((rec, index) => ({
        id: `ai-${index}`,
        title: rec.title,
        description: `${rec.description} -- AI Reason: ${rec.reason}`,
        year: parseInt(rec.year) || 2024,
        genre: [rec.genre],
        // Using random images since we don't have a real movie DB API linked to Gemini results
        imageUrl: `https://picsum.photos/400/600?random=${200 + index}`, 
        matchScore: 95 + index > 100 ? 100 : 95 + index
      }));

      setResults(movieResults);
    } catch (err) {
      setError("Something went wrong. Please check your API key or try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-3xl bg-[#1a1a1a] rounded-xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-700 flex items-center justify-between bg-gradient-to-r from-indigo-900/40 to-purple-900/40">
          <div className="flex items-center gap-3">
             <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
                <Sparkles className="text-white w-6 h-6" />
             </div>
             <div>
                 <h2 className="text-xl font-bold text-white">Gemini Assistant</h2>
                 <p className="text-xs text-gray-400">Ask for recommendations based on your mood, plot, or specific tastes.</p>
             </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
           {results.length === 0 && !isLoading && !error && (
               <div className="text-center text-gray-500 py-12">
                   <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-20" />
                   <p className="text-lg">"I want a sci-fi movie with time travel..."</p>
                   <p>"Something funny like The Office..."</p>
               </div>
           )}

           {isLoading && (
               <div className="flex flex-col items-center justify-center py-12 text-indigo-400">
                   <Loader2 className="w-10 h-10 animate-spin mb-4" />
                   <p className="animate-pulse">Consulting the neural network...</p>
               </div>
           )}

           {error && (
               <div className="bg-red-900/20 border border-red-500/50 text-red-200 p-4 rounded text-center">
                   {error}
               </div>
           )}

           {results.length > 0 && (
               <div className="space-y-4">
                   <h3 className="text-gray-300 font-medium">Top Picks for You</h3>
                   <div className="grid grid-cols-1 gap-4">
                       {results.map((movie) => (
                           <MovieCard key={movie.id} movie={movie} isRecommendation={true} />
                       ))}
                   </div>
               </div>
           )}
        </div>

        {/* Footer Input */}
        <div className="p-4 border-t border-gray-700 bg-[#141414]">
            <form onSubmit={handleSearch} className="relative">
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Describe what you want to watch..."
                    className="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-600 rounded-lg pl-4 pr-12 py-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
                <button 
                    type="submit" 
                    disabled={!query.trim() || isLoading}
                    className="absolute right-3 top-3 p-1 bg-indigo-600 rounded-md text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default AISearchModal;