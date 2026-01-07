import React, { useState } from 'react';
import FloatingInput from './FloatingInput';
import { supabase } from '../supabaseClient';

interface RedeemGiftCardProps {
  onNavigate: (view: string) => void;
  onRedeemSuccess?: () => void;
}

const RedeemGiftCard: React.FC<RedeemGiftCardProps> = ({ onNavigate, onRedeemSuccess }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRedeem = async () => {
    if (code.trim().length < 5) {
        setError("Please enter a valid code.");
        return;
    }

    setIsLoading(true);
    setError('');

    try {
        // Check code against Supabase database
        const { data, error } = await supabase
            .from('redeem_codes')
            .select('*')
            .eq('code', code.trim())
            .single();

        if (error || !data) {
            setError("Invalid gift code. Please try again.");
            setIsLoading(false);
            return;
        }

        if (data.is_used) {
            setError("This code has already been used.");
            setIsLoading(false);
            return;
        }

        // Valid code found
        if (onRedeemSuccess) {
            onRedeemSuccess();
        } else {
            onNavigate('signup');
        }
    } catch (err) {
        setError("An error occurred. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-[#333] font-sans">
       <div className="bg-white border-b border-[#e6e6e6] px-4 py-4 md:px-12 flex justify-between items-center sticky top-0 z-50">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('login')}>
                <span className="text-[#E50914] text-3xl font-bold tracking-tighter">NETFLIX</span>
            </div>
            <button onClick={() => onNavigate('login')} className="text-[#333] font-bold hover:underline text-lg">Sign In</button>
       </div>

       <div className="max-w-xl mx-auto px-4 py-12 md:py-20">
           <h1 className="text-3xl font-bold mb-4 text-[#333]">Redeem your gift card or promo code.</h1>
           <div className="bg-white p-8 rounded shadow-sm border border-[#e6e6e6]">
               <div className="mb-6">
                 <FloatingInput 
                    label="Enter code or PIN"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    dark={false}
                 />
                 {error && <p className="text-[#e87c03] text-sm mt-2 font-medium">{error}</p>}
               </div>
               
               <div className="flex gap-4 items-center">
                   <button 
                    onClick={handleRedeem}
                    disabled={isLoading}
                    className="bg-[#E50914] text-white font-bold px-8 py-3 rounded hover:bg-[#f6121d] transition shadow-sm disabled:opacity-50"
                   >
                       {isLoading ? 'Checking...' : 'Redeem'}
                   </button>
                   <button onClick={() => onNavigate('login')} className="text-gray-600 font-bold px-4 py-3 hover:underline">Cancel</button>
               </div>
           </div>
           
           <p className="mt-8 text-sm text-gray-600 leading-relaxed">
               Try codes like <b>NETFLIX2024</b> or <b>WELCOME_FREE</b>.<br/>
               If you have a physical gift card, scratch off the foil on the back gently with a coin. 
           </p>
       </div>
    </div>
  );
};

export default RedeemGiftCard;