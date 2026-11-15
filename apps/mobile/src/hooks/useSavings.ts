import { useState, useCallback } from 'react';
import api from '../lib/api';

export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string;
  category: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

export interface AddGoalPayload {
  title: string;
  targetAmount: number;
  deadline: string;
  category: string;
}

export interface AddExpensePayload {
  amount: number;
  category: string;
  description: string;
  date: string;
}

export function useSavings() {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<SavingsGoal[]>('/savings/goals');
      setGoals(data);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to fetch goals');
    } finally {
      setLoading(false);
    }
  }, []);

  const addGoal = useCallback(async (payload: AddGoalPayload) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post<SavingsGoal>('/savings/goals', payload);
      setGoals((prev) => [data, ...prev]);
      return data;
    } catch (err: any) {
      setError(err?.message ?? 'Failed to add goal');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateGoal = useCallback(async (id: string, payload: Partial<AddGoalPayload>) => {
    setLoading(true);
    try {
      const { data } = await api.patch<SavingsGoal>(`/savings/goals/${id}`, payload);
      setGoals((prev) => prev.map((g) => (g.id === id ? data : g)));
      return data;
    } catch (err: any) {
      setError(err?.message ?? 'Failed to update goal');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteGoal = useCallback(async (id: string) => {
    try {
      await api.delete(`/savings/goals/${id}`);
      setGoals((prev) => prev.filter((g) => g.id !== id));
    } catch (err: any) {
      setError(err?.message ?? 'Failed to delete goal');
      throw err;
    }
  }, []);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<Expense[]>('/savings/expenses');
      setExpenses(data);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  }, []);

  const addExpense = useCallback(async (payload: AddExpensePayload) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post<Expense>('/savings/expenses', payload);
      setExpenses((prev) => [data, ...prev]);
      return data;
    } catch (err: any) {
      setError(err?.message ?? 'Failed to add expense');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteExpense = useCallback(async (id: string) => {
    try {
      await api.delete(`/savings/expenses/${id}`);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch (err: any) {
      setError(err?.message ?? 'Failed to delete expense');
      throw err;
    }
  }, []);

  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const monthlyExpenses = expenses
    .filter((e) => {
      const d = new Date(e.date);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((sum, e) => sum + e.amount, 0);

  return {
    goals,
    expenses,
    loading,
    error,
    totalSaved,
    totalTarget,
    monthlyExpenses,
    fetchGoals,
    addGoal,
    updateGoal,
    deleteGoal,
    fetchExpenses,
    addExpense,
    deleteExpense,
  };
}
