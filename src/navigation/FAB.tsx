import { useColorScheme } from 'nativewind';
import React from 'react';
import { Pressable } from 'react-native';
import { Icon } from './icons';
import { useNavContext } from './NavContext';

export function FAB() {
  const { openSwitcher } = useNavContext();
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#f5f5f7' : '#0a0a0a';

  return (
    <Pressable
      onPress={openSwitcher}
      delayLongPress={500}
      className="absolute right-[18px] bottom-[22px] z-10 w-[54px] h-[54px] rounded-fab
                 bg-transparent border-[1.5px] border-ink items-center justify-center
                 active:translate-y-[1px]"
      accessibilityLabel="Open tab switcher"
      accessibilityRole="button"
    >
      <Icon name="grid" size={22} color={iconColor} strokeWidth={2} />
    </Pressable>
  );
}
