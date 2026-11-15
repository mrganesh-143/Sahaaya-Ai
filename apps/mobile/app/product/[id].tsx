import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/theme';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageText}>Sahaaya Essential</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.badgeRow}>
          <Text style={styles.badge}>VERIFIED MSME SELLER</Text>
          <Text style={styles.saveTag}>Direct Community Sourcing</Text>
        </View>

        <Text style={styles.title}>Premium Unpolished Toor Dal (1 kg)</Text>
        <Text style={styles.seller}>Sourced by Telangana Farmers Co-Operative</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>₹ 142</Text>
          <Text style={styles.mrp}>MRP ₹ 185</Text>
          <Text style={styles.savings}>You save ₹ 43 (23%)</Text>
        </View>

        <Text style={styles.descTitle}>About this Essential:</Text>
        <Text style={styles.desc}>
          Unpolished toor dal retains the high natural protein layer, dietary fiber and minerals that commercial polishing removes. Sourced directly from local farmer producers in Telangana with zero adulteration guarantee.
        </Text>

        <TouchableOpacity 
          style={styles.btn}
          onPress={() => {
            Alert.alert('Added to Basket!', 'Product added. Check basket anytime.');
            router.back();
          }}
        >
          <Ionicons name="basket" size={18} color="#FFFFFF" />
          <Text style={styles.btnText}>Add to Basket · ₹ 142</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  imagePlaceholder: {
    height: 220,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.primary,
  },
  content: {
    padding: 20,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  badge: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.primary,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  saveTag: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0284C7',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.textPrimary,
    marginTop: 4,
  },
  seller: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
    marginVertical: 16,
  },
  price: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.primary,
  },
  mrp: {
    fontSize: 15,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  savings: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.accent,
  },
  descTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 10,
    marginBottom: 4,
  },
  desc: {
    fontSize: 13,
    lineHeight: 19,
    color: Colors.textSecondary,
    marginBottom: 28,
  },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
