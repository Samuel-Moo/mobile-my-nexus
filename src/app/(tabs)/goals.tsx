import { Text, View } from 'react-native';
import { useNavContext } from '../../navigation/NavContext';
import { NavShell } from '../../navigation/NavShell';

const SUBS = ['Dashboard', 'Wizard', 'Steps', 'Check-ins', 'Why board'];

function GoalsContent() {
  const { subsByTab } = useNavContext();
  const sub = subsByTab['goals'];
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-mono text-chrome uppercase tracking-chrome text-muted">
        {SUBS[sub]}
      </Text>
    </View>
  );
}

export default function GoalsScreen() {
  return (
    <NavShell tabId="goals">
      <GoalsContent />
    </NavShell>
  );
}
