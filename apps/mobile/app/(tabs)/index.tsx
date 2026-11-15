import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/theme';

export default function MobileDashboard() {
  const router = useRouter();

  const [expenses] = useState([
    { id: '1', title: 'Toor Dal & Rice Pack', category: 'Groceries', amount: 1250, date: 'Today' },
    { id: '2', title: 'Milk Delivery', category: 'Dairy', amount: 480, date: 'Yesterday' },
    { id: '3', title: 'Notebooks for School', category: 'Education', amount: 320, date: '12 Nov' },
  ]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* Welcome Card */}
      <View style={styles.heroCard}>
        <Text style={styles.namaste}>Namaste, Sai Kumar! 🙏</Text>
        <Text style={styles.heroSubtitle}>
          Your family has saved <Text style={styles.heroHighlight}>₹ 1,420</Text> this month with Sahaaya staples.
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>MONTHLY BUDGET</Text>
            <Text style={styles.statValue}>₹ 18,000</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>TOTAL SAVED</Text>
            <Text style={styles.statValue}>₹ 14,800</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions Row */}
      <View style={styles.actionsRow}>
        <TouchableOpacity 
          style={styles.actionBtn}
          onPress={() => router.push('/savings/add-expense')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
            <Ionicons name="add" size={20} color={Colors.primary} />
          </View>
          <Text style={styles.actionText}>Add Expense</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionBtn}
          onPress={() => router.push('/savings/add-goal')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#F1F8E9' }]}>
            <Ionicons name="flag-outline" size={20} color={Colors.accent} />
          </View>
          <Text style={styles.actionText}>Set Goal</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionBtn}
          onPress={() => router.push('/(tabs)/marketplace')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#E0F2FE' }]}>
            <Ionicons name="cart-outline" size={20} color="#0284C7" />
          </View>
          <Text style={styles.actionText}>Shop Staples</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionBtn}
          onPress={() => router.push('/(tabs)/ai-chat')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#FEF3C7' }]}>
            <Ionicons name="sparkles" size={20} color="#D97706" />
          </View>
          <Text style={styles.actionText}>Ask AI</Text>
        </TouchableOpacity>
      </View>

      {/* Family Goals Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Family Savings Goals</Text>
        <TouchableOpacity onPress={() => router.push('/savings/add-goal')}>
          <Text style={styles.sectionLink}>+ New</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.goalCard}>
        <View style={styles.goalTop}>
          <Text style={styles.goalTitle}>Children's School Fee Fund</Text>
          <Text style={styles.goalTarget}>₹ 13,000 / 20,000</Text>
        </View>
        <View style={styles.progressBg}>
          <View style={[styles.progressBar, { width: '65%' }]} />
        </View>
        <Text style={styles.goalPercent}>65% saved · ₹ 7,000 to go</Text>
      </View>

      <View style={styles.goalCard}>
        <View style={styles.goalTop}>
          <Text style={styles.goalTitle}>Emergency Medical Cushion</Text>
          <Text style={styles.goalTarget}>₹ 8,400 / 10,000</Text>
        </View>
        <View style={styles.progressBg}>
          <View style={[styles.progressBar, { width: '84%', backgroundColor: Colors.accent }]} />
        </View>
        <Text style={styles.goalPercent}>84% saved · ₹ 1,600 to go</Text>
      </View>

      {/* Recent Expenses List */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Household Expenses</Text>
      </View>

      <View style={styles.expensesCard}>
        {expenses.map((item, index) => (
          <View 
            key={item.id} 
            style={[styles.expenseItem, index === expenses.length - 1 && { borderBottomWidth: 0 }]}
          >
            <View>
              <Text style={styles.expenseTitle}>{item.title}</Text>
              <Text style={styles.expenseSub}>{item.category} · {item.date}</Text>
            </View>
            <Text style={styles.expenseAmount}>- ₹ {item.amount}</Text>
          </View>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  heroCard: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  namaste: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 18,
    marginBottom: 16,
  },
  heroHighlight: {
    color: Colors.accent,
    fontWeight: '800',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    padding: 12,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionBtn: {
    alignItems: 'center',
    width: '23%',
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  sectionLink: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  goalCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  goalTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  goalTarget: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
  },
  progressBg: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  goalPercent: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 6,
    fontWeight: '600',
  },
  expensesCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  expenseTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  expenseSub: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  expenseAmount: {
    fontSize: 13,
    fontWeight: '800',
    color: '#DC2626',
  },
});
