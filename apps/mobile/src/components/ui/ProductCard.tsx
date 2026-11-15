import React from 'react';
import { View, Text, StyleSheet, Pressable, PressableProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, FontSizes, FontWeights, Spacing, Shadows } from '../../constants/theme';
import { SahaayaButton } from './SahaayaButton';

export interface Product {
  id: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  imageUrl?: string;
  unit?: string;
  seller?: string;
  category?: string;
}

interface ProductCardProps extends Omit<PressableProps, 'style'> {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ProductCard({ product, onAddToCart, ...props }: ProductCardProps) {
  const savings = product.originalPrice - product.discountedPrice;
  const discountPct = Math.round((savings / product.originalPrice) * 100);

  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} {...props}>
      {/* Image Placeholder */}
      <View style={styles.imagePlaceholder}>
        <Ionicons name="leaf-outline" size={36} color={Colors.accentDark} />
        {discountPct > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discountPct}% OFF</Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        {product.unit && <Text style={styles.unit}>{product.unit}</Text>}

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatINR(product.discountedPrice)}</Text>
          <Text style={styles.originalPrice}>{formatINR(product.originalPrice)}</Text>
        </View>

        {savings > 0 && (
          <View style={styles.savingsBadge}>
            <Ionicons name="pricetag-outline" size={10} color={Colors.primary} />
            <Text style={styles.savingsText}>Save {formatINR(savings)}</Text>
          </View>
        )}

        <SahaayaButton
          title="Add to Cart"
          size="sm"
          onPress={() => onAddToCart?.(product)}
          fullWidth
          style={{ marginTop: Spacing.sm }}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    flex: 1,
    margin: Spacing.xs,
    ...Shadows.md,
  },
  pressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  imagePlaceholder: {
    height: 110,
    backgroundColor: '#F1F8E9',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: Colors.error,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    color: '#fff',
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.bold,
  },
  info: {
    padding: Spacing.sm,
  },
  name: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  unit: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginBottom: Spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    fontSize: FontSizes.base,
    fontWeight: FontWeights.bold,
    color: Colors.primary,
  },
  originalPrice: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  savingsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 4,
    backgroundColor: '#F1F8E9',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  savingsText: {
    fontSize: FontSizes.xs,
    color: Colors.primary,
    fontWeight: FontWeights.semibold,
  },
});
