import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/theme';

interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  mrp: number;
  price: number;
  seller: string;
}

const PRODUCTS: Product[] = [
  { id: '1', name: 'Premium Unpolished Toor Dal', category: 'Pulses', unit: '1 kg', mrp: 185, price: 142, seller: 'Telangana Farmers Co-Op' },
  { id: '2', name: 'Sona Masoori Raw Rice (Aged)', category: 'Rice', unit: '5 kg', mrp: 360, price: 285, seller: 'Godavari Direct Millers' },
  { id: '3', name: 'Cold Pressed Sunflower Oil', category: 'Oils', unit: '1 Litre', mrp: 165, price: 124, seller: 'Kisan Natural Oils' },
  { id: '4', name: 'Whole Moong Dal High Protein', category: 'Pulses', unit: '1 kg', mrp: 145, price: 110, seller: 'Sahaaya Community Co-op' },
  { id: '5', name: 'Guntur Pure Red Chilli Powder', category: 'Spices', unit: '500 g', mrp: 190, price: 135, seller: 'Guntur Direct Spices' },
  { id: '6', name: 'Student Long Notebook Pack (6)', category: 'Stationery', unit: 'Pack of 6', mrp: 270, price: 160, seller: 'Sahaaya Education' },
];

export default function MobileMarketplace() {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [cartCount, setCartCount] = useState(0);

  const categories = ['All', 'Pulses', 'Rice', 'Oils', 'Spices', 'Stationery'];

  const filtered = PRODUCTS.filter(p => {
    const matchCat = selectedCat === 'All' || p.category === selectedCat;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAddToCart = (item: Product) => {
    setCartCount(c => c + 1);
    Alert.alert('Added to Basket', `${item.name} added! You saved ₹ ${item.mrp - item.price}.`);
  };

  return (
    <View style={styles.container}>
      
      {/* Search Header */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={16} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search rice, dal, edible oil..."
          placeholderTextColor="#9CA3AF"
          value={search}
          onChangeText={setSearch}
        />
        {cartCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartCount}</Text>
          </View>
        )}
      </View>

      {/* Category Horizontal Filter */}
      <View style={styles.catContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedCat(item)}
              style={[styles.catPill, selectedCat === item && styles.catPillActive]}
            >
              <Text style={[styles.catText, selectedCat === item && styles.catTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Product List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => {
          const savings = item.mrp - item.price;
          return (
            <View style={styles.card}>
              <View style={styles.cardPlaceholder}>
                <Text style={styles.cardInitial}>{item.name.charAt(0)}</Text>
                <View style={styles.savingsTag}>
                  <Text style={styles.savingsText}>Save ₹{savings}</Text>
                </View>
              </View>

              <Text style={styles.productSeller} numberOfLines={1}>{item.seller}</Text>
              <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.productUnit}>{item.unit}</Text>

              <View style={styles.priceRow}>
                <Text style={styles.price}>₹ {item.price}</Text>
                <Text style={styles.mrp}>₹ {item.mrp}</Text>
              </View>

              <TouchableOpacity 
                style={styles.addBtn}
                onPress={() => handleAddToCart(item)}
              >
                <Ionicons name="add" size={14} color="#FFFFFF" />
                <Text style={styles.addBtnText}>Add</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    margin: 16,
    marginBottom: 8,
    borderRadius: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  cartBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  catContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  catPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  catPillActive: {
    backgroundColor: Colors.primary,
  },
  catText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  catTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 12,
    width: '48%',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  cardPlaceholder: {
    height: 90,
    borderRadius: 12,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 8,
  },
  cardInitial: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.primary,
  },
  savingsTag: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  savingsText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  productSeller: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  productName: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 2,
    height: 32,
  },
  productUnit: {
    fontSize: 10,
    color: '#9CA3AF',
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginBottom: 10,
  },
  price: {
    fontSize: 15,
    fontWeight: '900',
    color: Colors.primary,
  },
  mrp: {
    fontSize: 11,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 4,
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
