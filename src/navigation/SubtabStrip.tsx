import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useNavContext } from './NavContext';
import { TabId } from './TabsData';

// Static accent border class map
const ACCENT_BORDER: Record<TabId, string> = {
  finance:  'border-finance',
  calendar: 'border-calendar',
  goals:    'border-goals',
  write:    'border-write',
  health:   'border-health',
  settings: 'border-settings',
};

interface SubtabStripProps {
  tabId: TabId;
  subs: string[];
}

export function SubtabStrip({ tabId, subs }: SubtabStripProps) {
  const { subsByTab, setSub } = useNavContext();
  const activeIdx = subsByTab[tabId];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 14, paddingVertical: 10, gap: 14 }}
      style={{ height: 44 }}
    >
      {subs.map((sub, idx) => {
        const active = idx === activeIdx;
        const borderClass = active ? `border-b-2 ${ACCENT_BORDER[tabId]}` : 'border-b-2 border-transparent';
        return (
          <Pressable key={sub} onPress={() => setSub(idx)} className={`py-1 ${borderClass}`}>
            <Text
              className={`font-mono text-chrome uppercase tracking-chrome ${
                active
                  ? 'text-ink font-semibold'
                  : 'text-muted font-medium'
              }`}
            >
              {sub}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
