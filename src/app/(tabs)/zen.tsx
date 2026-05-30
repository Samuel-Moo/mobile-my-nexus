import { Redirect } from 'expo-router';

// Zen mode is a Modal overlay triggered from NavShell — no dedicated route needed.
export default function Zen() {
  return <Redirect href="/(tabs)/finance" />;
}
