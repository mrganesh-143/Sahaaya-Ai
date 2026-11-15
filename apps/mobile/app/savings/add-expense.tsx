import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/theme';

export default function MobileAddExpense() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Groceries');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!amount) {
      Alert.alert('Required', 'Please enter an expense amount.');
      return;
    }
    Alert.alert('Expense Saved', `₹ ${amount} added under ${category}!`, [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>AMOUNT IN RUPEES (₹)</Text>
      <TextInput
        style={styles.inputLarge}
        placeholder="e.g. 350"
        placeholderTextColor="#9CA3AF"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        autoFocus
      />

      <Text style={styles.label}>CATEGORY</Text>
      <View style={styles.catGrid}>
        {['Groceries', 'Dairy', 'Vegetables', 'Education', 'Medicine', 'Transport'].map(c => (
          <TouchableOpacity
            key={c}
            style={[styles.catBtn, category === c && styles.catBtnActive]}
            onPress={() => setCategory(c)}
          >
            <Text style={[styles.catText, category === c && styles.catTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>DESCRIPTION (OPTIONAL)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 5kg Sona Masoori Rice"
        placeholderTextColor="#9CA3AF"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save Expense</Text>
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
  inputLarge: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    paddingVertical: 8,
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
  catGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  catBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  catBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  catText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  catTextActive: {
    color: '#FFFFFF',
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
