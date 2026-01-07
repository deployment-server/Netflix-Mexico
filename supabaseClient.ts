import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xwptueyvqlkxwfmxxmhf.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'sb_publishable_DtgJbD0MGscmthXJiaOxyg_dUSM-hYa';

let client;

try {
  if (SUPABASE_URL && SUPABASE_URL.startsWith('http')) {
    client = createClient(SUPABASE_URL, SUPABASE_KEY);
  } else {
     console.warn("Invalid Supabase URL provided.");
  }
} catch (error) {
  console.warn("Supabase client initialization error:", error);
}

// Fallback Mock Client
if (!client) {
  console.warn("Using Mock Supabase Client due to initialization failure.");
  
  const mockFrom = (table: string) => {
      return {
          select: () => ({ 
              eq: () => ({ 
                  single: () => Promise.resolve({ data: null, error: null }), 
                  order: () => Promise.resolve({ data: [], error: null }) 
              }),
              order: () => Promise.resolve({ data: [], error: null })
          }),
          insert: (payload: any) => ({ 
              select: () => Promise.resolve({ 
                  data: [{ id: Math.floor(Math.random() * 1000), ...payload }], 
                  error: null 
              }) 
          }),
          update: () => ({ eq: () => Promise.resolve({ data: [], error: null }) }),
          delete: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
      };
  };

  client = {
    auth: {
      signInWithPassword: async ({ email }: any) => {
        console.log("Mock Login:", email);
        await new Promise(resolve => setTimeout(resolve, 800));
        // Return Session object to bypass "Email not confirmed" logic
        return { 
            data: { 
                user: { id: 'mock-id-123', email },
                session: { access_token: 'mock-token', user: { id: 'mock-id-123', email } } 
            }, 
            error: null 
        };
      },
      signUp: async ({ email }: any) => {
        console.log("Mock Signup:", email);
        await new Promise(resolve => setTimeout(resolve, 800));
        // Return Session object to bypass "Email not confirmed" logic
        return { 
            data: { 
                user: { id: 'mock-id-123', email },
                session: { access_token: 'mock-token', user: { id: 'mock-id-123', email } } 
            }, 
            error: null 
        };
      },
      signOut: async () => ({ error: null }),
      getUser: async () => ({ data: { user: { id: 'mock-id-123' } }, error: null }),
    },
    from: mockFrom
  };
}

export const supabase = client as any;