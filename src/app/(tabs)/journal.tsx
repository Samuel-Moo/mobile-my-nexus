import { Text, View } from 'react-native';
import { useNavContext } from '../../navigation/NavContext';
import { NavShell } from '../../navigation/NavShell';

const SUBS = ['Documents', 'Books', 'Prompts', 'Voice', 'OCR'];

function WriteContent() {
  const { subsByTab } = useNavContext();
  const sub = subsByTab['write'];
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-mono text-chrome uppercase tracking-chrome text-muted">
        {SUBS[sub]}
      </Text>
    </View>
  );
}

export default function JournalScreen() {
  return (
    <NavShell tabId="write">
      <WriteContent />
    </NavShell>
  );
}
