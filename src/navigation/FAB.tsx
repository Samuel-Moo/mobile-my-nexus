import React from 'react';
import { Pressable, View } from 'react-native';
import { useNFTheme } from '../ui/nf';
import { useNavContext } from './NavContext';

export function FAB() {
  const { openSwitcher } = useNavContext();
  const t = useNFTheme();

  return (
    <Pressable
      onPress={openSwitcher}
      style={{ position: 'absolute', right: 18, bottom: 22, width: 52, height: 52,
        borderRadius: 26, backgroundColor: t.text,
        alignItems: 'center', justifyContent: 'center', zIndex: 30 }}
      accessibilityLabel="Open tab switcher"
      accessibilityRole="button"
    >
      {/* 3×3 nine-dot glyph */}
      <View style={{ gap: 3 }}>
        {[0, 1, 2].map(row => (
          <View key={row} style={{ flexDirection: 'row', gap: 3 }}>
            {[0, 1, 2].map(col => (
              <View key={col} style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: t.bg }} />
            ))}
          </View>
        ))}
      </View>
    </Pressable>
  );
}
