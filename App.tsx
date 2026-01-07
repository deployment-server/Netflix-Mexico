import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Hero from './components/Hero';
import ContentRow from './components/ContentRow';
import AISearchModal from './components/AISearchModal';
import ContentDetailsModal from './components/ContentDetailsModal';
import ManageProfiles from './components/ManageProfiles';
import Account from './components/Account';
import Settings from './components/Settings';
import MyList from './components/MyList';
import NewAndHot from './components/NewAndHot';
import Login from './components/Login';
import Signup from './components/Signup';
import RedeemGiftCard from './components/RedeemGiftCard';
import { HERO_MOVIE, MOCK_CATEGORIES } from './constants';
import { Movie, Profile } from './types';
import { supabase } from './supabaseClient';

function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'signup', 'redeem', 'home', 'profiles', 'account', 'settings', 'mylist', 'new-and-hot'
  const [signupMode, setSignupMode] = useState<'normal' | 'gift'>('normal');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Movie | null>(null);
  const [autoPlayVideo, setAutoPlayVideo] = useState(false);
  
  // Profile State
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  
  // My List State
  const [myList, setMyList] = useState<Movie[]>([]);

  // --- Data Fetching ---

  // Fetch My List whenever the current profile changes
  useEffect(() => {
    const fetchMyList = async () => {
        if (!currentProfile) {
            setMyList([]);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('my_list')
                .select('*')
                .eq('profile_id', currentProfile.id);

            if (data) {
                // Map DB format back to Movie objects
                const movies = data.map((item: any) => item.movie_data);
                setMyList(movies);
            }
        } catch (err) {
            console.error("Failed to fetch list", err);
        }
    };

    fetchMyList();
  }, [currentProfile]);

  // --- Navigation Handler ---
  const handleNavigate = (view: string) => {
    if (view === 'signup') {
        setSignupMode('normal');
    }
    // Logic: If trying to go home but no profile selected, force profiles view
    if (view === 'home' && !currentProfile) {
        setCurrentView('profiles');
        return;
    }
    setCurrentView(view);
  };

  const handleUpdateProfile = (updated: Partial<Profile>) => {
      if (currentProfile) {
          setCurrentProfile({ ...currentProfile, ...updated });
      }
  };

  // --- Auth & Full Screen Views ---
  
  if (currentView === 'login') {
    return <Login onLogin={() => setCurrentView('profiles')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'signup') {
    return <Signup mode={signupMode} onLogin={() => setCurrentView('profiles')} onNavigate={handleNavigate} />;
  }

  if (currentView === 'redeem') {
    return (
        <RedeemGiftCard 
            onNavigate={handleNavigate} 
            onRedeemSuccess={() => {
                setSignupMode('gift');
                setCurrentView('signup');
            }} 
        />
    );
  }

  if (currentView === 'profiles') {
    return (
        <ManageProfiles 
            onSelectProfile={(profile) => {
                setCurrentProfile(profile);
                setCurrentView('home');
            }} 
        />
    );
  }

  if (currentView === 'account') {
    return <Account onNavigateHome={() => setCurrentView('home')} />;
  }

  if (currentView === 'settings') {
    return (
        <Settings 
            currentProfile={currentProfile}
            onUpdateProfile={handleUpdateProfile}
            onNavigateHome={() => setCurrentView('home')} 
        />
    );
  }

  // --- Handlers ---

  const handleMovieClick = (movie: Movie) => {
    setSelectedContent(movie);
    setAutoPlayVideo(false);
  };

  const handleHeroPlay = () => {
    setSelectedContent(HERO_MOVIE);
    setAutoPlayVideo(true);
  };

  const handleHeroInfo = () => {
    setSelectedContent(HERO_MOVIE);
    setAutoPlayVideo(false);
  };

  const handleToggleMyList = async (movie: Movie) => {
    if (!currentProfile) return;

    const exists = myList.find(m => m.id === movie.id);
    
    // Optimistic Update
    if (exists) {
        setMyList(prev => prev.filter(m => m.id !== movie.id));
        // DB Delete
        await supabase
            .from('my_list')
            .delete()
            .eq('profile_id', currentProfile.id)
            .eq('movie_id', String(movie.id));
    } else {
        setMyList(prev => [movie, ...prev]);
        // DB Insert
        await supabase
            .from('my_list')
            .insert({
                profile_id: currentProfile.id,
                movie_id: String(movie.id),
                movie_data: movie
            });
    }
  };

  // Dummy handler for playing from modal
  const handlePlayContent = (movie: Movie) => {
    console.log("Playing content:", movie.title);
  };

  // --- Main App Views ---

  return (
    <div className="relative min-h-screen bg-[#141414] overflow-hidden">
      {/* Navbar Logic: Show on Desktop ALWAYS. Show on Mobile ONLY for 'home' */}
      <div className={`fixed top-0 left-0 right-0 z-50 ${currentView !== 'home' ? 'hidden md:block' : ''}`}>
           <Navbar 
             onOpenAI={() => setIsAIModalOpen(true)} 
             onNavigate={handleNavigate}
             currentProfile={currentProfile}
           />
      </div>
      
      {currentView === 'home' && (
        <main className="pb-24 md:pb-20">
          <Hero 
             movie={HERO_MOVIE} 
             onPlay={handleHeroPlay} 
             onInfo={handleHeroInfo}
             onToggleMyList={() => handleToggleMyList(HERO_MOVIE)}
             isInList={myList.some(m => m.id === HERO_MOVIE.id)}
          />
          
          <div className="relative z-10 -mt-24 space-y-8">
            {MOCK_CATEGORIES.map((category) => (
              <ContentRow 
                key={category.title} 
                title={category.title} 
                movies={category.movies} 
                onMovieClick={handleMovieClick}
              />
            ))}
          </div>
        </main>
      )}

      {currentView === 'new-and-hot' && (
         <NewAndHot />
      )}

      {currentView === 'mylist' && (
        <MyList movies={myList} onRemove={handleToggleMyList} />
      )}

      {/* Show Bottom Nav only for main app screens */}
      {currentView !== 'profiles' && currentView !== 'account' && currentView !== 'settings' && (
        <BottomNav currentView={currentView} onNavigate={handleNavigate} />
      )}

      {currentView === 'home' && (
        <footer className="hidden md:block py-12 px-12 text-center text-gray-500 text-sm bg-[#141414]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
              <span className="hover:underline cursor-pointer">Audio Description</span>
              <span className="hover:underline cursor-pointer">Help Center</span>
              <span className="hover:underline cursor-pointer">Gift Cards</span>
              <span className="hover:underline cursor-pointer">Media Center</span>
              <span className="hover:underline cursor-pointer">Investor Relations</span>
              <span className="hover:underline cursor-pointer">Jobs</span>
              <span className="hover:underline cursor-pointer">Terms of Use</span>
              <span className="hover:underline cursor-pointer">Privacy</span>
          </div>
          <p>&copy; 2024 StreamAI Inc. All rights reserved.</p>
        </footer>
      )}

      <AISearchModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
      />

      <ContentDetailsModal 
        movie={selectedContent} 
        onClose={() => {
            setSelectedContent(null);
            setAutoPlayVideo(false);
        }}
        onPlay={handlePlayContent}
        onMovieClick={handleMovieClick}
        autoPlay={autoPlayVideo}
        isInList={selectedContent ? myList.some(m => m.id === selectedContent.id) : false}
        onToggleList={handleToggleMyList}
      />
    </div>
  );
}

export default App;