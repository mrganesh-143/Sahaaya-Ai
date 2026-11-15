import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/theme';
import { supabase } from '../../src/lib/supabase';

export default function MobileRegister() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'family' | 'youth' | 'partner'>('family');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password || !phone) {
      Alert.alert('Required', 'Please fill in all registration fields.');
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone,
            role,
          }
        }
      });
      if (error) {
        Alert.alert('Registration Failed', error.message);
      } else {
        Alert.alert('Welcome to Sahaaya!', 'Account created successfully.', [
          { text: 'Start Saving', onPress: () => router.replace('/(tabs)') }
        ]);
      }
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoText}>S</Text>
        </View>
        <Text style={styles.title}>Join SAHAAYA</Text>
        <Text style={styles.subtitle}>People's Savings Network</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>FULL NAME</Text>
        <TextInput
          style={styles.input}
          placeholder="Ravi Kumar"
          placeholderTextColor="#9CA3AF"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>EMAIL ADDRESS</Text>
        <TextInput
          style={styles.input}
          placeholder="name@example.com"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>MOBILE NUMBER (INDIA +91)</Text>
        <TextInput
          style={styles.input}
          placeholder="+91 98765 43210"
          placeholderTextColor="#9CA3AF"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>PRIMARY GOAL</Text>
        <View style={styles.roleRow}>
          <TouchableOpacity 
            style={[styles.rolePill, role === 'family' && styles.rolePillActive]}
            onPress={() => setRole('family')}
          >
            <Text style={[styles.roleText, role === 'family' && styles.roleTextActive]}>Family</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.rolePill, role === 'youth' && styles.rolePillActive]}
            onPress={() => setRole('youth')}
          >
            <Text style={[styles.roleText, role === 'youth' && styles.roleTextActive]}>Youth</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.rolePill, role === 'partner' && styles.rolePillActive]}
            onPress={() => setRole('partner')}
          >
            <Text style={[styles.roleText, role === 'partner' && styles.roleTextActive]}>Partner</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>PASSWORD</Text>
        <TextInput
          style={styles.input}
          placeholder="At least 6 characters"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Complete Registration</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.push('/(auth)/login')}
          style={styles.switchButton}
        >
          <Text style={styles.switchText}>
            Already registered? <Text style={styles.switchHighlight}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    padding: 24,
    paddingTop: 48,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoBadge: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#FAFAF7',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  roleRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  rolePill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    backgroundColor: '#FAFAF7',
  },
  rolePillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  roleTextActive: {
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  switchButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  switchText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  switchHighlight: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
