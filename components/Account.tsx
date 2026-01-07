import React, { useEffect, useState } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface AccountProps {
    onNavigateHome: () => void;
}

const Account: React.FC<AccountProps> = ({ onNavigateHome }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    const fetchAccountData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                const { data: sub } = await supabase
                    .from('subscriptions')
                    .select('*')
                    .eq('user_id', user.id)
                    .single();
                setSubscription(sub);
            }
        } catch (error) {
            console.error("Error fetching account details:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchAccountData();
  }, []);

  if (loading) {
      return (
          <div className="min-h-screen bg-[#f3f3f3] flex items-center justify-center">
              <Loader2 className="animate-spin text-[#E50914]" size={48} />
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-[#333] font-sans">
       {/* Simple Header for Account Page */}
       <div className="bg-[#141414] h-[68px] flex items-center justify-between px-4 md:px-12 border-b border-gray-800 sticky top-0 z-50">
           <div className="flex items-center gap-2 cursor-pointer" onClick={onNavigateHome}>
               <span className="text-[#E50914] text-3xl font-bold tracking-tighter">NETFLIX</span>
           </div>
           <div className="w-8 h-8 rounded bg-blue-600 overflow-hidden cursor-pointer" onClick={onNavigateHome}>
                {/* Fallback to default avatar if none selected (though logic usually requires one) */}
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-full h-full object-cover" />
           </div>
       </div>

       <div className="max-w-4xl mx-auto py-8 px-4">
          <h1 className="text-3xl font-normal mb-6 border-b border-gray-300 pb-2">Account</h1>
          
          <div className="flex flex-col md:flex-row gap-4 py-4 border-b border-gray-300">
             <div className="w-full md:w-1/4">
                <h2 className="text-gray-500 uppercase font-medium text-sm md:text-base mb-2">Membership & Billing</h2>
                <button className="bg-[#e6e6e6] hover:bg-[#dcdcdc] text-black text-sm px-4 py-3 shadow-sm transition font-medium w-full md:w-auto">Cancel Membership</button>
             </div>
             <div className="w-full md:w-3/4">
                <div className="flex justify-between items-center mb-2 font-bold text-sm">
                   <span>{user?.email || 'user@example.com'}</span>
                   <a href="#" className="text-blue-600 hover:underline text-xs md:text-sm font-normal">Change email</a>
                </div>
                <div className="flex justify-between items-center mb-2 text-gray-500 text-sm">
                   <span>Password: ********</span>
                   <a href="#" className="text-blue-600 hover:underline text-xs md:text-sm font-normal">Change password</a>
                </div>
                <div className="flex justify-between items-center mb-4 text-gray-500 text-sm">
                   <span>Phone: {user?.phone || 'Add phone number'}</span>
                   <a href="#" className="text-blue-600 hover:underline text-xs md:text-sm font-normal">Change phone number</a>
                </div>

                <div className="bg-gray-100 p-3 rounded flex items-center justify-between mb-4 border border-gray-200">
                   <div className="flex items-center gap-3">
                      <CreditCard className="text-gray-600" size={24} />
                      <span className="font-bold text-sm">•••• •••• •••• {subscription?.payment_method_last4 || '4242'}</span>
                   </div>
                   <a href="#" className="text-blue-600 hover:underline text-xs md:text-sm font-medium">Manage payment info</a>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Your next billing date is {subscription?.next_billing_date || 'October 15, 2025'}.</span>
                    <a href="#" className="text-blue-600 hover:underline font-medium">Billing details</a>
                </div>
             </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 py-4 border-b border-gray-300">
             <div className="w-full md:w-1/4">
                <h2 className="text-gray-500 uppercase font-medium text-sm md:text-base">Plan Details</h2>
             </div>
             <div className="w-full md:w-3/4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                   <span className="font-bold text-sm">{subscription?.plan_name || 'Premium'} Ultra HD</span>
                   <span className="border border-black px-1 text-[10px] font-bold rounded-sm text-black">4K HDR</span>
                </div>
                <a href="#" className="text-blue-600 hover:underline text-xs md:text-sm font-medium">Change plan</a>
             </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 py-4">
             <div className="w-full md:w-1/4">
                <h2 className="text-gray-500 uppercase font-medium text-sm md:text-base">Settings</h2>
             </div>
             <div className="w-full md:w-3/4 flex flex-col gap-2">
                <div className="text-blue-600 hover:underline text-sm cursor-pointer">Parental controls</div>
                <div className="text-blue-600 hover:underline text-sm cursor-pointer">Test participation</div>
                <div className="text-blue-600 hover:underline text-sm cursor-pointer">Manage download devices</div>
                <div className="text-blue-600 hover:underline text-sm cursor-pointer">Activate a device</div>
                <div className="text-blue-600 hover:underline text-sm cursor-pointer">Recent device streaming activity</div>
                <div className="text-blue-600 hover:underline text-sm cursor-pointer">Sign out of all devices</div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Account;
