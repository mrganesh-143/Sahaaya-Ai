import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/theme';
import { supabase } from '../../src/lib/supabase';

export default function MobileProfile() {
  const router = useRouter();

  const handleLogout = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await supabase.auth.signOut();
          router.replace('/(auth)/login');
        }
      }
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* User Info Card */}
      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>SK</Text>
        </View>
        <Text style={styles.userName}>Sai Kumar Reddy</Text>
        <Text style={styles.userEmail}>sai.kumar@example.com</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>Family Head · Hyderabad, TS</Text>
        </View>
      </View>

      {/* Settings Rows */}
      <View style={styles.menuCard}>
        <TouchableOpacity style={styles.menuRow}>
          <View style={styles.menuLeft}>
            <Ionicons name="globe-outline" size={18} color={Colors.primary} />
            <Text style={styles.menuTitle}>App Language</Text>
          </View>
          <Text style={styles.menuValue}>తెలుగు (Telugu)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuRow}>
          <View style={styles.menuLeft}>
            <Ionicons name="notifications-outline" size={18} color={Colors.primary} />
            <Text style={styles.menuTitle}>Price Drop Alerts</Text>
          </View>
          <Text style={styles.menuValue}>Enabled</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuRow}>
          <View style={styles.menuLeft}>
            <Ionicons name="shield-checkmark-outline" size={18} color={Colors.primary} />
            <Text style={styles.menuTitle}>Data Security & RLS</Text>
          </View>
          <Text style={styles.menuValue}>Protected</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuRow, { borderBottomWidth: 0 }]} onPress={handleLogout}>
          <View style={styles.menuLeft}>
            <Ionicons name="log-out-outline" size={18} color="#DC2626" />
            <Text style={[styles.menuTitle, { color: '#DC2626' }]}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Founder & App Version Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>SAHAAYA – People's Savings Network</Text>
        <Text style={styles.footerSub}>Founder & CEO: Gunda Sai Jayanth</Text>
        <Text style={styles.footerVersion}>Version 1.0.0 (Production Release)</Text>
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
  userCard: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  userEmail: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  roleBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 10,
  },
  roleText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '700',
  },
  menuCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  menuValue: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 12,
  },
  footerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  footerSub: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  footerVersion: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
  },
});
