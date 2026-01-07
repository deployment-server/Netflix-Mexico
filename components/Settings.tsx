import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Profile } from '../types';
import { supabase } from '../supabaseClient';

interface SettingsProps {
  onNavigateHome: () => void;
  currentProfile: Profile | null;
  onUpdateProfile: (profile: Partial<Profile>) => void;
}

const Settings: React.FC<SettingsProps> = ({ onNavigateHome, currentProfile, onUpdateProfile }) => {
  const [dataUsage, setDataUsage] = useState('auto');
  const [autoplayNext, setAutoplayNext] = useState(true);
  const [autoplayPreviews, setAutoplayPreviews] = useState(true);

  // Subtitle State
  const [subFont, setSubFont] = useState('Block');
  const [subColor, setSubColor] = useState('white');
  const [subSize, setSubSize] = useState('text-xl');
  const [subShadow, setSubShadow] = useState('drop-shadow-md');
  const [subBackground, setSubBackground] = useState('transparent');
  
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (currentProfile) {
        setAutoplayNext(currentProfile.autoplayNext);
        setAutoplayPreviews(currentProfile.autoplayPreviews);
        if (currentProfile.dataUsage) setDataUsage(currentProfile.dataUsage);
        
        if (currentProfile.subtitleSettings) {
            setSubFont(currentProfile.subtitleSettings.font);
            setSubColor(currentProfile.subtitleSettings.color);
            setSubSize(currentProfile.subtitleSettings.size);
            setSubShadow(currentProfile.subtitleSettings.shadow);
            setSubBackground(currentProfile.subtitleSettings.background);
        }
    }
  }, [currentProfile]);

  const handleSave = async () => {
    if (!currentProfile) return;
    setIsSaving(true);

    const updatedSettings = {
        autoplay_next: autoplayNext,
        autoplay_previews: autoplayPreviews,
        data_usage: dataUsage,
        subtitle_settings: {
            font: subFont,
            color: subColor,
            size: subSize,
            shadow: subShadow,
            background: subBackground
        }
    };

    try {
        const { error } = await supabase
            .from('profiles')
            .update(updatedSettings)
            .eq('id', currentProfile.id);

        if (!error) {
            // Update local state in App
            onUpdateProfile({
                autoplayNext: autoplayNext,
                autoplayPreviews: autoplayPreviews,
                dataUsage: dataUsage,
                subtitleSettings: updatedSettings.subtitle_settings
            });
            onNavigateHome();
        }
    } catch (err) {
        console.error("Failed to save settings", err);
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-[#333] font-sans animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#141414] h-[68px] flex items-center justify-between px-4 md:px-12 border-b border-gray-800 sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onNavigateHome}>
          <span className="text-[#E50914] text-3xl font-bold tracking-tighter">NETFLIX</span>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={onNavigateHome} className="text-white hover:underline text-sm font-bold">Back to Netflix</button>
           <div className="w-8 h-8 rounded bg-blue-600 overflow-hidden cursor-pointer" onClick={onNavigateHome}>
             <img src={currentProfile?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} alt="Profile" className="w-full h-full object-cover" />
           </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4 pb-20">
        <h1 className="text-3xl font-normal mb-6 border-b border-gray-300 pb-2">Settings for {currentProfile?.name}</h1>

        {/* Playback Settings */}
        <section className="bg-white p-6 rounded shadow-sm mb-8 border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Playback Controls</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
             <div>
                 <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">Data Usage per Screen</h3>
                 <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            name="data" 
                            checked={dataUsage === 'auto'} 
                            onChange={() => setDataUsage('auto')}
                            className="w-5 h-5 accent-black cursor-pointer"
                        />
                        <div>
                            <span className="block font-medium text-gray-800">Auto</span>
                            <span className="block text-xs text-gray-500">Default video quality and data usage.</span>
                        </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            name="data" 
                            checked={dataUsage === 'low'} 
                            onChange={() => setDataUsage('low')}
                            className="w-5 h-5 accent-black cursor-pointer"
                        />
                        <div>
                            <span className="block font-medium text-gray-800">Low</span>
                            <span className="block text-xs text-gray-500">Basic video quality, up to 0.3 GB per hour.</span>
                        </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            name="data" 
                            checked={dataUsage === 'medium'} 
                            onChange={() => setDataUsage('medium')}
                            className="w-5 h-5 accent-black cursor-pointer"
                        />
                        <div>
                            <span className="block font-medium text-gray-800">Medium</span>
                            <span className="block text-xs text-gray-500">Standard video quality, up to 0.7 GB per hour.</span>
                        </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                            type="radio" 
                            name="data" 
                            checked={dataUsage === 'high'} 
                            onChange={() => setDataUsage('high')}
                            className="w-5 h-5 accent-black cursor-pointer"
                        />
                        <div>
                            <span className="block font-medium text-gray-800">High</span>
                            <span className="block text-xs text-gray-500">Best video quality, up to 3 GB per hour for HD, 7 GB for Ultra HD.</span>
                        </div>
                    </label>
                 </div>
             </div>

             <div>
                 <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">Autoplay Controls</h3>
                 <div className="space-y-4">
                     <label className="flex items-start gap-3 cursor-pointer">
                         <input 
                            type="checkbox" 
                            checked={autoplayNext} 
                            onChange={(e) => setAutoplayNext(e.target.checked)}
                            className="w-5 h-5 accent-black mt-0.5"
                         />
                         <span className="text-gray-700 text-sm">Autoplay next episode in a series on all devices.</span>
                     </label>
                     <label className="flex items-start gap-3 cursor-pointer">
                         <input 
                            type="checkbox" 
                            checked={autoplayPreviews} 
                            onChange={(e) => setAutoplayPreviews(e.target.checked)}
                            className="w-5 h-5 accent-black mt-0.5"
                         />
                         <span className="text-gray-700 text-sm">Autoplay previews while browsing on all devices.</span>
                     </label>
                 </div>
             </div>
          </div>
        </section>

        {/* Subtitle Appearance */}
        <section className="bg-white p-6 rounded shadow-sm mb-8 border border-gray-200">
             <h2 className="text-xl font-bold mb-6 text-gray-800">Subtitle Appearance</h2>
             
             {/* Preview Box */}
             <div className="bg-gray-800 rounded-lg p-8 mb-8 relative overflow-hidden h-48 flex items-end justify-center shadow-inner">
                 <div className="absolute inset-0 opacity-40 bg-[url('https://picsum.photos/seed/sub/800/400')] bg-cover bg-center"></div>
                 <div className="relative z-10 text-center mb-4 transition-all duration-300">
                     <span 
                        className={`px-2 py-1 transition-all duration-300 ${subSize} ${subShadow}`}
                        style={{ 
                            color: subColor, 
                            fontFamily: subFont === 'Block' ? 'sans-serif' : subFont === 'Typewriter' ? 'monospace' : 'serif',
                            backgroundColor: subBackground,
                            fontWeight: 'bold'
                        }}
                     >
                         This is a preview of your subtitles.
                     </span>
                 </div>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 <div className="flex flex-col gap-2">
                     <label className="text-xs font-bold text-gray-500 uppercase">Font</label>
                     <select 
                        value={subFont}
                        onChange={(e) => setSubFont(e.target.value)}
                        className="border border-gray-300 rounded p-2 text-sm focus:border-blue-500 outline-none"
                     >
                         <option value="Block">Block</option>
                         <option value="Typewriter">Typewriter</option>
                         <option value="Casual">Casual</option>
                     </select>
                 </div>

                 <div className="flex flex-col gap-2">
                     <label className="text-xs font-bold text-gray-500 uppercase">Color</label>
                     <select 
                        value={subColor}
                        onChange={(e) => setSubColor(e.target.value)}
                        className="border border-gray-300 rounded p-2 text-sm focus:border-blue-500 outline-none"
                     >
                         <option value="white">White</option>
                         <option value="yellow">Yellow</option>
                         <option value="cyan">Cyan</option>
                         <option value="magenta">Magenta</option>
                     </select>
                 </div>

                 <div className="flex flex-col gap-2">
                     <label className="text-xs font-bold text-gray-500 uppercase">Text Size</label>
                     <select 
                        value={subSize}
                        onChange={(e) => setSubSize(e.target.value)}
                        className="border border-gray-300 rounded p-2 text-sm focus:border-blue-500 outline-none"
                     >
                         <option value="text-sm">Small</option>
                         <option value="text-xl">Medium</option>
                         <option value="text-3xl">Large</option>
                     </select>
                 </div>

                 <div className="flex flex-col gap-2">
                     <label className="text-xs font-bold text-gray-500 uppercase">Shadow</label>
                     <select 
                        value={subShadow}
                        onChange={(e) => setSubShadow(e.target.value)}
                        className="border border-gray-300 rounded p-2 text-sm focus:border-blue-500 outline-none"
                     >
                         <option value="drop-shadow-none">None</option>
                         <option value="drop-shadow-md">Drop Shadow</option>
                         <option value="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Raised</option>
                         <option value="drop-shadow-[0_0_2px_rgba(0,0,0,1)]">Uniform</option>
                     </select>
                 </div>
                 
                 <div className="flex flex-col gap-2">
                     <label className="text-xs font-bold text-gray-500 uppercase">Background</label>
                     <select 
                        value={subBackground}
                        onChange={(e) => setSubBackground(e.target.value)}
                        className="border border-gray-300 rounded p-2 text-sm focus:border-blue-500 outline-none"
                     >
                         <option value="transparent">None</option>
                         <option value="black">Black</option>
                         <option value="rgba(0,0,0,0.5)">Semi-Transparent</option>
                     </select>
                 </div>
             </div>
        </section>

        {/* Action Buttons */}
        <div className="flex gap-4">
             <button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[#e50914] text-white px-8 py-2 font-medium text-lg rounded-sm hover:bg-[#f6121d] transition shadow-sm disabled:opacity-50"
             >
                 {isSaving ? 'Saving...' : 'Save'}
             </button>
             <button 
                onClick={onNavigateHome}
                className="bg-[#ccc] text-[#333] px-8 py-2 font-medium text-lg rounded-sm hover:bg-[#bbb] transition shadow-sm"
             >
                 Cancel
             </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;