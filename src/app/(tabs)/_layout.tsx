import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="switcher" />
      <Stack.Screen name="finance" />
      <Stack.Screen name="calendar" />
      <Stack.Screen name="goals" />
      <Stack.Screen name="journal" />
      <Stack.Screen name="health" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="zen" />
    </Stack>
  );
}
