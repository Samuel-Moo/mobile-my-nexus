import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavContext } from '../../navigation/NavContext';
import { NavShell } from '../../navigation/NavShell';

type ThemePref = 'light' | 'dark' | 'system';

// ─── Shared primitives ────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <Text className="font-mono text-[11px] uppercase tracking-ultra text-muted mb-3">
      {children}
    </Text>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between items-center py-[10px] border-b border-border">
      <Text className="font-sans text-[13px] text-ink">{label}</Text>
      <Text className="font-mono text-[13px] text-muted">{value}</Text>
    </View>
  );
}

function RowLast({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between items-center pt-[10px]">
      <Text className="font-sans text-[13px] text-ink">{label}</Text>
      <Text className="font-mono text-[13px] text-muted">{value}</Text>
    </View>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <View className="bg-surface border border-border rounded-[4px] p-[14px]">
      {children}
    </View>
  );
}

// ─── Appearance ───────────────────────────────────────────────────────────────

function AppearanceContent() {
  const { setColorScheme } = useColorScheme();
  const [pref, setPref] = useState<ThemePref>('system');

  const handleSet = (value: ThemePref) => {
    setPref(value);
    setColorScheme(value);
  };

  return (
    <View className="pt-4" style={{ gap: 24 }}>
      {/* Theme toggle — ghost button trio */}
      <View>
        <SectionLabel>Theme</SectionLabel>
        <View className="flex-row" style={{ gap: 8 }}>
          {(['light', 'dark', 'system'] as ThemePref[]).map(opt => {
            const active = pref === opt;
            return (
              <Pressable
                key={opt}
                onPress={() => handleSet(opt)}
                className={`flex-1 py-[11px] rounded-[4px] border items-center active:translate-y-[1px] ${
                  active ? 'bg-ink border-ink' : 'bg-transparent border-ink'
                }`}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
              >
                <Text
                  className={`font-mono text-[11px] font-semibold uppercase tracking-widest ${
                    active ? 'text-bg' : 'text-ink'
                  }`}
                >
                  {opt}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Type preview card */}
      <View>
        <SectionLabel>Type preview</SectionLabel>
        <Card>
          <Text className="font-mono text-[11px] uppercase tracking-ultra text-muted mb-2">
            Caption label
          </Text>
          <Text className="font-sans text-[14px] text-ink leading-[22px] mb-2">
            Body copy in Geist — utilitarian and readable across all six tabs.
          </Text>
          <Text className="font-serif text-[14px] text-ink leading-[22px]">
            Newsreader italic for long-form and emphasis.
          </Text>
        </Card>
      </View>
    </View>
  );
}

// ─── Profile ─────────────────────────────────────────────────────────────────

function ProfileContent() {
  return (
    <View className="pt-4">
      <Card>
        <Row label="Display name" value="Samuel" />
        <Row label="Email" value="—" />
        <RowLast label="Account" value="Free" />
      </Card>
    </View>
  );
}

// ─── Units ────────────────────────────────────────────────────────────────────

function UnitsContent() {
  return (
    <View className="pt-4">
      <Card>
        <Row label="Weight" value="kg" />
        <Row label="Distance" value="km" />
        <Row label="Temperature" value="°C" />
        <RowLast label="Currency" value="USD" />
      </Card>
    </View>
  );
}

// ─── Notifications ────────────────────────────────────────────────────────────

function NotificationsContent() {
  return (
    <View className="pt-4">
      <Card>
        <Row label="Daily digest" value="Off" />
        <Row label="Goal reminders" value="On" />
        <RowLast label="Budget alerts" value="On" />
      </Card>
    </View>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

function DataContent() {
  return (
    <View className="pt-4" style={{ gap: 16 }}>
      <Card>
        <SectionLabel>Storage</SectionLabel>
        <Row label="Local data" value="4.2 MB" />
        <RowLast label="Cache" value="1.1 MB" />
      </Card>
      {/* Ghost button */}
      <Pressable
        className="py-[11px] rounded-[4px] border border-ink items-center active:translate-y-[1px]"
        accessibilityRole="button"
      >
        <Text className="font-mono text-[11px] font-semibold uppercase tracking-widest text-ink">
          Export data
        </Text>
      </Pressable>
    </View>
  );
}

// ─── Shell ────────────────────────────────────────────────────────────────────

function SettingsContent() {
  const { subsByTab } = useNavContext();
  const sub = subsByTab['settings'];

  const screens = [
    <AppearanceContent />,
    <ProfileContent />,
    <UnitsContent />,
    <NotificationsContent />,
    <DataContent />,
  ];

  return screens[sub] ?? null;
}

export default function SettingsScreen() {
  return (
    <NavShell tabId="settings">
      <SettingsContent />
    </NavShell>
  );
}
