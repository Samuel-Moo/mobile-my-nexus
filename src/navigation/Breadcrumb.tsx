import React, { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useNFTheme } from '../ui/nf';
import { useNavContext } from './NavContext';
import { TABS, TabId } from './TabsData';

function BreadcrumbDot({ tabId, active }: { tabId: TabId; active: boolean }) {
  const t = useNFTheme();
  const width = useSharedValue(active ? 14 : 4);

  useEffect(() => {
    width.value = withTiming(active ? 14 : 4, { duration: 200 });
  }, [active]);

  const animStyle = useAnimatedStyle(() => ({ width: width.value }));

  return (
    <Animated.View style={[animStyle, {
      height: 4, borderRadius: 0,
      backgroundColor: active ? t.accent : t.faint,
    }]} />
  );
}

interface BreadcrumbProps {
  tabId: TabId;
  subName: string;
}

export function Breadcrumb({ tabId, subName }: BreadcrumbProps) {
  const { activeTabId, openSwitcher } = useNavContext();
  const t = useNFTheme();
  const tab = TABS.find(t => t.id === tabId)!;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingHorizontal: 18, paddingTop: 6, height: 30 }}>
      <Pressable
        onPress={openSwitcher}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}
        accessibilityLabel="Open tab switcher"
        accessibilityRole="button"
      >
        {/* Six-dot progress track */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          {TABS.map(x => (
            <BreadcrumbDot key={x.id} tabId={x.id} active={x.id === activeTabId} />
          ))}
        </View>
        {/* TAB / Sub readout */}
        <Text style={{ fontFamily: 'GeistMono', fontSize: 10, fontWeight: '600',
          letterSpacing: 1.4, textTransform: 'uppercase', color: t.text }}>
          {tab.label}
        </Text>
        <Text style={{ fontFamily: 'GeistMono', fontSize: 10, color: t.muted, letterSpacing: 1 }}>
          /
        </Text>
        <Text style={{ fontFamily: 'GeistMono', fontSize: 10, color: t.muted,
          letterSpacing: 1.2, textTransform: 'uppercase' }} numberOfLines={1}>
          {subName}
        </Text>
      </Pressable>
      {/* Tab code — right side */}
      <Text style={{ fontFamily: 'GeistMono', fontSize: 9, color: t.faint, letterSpacing: 1.44 }}>
        {tab.code}
      </Text>
    </View>
  );
}
