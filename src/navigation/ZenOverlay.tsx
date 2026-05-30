import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavContext } from './NavContext';

interface ZenOverlayProps {
  visible: boolean;
}

export function ZenOverlay({ visible }: ZenOverlayProps) {
  const { exitZen } = useNavContext();
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      onRequestClose={exitZen}
      statusBarTranslucent
    >
      <Pressable
        onPress={exitZen}
        className="flex-1 bg-ink items-center justify-center"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        accessibilityLabel="Exit zen mode"
        accessibilityRole="button"
      >
        {/* Center glyph */}
        <View className="w-[48px] h-[48px] rounded-full border-[1.5px] border-bg/30 items-center justify-center mb-6">
          <View className="w-3 h-3 rounded-full bg-bg opacity-80" />
        </View>
        <Text className="font-mono text-[15px] uppercase tracking-head text-bg font-medium">
          Zen mode
        </Text>
        <Text className="font-mono text-[11px] uppercase tracking-chrome text-bg opacity-50 mt-2">
          Tap to return
        </Text>
      </Pressable>
    </Modal>
  );
}
