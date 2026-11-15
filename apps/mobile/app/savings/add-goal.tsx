import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/theme';

export default function MobileAddGoal() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const handleSave = () => {
    if (!title || !targetAmount) {
      Alert.alert('Required', 'Please enter a goal title and target amount.');
      return;
    }
    Alert.alert('Goal Created', `"${title}" goal of ₹ ${targetAmount} added to your plan!`, [
      { text: 'Great!', onPress: () => router.back() }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>SAVINGS GOAL TITLE</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Children College Admission"
        placeholderTextColor="#9CA3AF"
        value={title}
        onChangeText={setTitle}
        autoFocus
      />

      <Text style={styles.label}>TARGET AMOUNT (₹)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 50000"
        placeholderTextColor="#9CA3AF"
        keyboardType="numeric"
        value={targetAmount}
        onChangeText={setTargetAmount}
      />

      <Text style={styles.label}>TARGET DATE (OPTIONAL)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. December 2025"
        placeholderTextColor="#9CA3AF"
        value={targetDate}
        onChangeText={setTargetDate}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Create Goal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
    padding: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textSecondary,
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 32,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
