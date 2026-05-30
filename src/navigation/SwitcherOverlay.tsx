import React from 'react';
import { Dimensions, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { Icon } from './icons';
import { useNavContext } from './NavContext';
import { COLORS } from '../theme/tokens';
import { TABS, TabId } from './TabsData';

// Static class maps — never interpolate dynamically
const CARD_BORDER_ACTIVE: Record<TabId, string> = {
  finance:  'border-finance',
  calendar: 'border-calendar',
  goals:    'border-goals',
  write:    'border-write',
  health:   'border-health',
  settings: 'border-settings',
};

const CARD_DOT: Record<TabId, string> = {
  finance:  'bg-finance',
  calendar: 'bg-calendar',
  goals:    'bg-goals',
  write:    'bg-write',
  health:   'bg-health',
  settings: 'bg-settings',
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 32 - 10) / 2; // (screen - 2×16 px padding - 10 gap) / 2 cols
const CARD_HEIGHT = Math.round(CARD_WIDTH * 1.05);

function TabCard({ tab, isActive }: { tab: (typeof TABS)[0]; isActive: boolean }) {
  const { pickTab } = useNavContext();
  const scheme = useColorScheme();
  const colors = COLORS[scheme === 'dark' ? 'dark' : 'light'];
  const accentColor = colors.tabs[tab.id as TabId];

  const borderClass = isActive
    ? `border-[1.5px] ${CARD_BORDER_ACTIVE[tab.id as TabId]}`
    : 'border border-border';
  const dotClass = CARD_DOT[tab.id as TabId];

  return (
    <Pressable
      onPress={() => pickTab(tab.id as TabId)}
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
      className={`rounded-card bg-surface p-[14px] justify-between ${borderClass} active:translate-y-[1px]`}
    >
      {isActive && (
        <View className={`absolute top-[10px] right-[10px] w-1.5 h-1.5 rounded-full ${dotClass}`} />
      )}
      {/* Icon chip */}
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 4,
          backgroundColor: `${accentColor}1F`, // 12% opacity hex
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name={tab.id} size={18} color={accentColor} strokeWidth={2} />
      </View>
      {/* Label block */}
      <View>
        <Text className="font-sans text-[14px] font-semibold text-ink tracking-[-0.14px]">
          {tab.label}
        </Text>
        <Text className="font-mono text-[10px] text-muted mt-0.5">
          {tab.subs.length} subtabs
        </Text>
      </View>
    </Pressable>
  );
}

function ZenPill() {
  const { enterZen } = useNavContext();
  return (
    <Pressable
      onPress={enterZen}
      className="mx-4 p-[16px] rounded-card bg-ink flex-row items-center justify-between active:translate-y-[1px]"
    >
      <View className="flex-row items-center gap-3">
        {/* Circle glyph */}
        <View className="w-[30px] h-[30px] rounded-full border-[1.5px] border-bg/90 items-center justify-center">
          <View className="w-2 h-2 rounded-full bg-bg" />
        </View>
        <View>
          <Text className="font-mono text-[15px] uppercase tracking-head text-bg font-medium">
            Zen mode
          </Text>
          <Text className="font-mono text-[9.5px] uppercase tracking-head text-bg opacity-70 mt-0.5">
            Hide chrome · breathe
          </Text>
        </View>
      </View>
      <Icon name="arrowR" size={16} color="#ffffff" strokeWidth={2} />
    </Pressable>
  );
}

interface SwitcherOverlayProps {
  visible: boolean;
}

export function SwitcherOverlay({ visible }: SwitcherOverlayProps) {
  const { activeTabId, closeSwitcher } = useNavContext();
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme();
  const colors = COLORS[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={closeSwitcher}
      statusBarTranslucent
    >
      <View className="flex-1 bg-bg" style={{ paddingTop: insets.top }}>
        {/* Header */}
        <View className="px-[18px] pt-[14px] pb-2 flex-row items-center justify-between">
          <Text className="font-mono text-chrome uppercase tracking-chrome text-muted">
            Switch tab
          </Text>
          <Pressable onPress={closeSwitcher} hitSlop={12} accessibilityLabel="Close switcher">
            <Icon name="x" size={20} color={colors.text} strokeWidth={1.5} />
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
        >
          {/* 2×3 tab grid */}
          <View className="flex-row flex-wrap px-4 pb-3" style={{ gap: 10 }}>
            {TABS.map(tab => (
              <TabCard key={tab.id} tab={tab} isActive={tab.id === activeTabId} />
            ))}
          </View>

          {/* Zen pill */}
          <ZenPill />

          {/* Drag handle */}
          <View className="py-1 pb-[18px] items-center mt-2">
            <View className="w-12 h-1 rounded-dot bg-border" />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
