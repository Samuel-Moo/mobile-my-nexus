import { Text, View } from 'react-native';
import { useNavContext } from '../../navigation/NavContext';
import { NavShell } from '../../navigation/NavShell';

const LEDGER_ROWS = [
  { label: 'Mercado Roma',     amount: '−$42.18',    positive: false },
  { label: 'Stripe payout',   amount: '+$3,200.00',  positive: true  },
  { label: 'Coffee · Cardinal', amount: '−$3.80',   positive: false },
  { label: 'Apartment · rent', amount: '−$1,400.00', positive: false },
  { label: 'Spotify',         amount: '−$10.99',     positive: false },
];

function LedgerPlaceholder() {
  return (
    <View className="pt-2">
      <View className="bg-surface border border-border rounded-[4px] p-[14px]">
        {LEDGER_ROWS.map(({ label, amount, positive }, i) => (
          <View
            key={label}
            className={`flex-row justify-between items-center py-[10px] ${
              i < LEDGER_ROWS.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <Text className="font-sans text-[13px] text-ink">{label}</Text>
            <Text
              className={`font-mono text-[14px] font-medium ${positive ? 'text-good' : 'text-ink'}`}
              style={{ fontVariant: ['tabular-nums'] }}
            >
              {amount}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function SubPlaceholder({ label }: { label: string }) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-mono text-chrome uppercase tracking-chrome text-muted">{label}</Text>
    </View>
  );
}

function FinanceContent() {
  const { subsByTab } = useNavContext();
  const sub = subsByTab['finance'];

  const screens = [
    <LedgerPlaceholder />,
    <SubPlaceholder label="Accounts" />,
    <SubPlaceholder label="Budgets" />,
    <SubPlaceholder label="Analytics" />,
    <SubPlaceholder label="Recurring" />,
  ];

  return screens[sub] ?? null;
}

export default function FinanceScreen() {
  return (
    <NavShell tabId="finance">
      <FinanceContent />
    </NavShell>
  );
}
