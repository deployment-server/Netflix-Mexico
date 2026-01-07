import React, { useState } from 'react';
import FloatingInput from './FloatingInput';
import { supabase } from '../supabaseClient';
import { Check, Loader2, Gift } from 'lucide-react';

interface SignupProps {
  mode: 'normal' | 'gift'; // Differentiate between standard signup and gift redemption flow
  onLogin: () => void;
  onNavigate: (view: string) => void;
}

const PLANS = [
    { name: 'Mobile', price: '₹149', quality: 'Good', res: '480p', devices: 'Phone, Tablet' },
    { name: 'Basic', price: '₹199', quality: 'Good', res: '720p', devices: 'Phone, Tablet, Computer, TV' },
    { name: 'Standard', price: '₹499', quality: 'Better', res: '1080p', devices: 'Phone, Tablet, Computer, TV' },
    { name: 'Premium', price: '₹649', quality: 'Best', res: '4K+HDR', devices: 'Phone, Tablet, Computer, TV' }
];

const Signup: React.FC<SignupProps> = ({ mode, onLogin, onNavigate }) => {
  const [step, setStep] = useState(1);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('Premium');
  
  // Payment State
  const [ccNum, setCcNum] = useState('');
  const [ccExp, setCcExp] = useState('');
  const [ccCvv, setCcCvv] = useState('');
  const [ccName, setCcName] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // --- Handlers ---

  const handleCreateAccount = async () => {
      if (!email.includes('@') || password.length < 6) {
          setError("Please enter a valid email and a password (min 6 chars).");
          return;
      }
      setIsLoading(true);
      setError('');
      
      try {
        // Attempt to sign up
        const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (signUpError) {
             // If user already exists, try to sign them in automatically
             if (signUpError.message.includes("already registered") || signUpError.status === 400) {
                 const { error: signInError } = await supabase.auth.signInWithPassword({
                     email,
                     password
                 });
                 
                 if (signInError) throw new Error("Account exists. Please log in.");
                 
                 // Sign in successful
                 proceedToNextStep();
                 return;
             } else {
                 throw signUpError;
             }
        }
        
        // If Signup successful but no session (Supabase waiting for email), Try explicit login immediately.
        // This handles cases where "Confirm Email" might be disabled but session wasn't returned in signUp response.
        if (data && !data.session && data.user) {
             const { error: autoLoginError } = await supabase.auth.signInWithPassword({
                 email,
                 password
             });

             if (autoLoginError) {
                 // If auto-login fails, it usually means Email Confirmation is ENFORCED by Supabase.
                 // We show a helpful message but strictly speaking we can't bypass backend security from frontend.
                 console.warn("Auto-login failed:", autoLoginError.message);
                 // However, for the purpose of the demo app flow, we will proceed.
             }
        }
        
        // Proceed regardless of verification state for smoother UX in demo
        proceedToNextStep();
        
      } catch (err: any) {
         setIsLoading(false);
         setError(err.message || "Failed to create account.");
      }
  };

  const proceedToNextStep = () => {
      setIsLoading(false);
      if (mode === 'gift') {
          setStep(4);
      } else {
          setStep(2);
      }
  };

  const handleStartMembership = async () => {
      // Basic validation
      if(ccNum.length < 12 || ccCvv.length < 3 || !ccName) {
          setError("Please fill in all credit card details.");
          return;
      }

      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
      onLogin(); // Redirect to Profile setup/Home
  };

  // --- Render Header ---
  const renderHeader = () => (
    <div className="border-b border-[#e6e6e6] px-4 py-4 md:px-12 flex justify-between items-center bg-white sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('login')}>
            <span className="text-[#E50914] text-3xl md:text-4xl font-bold tracking-tighter">NETFLIX</span>
        </div>
        <button onClick={() => onNavigate('login')} className="text-sm md:text-lg font-bold hover:underline text-[#333]">Sign In</button>
    </div>
  );

  // STEP 1: Create Account
  if (step === 1) {
      return (
        <div className="min-h-screen bg-white text-[#333] font-sans flex flex-col">
           {renderHeader()}
           <div className="flex-1 px-4 py-8 md:py-12">
               <div className="max-w-[440px] mx-auto animate-in fade-in slide-in-from-right-8 duration-300">
                   <span className="text-xs uppercase tracking-wide text-[#333]">Step 1 of {mode === 'gift' ? '2' : '3'}</span>
                   <h1 className="text-3xl font-bold mb-4 mt-2">Create a password to start your membership</h1>
                   <p className="text-lg text-[#333] mb-6">Just a few more steps and you're done!<br/>We hate paperwork, too.</p>
                   
                   {error && <div className="bg-[#e87c03] text-white text-sm p-3 rounded mb-4">{error}</div>}

                   <div className="flex flex-col gap-4">
                        <FloatingInput 
                            label="Email"
                            type="email" 
                            dark={false}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FloatingInput 
                            label="Add a password"
                            type="password" 
                            dark={false}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button 
                            onClick={handleCreateAccount} 
                            disabled={isLoading}
                            className="w-full bg-[#E50914] text-white text-xl py-4 rounded hover:bg-[#f6121d] transition mt-2 font-medium flex items-center justify-center"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Next'}
                        </button>
                   </div>
               </div>
           </div>
        </div>
      );
  }

  // STEP 2: Plan Selection Grid (Normal Mode)
  if (step === 2 && mode === 'normal') {
      return (
        <div className="min-h-screen bg-white text-[#333] font-sans flex flex-col">
            {renderHeader()}
            <div className="flex-1 px-4 py-8">
                <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-right-8 duration-300">
                    <div className="mb-6">
                        <span className="text-xs uppercase tracking-wide">Step 2 of 3</span>
                        <h1 className="text-3xl font-bold mt-2">Choose the plan that's right for you</h1>
                        <div className="flex items-center gap-2 text-sm text-[#333] mt-2">
                             <Check className="text-[#E50914]" size={20} />
                             <span>Everything on Netflix for one low price.</span>
                             <Check className="text-[#E50914] ml-2" size={20} />
                             <span>No ads and no extra fees. Ever.</span>
                        </div>
                    </div>

                    {/* Plan Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        {PLANS.map((plan) => (
                            <div 
                                key={plan.name}
                                onClick={() => setSelectedPlan(plan.name)}
                                className={`relative p-4 rounded border-2 cursor-pointer transition-all ${selectedPlan === plan.name ? 'border-[#E50914] shadow-lg bg-red-50/50' : 'border-gray-200 hover:border-gray-400'}`}
                            >
                                {selectedPlan === plan.name && (
                                    <div className="absolute top-0 right-0 left-0 bg-[#E50914] text-white text-xs text-center py-1 font-bold rounded-t-sm">
                                        Selected
                                    </div>
                                )}
                                <div className={`w-6 h-6 rounded-full border border-gray-300 mb-4 flex items-center justify-center ${selectedPlan === plan.name ? 'bg-[#E50914] border-[#E50914]' : ''}`}>
                                    {selectedPlan === plan.name && <Check size={14} className="text-white" />}
                                </div>
                                <h3 className="font-bold text-lg mb-2">{plan.name}</h3>
                                <div className="text-sm font-semibold text-gray-600 mb-4">{plan.res}</div>
                                <div className="text-gray-500 text-sm mb-1">Monthly Price</div>
                                <div className="font-bold text-black mb-4">{plan.price}</div>
                                <div className="border-t border-gray-200 pt-3 text-xs text-gray-500">
                                    {plan.devices}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <button onClick={() => setStep(3)} className="w-full md:w-1/2 bg-[#E50914] text-white text-xl py-4 rounded hover:bg-[#f6121d] transition">Next</button>
                    </div>
                </div>
            </div>
        </div>
      );
  }

  // STEP 3: Payment Form (Normal Mode)
  if (step === 3 && mode === 'normal') {
      return (
        <div className="min-h-screen bg-white text-[#333] font-sans flex flex-col">
           {renderHeader()}
           <div className="flex-1 px-4 py-8">
               <div className="max-w-[440px] mx-auto animate-in fade-in slide-in-from-right-8 duration-300">
                   <span className="text-xs uppercase tracking-wide text-[#333]">Step 3 of 3</span>
                   <h1 className="text-3xl font-bold mb-4 mt-2">Set up your credit or debit card</h1>
                   
                   {error && <div className="bg-[#e87c03] text-white text-sm p-3 rounded mb-4">{error}</div>}

                   <div className="flex flex-col gap-3">
                        <FloatingInput label="Card Number" type="text" maxLength={19} dark={false} value={ccNum} onChange={(e) => {const v = e.target.value.replace(/\D/g, '').match(/.{1,4}/g)?.join(' ') || ''; if(v.length <= 19) setCcNum(v);}} />
                        <div className="flex gap-3">
                            <FloatingInput label="Expiration Date (MM/YY)" type="text" dark={false} maxLength={5} value={ccExp} onChange={(e) => setCcExp(e.target.value)} />
                            <FloatingInput label="CVV" type="text" dark={false} maxLength={4} value={ccCvv} onChange={(e) => setCcCvv(e.target.value)} />
                        </div>
                        <FloatingInput label="Name on Card" type="text" dark={false} value={ccName} onChange={(e) => setCcName(e.target.value)} />

                        <div className="bg-gray-100 p-4 rounded flex justify-between items-center mt-2">
                             <div>
                                 <div className="font-bold text-sm text-[#333]">₹649/mo.</div>
                                 <div className="text-gray-500 text-xs">{selectedPlan} Plan</div>
                             </div>
                             <button onClick={() => setStep(2)} className="text-blue-600 font-bold text-sm hover:underline">Change</button>
                        </div>
                        
                        <button 
                            onClick={handleStartMembership} 
                            disabled={isLoading}
                            className="w-full bg-[#E50914] text-white text-xl py-4 rounded hover:bg-[#f6121d] transition mt-2 font-medium flex items-center justify-center"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Start Membership'}
                        </button>
                   </div>
               </div>
           </div>
        </div>
      );
  }

  // STEP 4: Gift Confirmation
  if (step === 4 && mode === 'gift') {
    return (
        <div className="min-h-screen bg-white text-[#333] font-sans flex flex-col">
            {renderHeader()}
            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="max-w-[440px] text-center animate-in fade-in slide-in-from-right-8 duration-300 w-full">
                    <div className="mb-6 flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center"><Gift className="text-green-600" size={32} /></div>
                    </div>
                    <h1 className="text-3xl font-bold mb-4 mt-2">Gift Code Applied!</h1>
                    <button onClick={onLogin} className="w-full bg-[#E50914] text-white text-xl py-4 rounded hover:bg-[#f6121d] transition">Start Watching</button>
                </div>
            </div>
        </div>
    );
  }

  return null;
};

export default Signup;