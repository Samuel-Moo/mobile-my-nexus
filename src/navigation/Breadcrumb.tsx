import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Icon } from './icons';
import { useNavContext } from './NavContext';
import { TABS, TabId } from './TabsData';

// Static accent class maps — never interpolate dynamically (Tailwind JIT purges unseen classes)
const ACCENT_BG: Record<TabId, string> = {
  finance:  'bg-finance',
  calendar: 'bg-calendar',
  goals:    'bg-goals',
  write:    'bg-write',
  health:   'bg-health',
  settings: 'bg-settings',
};

function BreadcrumbDot({ tabId, active }: { tabId: TabId; active: boolean }) {
  const width = useSharedValue(active ? 12 : 4);

  useEffect(() => {
    width.value = withTiming(active ? 12 : 4, { duration: 200 });
  }, [active]);

  const animStyle = useAnimatedStyle(() => ({ width: width.value }));
  const accentClass = ACCENT_BG[tabId];

  return (
    <Animated.View
      style={animStyle}
      className={`h-1 rounded-dot ${active ? accentClass : 'bg-border'}`}
    />
  );
}

interface BreadcrumbProps {
  tabId: TabId;
  subName: string;
}

export function Breadcrumb({ tabId, subName }: BreadcrumbProps) {
  const { activeTabId, openSwitcher } = useNavContext();
  const { colorScheme } = useColorScheme();
  const tab = TABS.find(t => t.id === tabId)!;
  const mutedColor = colorScheme === 'dark' ? '#98989f' : '#6e6e76';

  return (
    <View className="flex-row items-center justify-between px-[18px] pt-2 h-[30px]">
      <Pressable
        onPress={openSwitcher}
        className="flex-row items-center gap-1 flex-1"
        accessibilityLabel="Open tab switcher"
        accessibilityRole="button"
      >
        {TABS.map(t => (
          <BreadcrumbDot key={t.id} tabId={t.id} active={t.id === activeTabId} />
        ))}
        <Text
          className="ml-2 font-mono text-chrome uppercase tracking-chrome text-ink font-semibold"
          numberOfLines={1}
        >
          {tab.label}
          <Text className="text-muted font-medium"> / {subName}</Text>
        </Text>
      </Pressable>
      <Icon name="grid" size={14} color={mutedColor} strokeWidth={1.5} />
    </View>
  );
}
