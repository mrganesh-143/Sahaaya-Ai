import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, FontSizes, FontWeights, Spacing, Shadows } from '../../constants/theme';
import type { SavingsGoal } from '../../hooks/useSavings';

interface GoalCardProps {
  goal: SavingsGoal;
  onPress?: () => void;
}

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

const CATEGORY_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  education: 'school-outline',
  health: 'medkit-outline',
  home: 'home-outline',
  travel: 'airplane-outline',
  emergency: 'shield-outline',
  vehicle: 'car-outline',
  electronics: 'phone-portrait-outline',
  other: 'wallet-outline',
};

export function GoalCard({ goal, onPress }: GoalCardProps) {
  const progress = goal.targetAmount > 0
    ? Math.min((goal.savedAmount / goal.targetAmount) * 100, 100)
    : 0;
  const remaining = goal.targetAmount - goal.savedAmount;
  const icon = CATEGORY_ICONS[goal.category?.toLowerCase()] ?? 'wallet-outline';

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(goal.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
  );

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}
      onPress={onPress}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <Ionicons name={icon} size={22} color={Colors.primary} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1}>{goal.title}</Text>
          <Text style={styles.deadline}>Target: {formatDate(goal.deadline)}</Text>
        </View>
        <View style={styles.daysLeft}>
          <Text style={styles.daysCount}>{daysLeft}</Text>
          <Text style={styles.daysLabel}>days left</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressPct}>{Math.round(progress)}%</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Saved</Text>
          <Text style={styles.footerValue}>{formatINR(goal.savedAmount)}</Text>
        </View>
        <View style={styles.footerDivider} />
        <View>
          <Text style={styles.footerLabel}>Remaining</Text>
          <Text style={[styles.footerValue, { color: Colors.warning }]}>
            {formatINR(remaining)}
          </Text>
        </View>
        <View style={styles.footerDivider} />
        <View>
          <Text style={styles.footerLabel}>Target</Text>
          <Text style={styles.footerValue}>{formatINR(goal.targetAmount)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  headerText: { flex: 1 },
  title: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.semibold,
    color: Colors.textPrimary,
  },
  deadline: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  daysLeft: { alignItems: 'center' },
  daysCount: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: Colors.primary,
  },
  daysLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.borderLight,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
  },
  progressPct: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    color: Colors.primary,
    minWidth: 36,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  footerValue: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    color: Colors.textPrimary,
  },
  footerDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.border,
  },
});
