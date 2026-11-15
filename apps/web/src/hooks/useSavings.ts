'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import type { SavingsGoal } from '@/types';

interface SavingsState {
  goals: SavingsGoal[];
  totalSaved: number;
  totalTarget: number;
  loading: boolean;
  error: string | null;
}

interface SavingsActions {
  refreshGoals: () => Promise<void>;
  addGoal: (goal: Omit<SavingsGoal, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<{ error: string | null }>;
  updateGoal: (id: string, updates: Partial<SavingsGoal>) => Promise<{ error: string | null }>;
  deleteGoal: (id: string) => Promise<{ error: string | null }>;
  addToGoal: (goalId: string, amount: number) => Promise<{ error: string | null }>;
}

export function useSavings(): SavingsState & SavingsActions {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const fetchGoals = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error: fetchError } = await supabase
      .from('savings_goals')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setGoals(data || []);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const totalSaved = goals.reduce((sum, g) => sum + g.current_amount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.target_amount, 0);

  const addGoal = useCallback(
    async (
      goal: Omit<SavingsGoal, 'id' | 'user_id' | 'created_at' | 'updated_at'>
    ): Promise<{ error: string | null }> => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { error: 'Not authenticated' };

      const { error: insertError } = await supabase
        .from('savings_goals')
        .insert({ ...goal, user_id: user.id });

      if (insertError) return { error: insertError.message };

      await fetchGoals();
      return { error: null };
    },
    [supabase, fetchGoals]
  );

  const updateGoal = useCallback(
    async (id: string, updates: Partial<SavingsGoal>): Promise<{ error: string | null }> => {
      const { error: updateError } = await supabase
        .from('savings_goals')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (updateError) return { error: updateError.message };

      await fetchGoals();
      return { error: null };
    },
    [supabase, fetchGoals]
  );

  const deleteGoal = useCallback(
    async (id: string): Promise<{ error: string | null }> => {
      const { error: deleteError } = await supabase
        .from('savings_goals')
        .update({ is_active: false })
        .eq('id', id);

      if (deleteError) return { error: deleteError.message };

      setGoals((prev) => prev.filter((g) => g.id !== id));
      return { error: null };
    },
    [supabase]
  );

  const addToGoal = useCallback(
    async (goalId: string, amount: number): Promise<{ error: string | null }> => {
      const goal = goals.find((g) => g.id === goalId);
      if (!goal) return { error: 'Goal not found' };

      return updateGoal(goalId, {
        current_amount: goal.current_amount + amount,
      });
    },
    [goals, updateGoal]
  );

  return {
    goals,
    totalSaved,
    totalTarget,
    loading,
    error,
    refreshGoals: fetchGoals,
    addGoal,
    updateGoal,
    deleteGoal,
    addToGoal,
  };
}
