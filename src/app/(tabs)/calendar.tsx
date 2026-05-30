import { Text, View } from 'react-native';
import { useNavContext } from '../../navigation/NavContext';
import { NavShell } from '../../navigation/NavShell';

const SUBS = ['Month', 'Week', 'Day', 'Agenda', 'Calendars'];

function CalendarContent() {
  const { subsByTab } = useNavContext();
  const sub = subsByTab['calendar'];
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-mono text-chrome uppercase tracking-chrome text-muted">
        {SUBS[sub]}
      </Text>
    </View>
  );
}

export default function CalendarScreen() {
  return (
    <NavShell tabId="calendar">
      <CalendarContent />
    </NavShell>
  );
}
