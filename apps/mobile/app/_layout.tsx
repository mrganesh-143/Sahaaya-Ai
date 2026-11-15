import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors } from '../src/constants/theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={Colors.primary} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: Colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/login" options={{ title: 'Sign In to Sahaaya', headerShown: false }} />
        <Stack.Screen name="(auth)/register" options={{ title: 'Join Sahaaya', headerShown: false }} />
        <Stack.Screen name="savings/add-expense" options={{ title: 'Add Expense', presentation: 'modal' }} />
        <Stack.Screen name="savings/add-goal" options={{ title: 'Set Savings Goal', presentation: 'modal' }} />
        <Stack.Screen name="product/[id]" options={{ title: 'Product Details' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
