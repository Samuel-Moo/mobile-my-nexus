import React from 'react';
import { Dimensions, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NFLabel, NFMono, useNFTheme } from '../ui/nf';
import { Icon } from './icons';
import { useNavContext } from './NavContext';
import { TABS, TabId } from './TabsData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 32 - 8) / 2;
const CARD_HEIGHT = Math.round(CARD_WIDTH * 0.92);

function TabCard({ tab, isActive }: { tab: (typeof TABS)[0]; isActive: boolean }) {
  const { pickTab } = useNavContext();
  const t = useNFTheme();
  const idx = TABS.indexOf(tab);

  return (
    <Pressable
      onPress={() => pickTab(tab.id as TabId)}
      style={[{
        width: CARD_WIDTH, height: CARD_HEIGHT,
        borderRadius: 4, padding: 12,
        justifyContent: 'space-between', overflow: 'hidden',
        borderWidth: 1,
        backgroundColor: isActive ? t.text : 'transparent',
        borderColor: isActive ? t.text : t.border,
      }]}
    >
      {/* Active red dot */}
      {isActive && (
        <View style={{ position: 'absolute', top: 10, right: 10,
          width: 5, height: 5, borderRadius: 2.5, backgroundColor: t.accent }} />
      )}

      {/* Top row: icon + index number */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Icon name={tab.id} size={20} color={isActive ? t.bg : t.text} strokeWidth={1.8} />
        <NFMono size={8.5} color={isActive ? t.bg : t.faint} style={{ opacity: isActive ? 0.7 : 1 }}>
          0{idx + 1}
        </NFMono>
      </View>

      {/* Mini dot glyph row */}
      <View style={{ flexDirection: 'row', gap: 3, marginTop: 4 }}>
        {Array.from({ length: 7 }).map((_, k) => (
          <View key={k} style={{
            width: 3, height: 3, borderRadius: 1.5,
            backgroundColor: k < idx + 2
              ? (isActive ? t.bg : t.accent)
              : (isActive ? `${t.bg}40` : t.dotOff),
          }} />
        ))}
      </View>

      {/* Label block */}
      <View>
        <Text style={{ fontFamily: 'GeistMono', fontSize: 16, fontWeight: '700',
          textTransform: 'uppercase', letterSpacing: 0.48,
          color: isActive ? t.bg : t.text }}>
          {tab.label}
        </Text>
        <NFMono size={8.5} color={isActive ? `${t.bg}99` : t.muted} style={{ letterSpacing: 0.85 }}>
          {tab.subs.length} SCREENS
        </NFMono>
      </View>
    </Pressable>
  );
}

function ZenEntry() {
  const { enterZen } = useNavContext();
  const t = useNFTheme();
  return (
    <Pressable onPress={enterZen} style={{ position: 'relative', overflow: 'hidden',
      borderWidth: 1, borderColor: t.border, borderRadius: 4, padding: 13,
      marginHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* Dot-grid background */}
      <View style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
        {Array.from({ length: 6 }).map((_, r) => (
          <View key={r} style={{ flexDirection: 'row' }}>
            {Array.from({ length: 20 }).map((_, c) => (
              <View key={c} style={{ width: 9, height: 9, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 1.5, height: 1.5, borderRadius: 0.75, backgroundColor: t.dotOff }} />
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Content */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, position: 'relative' }}>
        <View style={{ width: 28, height: 28, borderRadius: 14, borderWidth: 1.5, borderColor: t.text,
          alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 7, height: 7, borderRadius: 3.5, backgroundColor: t.accent }} />
        </View>
        <View>
          <Text style={{ fontFamily: 'GeistMono', fontSize: 15, fontWeight: '700',
            textTransform: 'uppercase', letterSpacing: 0.45, color: t.text }}>
            Zen mode
          </Text>
          <NFMono size={9} color={t.muted} style={{ letterSpacing: 0.9 }}>
            HIDE CHROME · BREATHE
          </NFMono>
        </View>
      </View>
      <Icon name="arrowR" size={16} color={t.text} strokeWidth={2} />
    </Pressable>
  );
}

interface SwitcherOverlayProps { visible: boolean }

export function SwitcherOverlay({ visible }: SwitcherOverlayProps) {
  const { activeTabId, closeSwitcher } = useNavContext();
  const insets = useSafeAreaInsets();
  const t = useNFTheme();

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      onRequestClose={closeSwitcher}
      statusBarTranslucent
    >
      <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 18, paddingTop: 10, paddingBottom: 6,
          flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <NFLabel>Switch · 06 modules</NFLabel>
          <Pressable onPress={closeSwitcher} hitSlop={12} accessibilityLabel="Close switcher">
            <Icon name="x" size={20} color={t.text} strokeWidth={1.7} />
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}>
          {/* 2×3 tab grid */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16,
            paddingBottom: 8, gap: 8 }}>
            {TABS.map(tab => (
              <TabCard key={tab.id} tab={tab} isActive={tab.id === activeTabId} />
            ))}
          </View>

          {/* Zen entry */}
          <ZenEntry />

          {/* Drag handle */}
          <View style={{ alignItems: 'center', paddingTop: 10, paddingBottom: 18 }}>
            <View style={{ width: 44, height: 3, borderRadius: 0, backgroundColor: t.faint }} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
