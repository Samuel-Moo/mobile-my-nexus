import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="finance" />
      <Stack.Screen name="calendar" />
      <Stack.Screen name="goals" />
      <Stack.Screen name="journal" />
      <Stack.Screen name="health" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="switcher" />
      <Stack.Screen name="zen" />
    </Stack>
  );
}
