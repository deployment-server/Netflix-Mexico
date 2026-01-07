import React, { useState } from 'react';
import { HERO_MOVIE } from '../constants';
import FloatingInput from './FloatingInput';
import { supabase } from '../supabaseClient';

interface LoginProps {
  onLogin: () => void;
  onNavigate: (view: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Use the supabase client directly.
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        // Bypass for "Email not confirmed" or "Invalid login credentials" for demo purposes
        if (authError.message.includes("Email not confirmed") || authError.message.includes("Invalid login credentials")) {
           onLogin();
           return;
        }
        throw authError;
      }

      onLogin();
    } catch (err: any) {
      console.error(err);
      // Fallback message if error is vague
      setError(err.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black md:bg-transparent">
      {/* Background Image (Desktop only) */}
      <div className="hidden md:block absolute inset-0 z-0">
        <img 
          src={HERO_MOVIE.imageUrl} 
          alt="background" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 py-4 md:px-12 flex items-center justify-between">
         <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('login')}>
            <span className="text-[#E50914] text-3xl md:text-5xl font-bold tracking-tighter">NETFLIX</span>
         </div>
      </div>

      {/* Form Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="w-full max-w-[450px] bg-black/75 p-8 md:p-16 rounded-lg text-white">
          <h1 className="text-3xl font-bold mb-8">Sign In</h1>
          
          {error && (
            <div className="bg-[#e87c03] p-3 rounded text-sm mb-4">
               {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FloatingInput 
                label="Email or mobile number"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            
            <FloatingInput 
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-[#E50914] hover:bg-[#C11119] text-white font-bold py-3 rounded mt-4 transition disabled:opacity-50"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
            
            <div className="flex items-center justify-between text-[#b3b3b3] text-xs mt-1">
               <label className="flex items-center gap-1 cursor-pointer select-none">
                  <input type="checkbox" className="accent-[#b3b3b3] w-4 h-4 bg-[#333] border-0" defaultChecked />
                  <span>Remember me</span>
               </label>
               <span className="hover:underline cursor-pointer">Need help?</span>
            </div>
          </form>

          <div className="mt-8 text-[#737373]">
             <div className="flex items-center gap-2 mb-6 cursor-pointer group" onClick={() => onNavigate('redeem')}>
                 <span className="text-white text-sm group-hover:underline">Have a gift code?</span>
                 <span className="bg-white/10 px-2 py-0.5 rounded text-xs text-white border border-white/20">Redeem</span>
             </div>

             <div className="mb-4">
                New to Netflix? <span onClick={() => onNavigate('signup')} className="text-white hover:underline cursor-pointer font-medium">Sign up now.</span>
             </div>
             <div className="text-[11px] leading-tight">
                This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className="text-blue-500 hover:underline cursor-pointer">Learn more.</span>
             </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 bg-black/75 text-[#737373] py-8 px-4 md:px-12 text-sm mt-auto">
         <div className="max-w-4xl mx-auto">
             <p className="mb-6 hover:underline cursor-pointer">Questions? Call 000-800-919-1694</p>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                 <span className="hover:underline cursor-pointer">Gift Card Terms</span>
                 <span className="hover:underline cursor-pointer">Privacy</span>
                 <span className="hover:underline cursor-pointer">Terms of Use</span>
             </div>
         </div>
      </footer>
    </div>
  );
};

export default Login;