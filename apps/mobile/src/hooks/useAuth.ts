import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Session, User } from '../lib/supabase';

interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface SignInParams {
  email: string;
  password: string;
}

interface SignUpParams {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  role: 'family' | 'youth' | 'business';
  language: 'en' | 'te' | 'hi';
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState((prev) => ({
        ...prev,
        session,
        user: session?.user ?? null,
        loading: false,
      }));
    });

    // Listen to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setState((prev) => ({
          ...prev,
          session,
          user: session?.user ?? null,
          loading: false,
        }));
      },
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInParams) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setState((prev) => ({ ...prev, loading: false, error: error.message }));
      throw error;
    }
    setState((prev) => ({ ...prev, loading: false }));
  }, []);

  const signUp = useCallback(async ({
    email,
    password,
    fullName,
    phone,
    role,
    language,
  }: SignUpParams) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, phone, role, language },
      },
    });
    if (error) {
      setState((prev) => ({ ...prev, loading: false, error: error.message }));
      throw error;
    }
    setState((prev) => ({ ...prev, loading: false }));
  }, []);

  const signOut = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    await supabase.auth.signOut();
    setState({ session: null, user: null, loading: false, error: null });
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  }, []);

  return {
    session: state.session,
    user: state.user,
    loading: state.loading,
    error: state.error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    isAuthenticated: !!state.session,
  };
}
