import React from 'react';
import { Home, Flame, Download } from 'lucide-react';

interface BottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-gray-800 z-50 text-gray-500 pb-safe">
      <div className="flex justify-around items-center h-[60px]">
        <button 
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 active:scale-95 transition-transform ${currentView === 'home' ? 'text-white' : ''}`}
        >
          <Home size={24} strokeWidth={currentView === 'home' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        <button 
          onClick={() => onNavigate('new-and-hot')}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 active:scale-95 transition-transform ${currentView === 'new-and-hot' ? 'text-white' : ''}`}
        >
          <Flame size={24} strokeWidth={currentView === 'new-and-hot' ? 2.5 : 2} />
          <span className="text-[10px] font-medium">New & Hot</span>
        </button>

        <button 
          onClick={() => onNavigate('mylist')}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 active:scale-95 transition-transform ${currentView === 'mylist' ? 'text-white' : ''}`}
        >
          <div className="relative">
              <img 
                 src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                 alt="My Netflix" 
                 className={`w-6 h-6 rounded border-2 ${currentView === 'mylist' ? 'border-white opacity-100' : 'border-transparent opacity-50 grayscale'}`} 
              />
          </div>
          <span className={`text-[10px] font-medium ${currentView === 'mylist' ? 'text-white' : ''}`}>My Netflix</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;