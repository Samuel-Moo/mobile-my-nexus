import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useNFTheme } from '../ui/nf';
import { useNavContext } from './NavContext';
import { TabId } from './TabsData';

interface SubtabStripProps {
  tabId: TabId;
  subs: string[];
}

export function SubtabStrip({ tabId, subs }: SubtabStripProps) {
  const { subsByTab, setSub } = useNavContext();
  const activeIdx = subsByTab[tabId];
  const t = useNFTheme();

  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: t.line }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 18, paddingVertical: 12, gap: 16 }}
        style={{ height: 44 }}
      >
        {subs.map((sub, idx) => {
          const active = idx === activeIdx;
          return (
            <Pressable key={sub} onPress={() => setSub(idx)}
              style={{ paddingVertical: 2, borderBottomWidth: 2,
                borderBottomColor: active ? t.accent : 'transparent' }}>
              <Text style={{
                fontFamily: 'GeistMono', fontSize: 10.5,
                fontWeight: active ? '600' : '500',
                letterSpacing: 1.05, textTransform: 'uppercase',
                color: active ? t.text : t.muted,
              }}>
                {sub}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
