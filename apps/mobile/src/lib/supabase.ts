import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Custom storage adapter using Expo SecureStore for secure session persistence.
 * SecureStore requires keys to be ≤ 255 chars and alphanumeric + '.' + '-' only.
 */
const ExpoSecureStoreAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(sanitizeKey(key));
    } catch {
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(sanitizeKey(key), value);
    } catch {
      // Silently fail — session won't persist but app still works
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(sanitizeKey(key));
    } catch {
      // Silently fail
    }
  },
};

/**
 * SecureStore keys must be alphanumeric + '-' + '.', max 255 chars.
 */
function sanitizeKey(key: string): string {
  return key.replace(/[^a-zA-Z0-9.\-]/g, '_').slice(0, 255);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export type { Session, User } from '@supabase/supabase-js';
