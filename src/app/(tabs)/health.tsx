import { Text, View } from 'react-native';
import { useNavContext } from '../../navigation/NavContext';
import { NavShell } from '../../navigation/NavShell';

const SUBS = ['Dashboard', 'Calories', 'Weight', 'Exercise', 'Sleep'];

function HealthContent() {
  const { subsByTab } = useNavContext();
  const sub = subsByTab['health'];
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-mono text-chrome uppercase tracking-chrome text-muted">
        {SUBS[sub]}
      </Text>
    </View>
  );
}

export default function HealthScreen() {
  return (
    <NavShell tabId="health">
      <HealthContent />
    </NavShell>
  );
}
