import React, { useEffect, useRef } from 'react';
import { Animated, Modal, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Crosshairs, DotNum, LiveDot, NFLabel, NFMono, useNFTheme } from '../ui/nf';
import { Icon } from './icons';
import { useNavContext } from './NavContext';

function ConcentricRings() {
  const t = useNFTheme();
  const anim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1.06, duration: 4000, useNativeDriver: false }),
        Animated.timing(anim, { toValue: 0.94, duration: 4000, useNativeDriver: false }),
      ])
    ).start();
    return () => anim.stopAnimation();
  }, []);

  return (
    <View style={{ width: 200, height: 200, alignItems: 'center', justifyContent: 'center', marginTop: 34 }}>
      {[96, 72, 48].map((rad, ri) => (
        <Animated.View key={rad} style={[{
          position: 'absolute',
          width: rad * 2, height: rad * 2,
        }, ri === 0 && { transform: [{ scale: anim }] }]}>
          {Array.from({ length: 32 }).map((_, k) => {
            const ang = (k / 32) * Math.PI * 2;
            const x = rad + Math.cos(ang) * rad;
            const y = rad + Math.sin(ang) * rad;
            return (
              <View key={k} style={{
                position: 'absolute',
                left: x - 1.4, top: y - 1.4,
                width: 2.8, height: 2.8, borderRadius: 1.4,
                backgroundColor: ri === 0 ? t.faint : t.dim,
              }} />
            );
          })}
        </Animated.View>
      ))}
      {/* Center timer */}
      <View style={{ alignItems: 'center' }}>
        <DotNum size={42}>12:48</DotNum>
        <NFLabel size={9} style={{ marginTop: 6 }}>OF 25:00</NFLabel>
      </View>
    </View>
  );
}

interface ZenOverlayProps { visible: boolean }

export function ZenOverlay({ visible }: ZenOverlayProps) {
  const { exitZen } = useNavContext();
  const insets = useSafeAreaInsets();
  const t = useNFTheme();

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      onRequestClose={exitZen}
      statusBarTranslucent
    >
      <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top + 30,
        paddingBottom: insets.bottom + 26, paddingHorizontal: 26, alignItems: 'center' }}>
        <Crosshairs m={12} />

        {/* Header */}
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <NFLabel>Zen · session 02</NFLabel>
          <Pressable onPress={exitZen} hitSlop={12}>
            <Icon name="x" size={18} color={t.muted} strokeWidth={1.7} />
          </Pressable>
        </View>

        <ConcentricRings />

        <Text style={{ fontFamily: 'Geist', fontSize: 14, color: t.dim,
          textAlign: 'center', marginTop: 30, lineHeight: 21, maxWidth: '80%' }}>
          Inhale four, hold seven, exhale eight.
        </Text>

        {/* Bottom section */}
        <View style={{ marginTop: 'auto', width: '100%', gap: 8 }}>
          {/* Blocking status */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10,
            paddingVertical: 12, paddingHorizontal: 14,
            borderWidth: 1, borderColor: t.border, borderRadius: 4 }}>
            <Icon name="lock" size={18} color={t.accent} strokeWidth={1.6} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12.5, fontWeight: '600', color: t.text }}>
                Blocking 7 apps · 0 attempts
              </Text>
              <NFMono size={9.5} color={t.muted} style={{ marginTop: 2 }}>
                INSTAGRAM · X · MAIL · SLACK · …
              </NFMono>
            </View>
            <LiveDot />
          </View>

          {/* Action buttons */}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={{ flex: 1, alignItems: 'center', paddingVertical: 12,
              borderWidth: 1, borderColor: t.border, borderRadius: 4 }}>
              <Text style={{ fontFamily: 'GeistMono', fontSize: 11, letterSpacing: 1,
                textTransform: 'uppercase', color: t.muted }}>+5 MIN</Text>
            </View>
            <Pressable onPress={exitZen} style={{ flex: 1, alignItems: 'center', paddingVertical: 12,
              backgroundColor: t.text, borderRadius: 4 }}>
              <Text style={{ fontFamily: 'GeistMono', fontSize: 11, fontWeight: '600',
                letterSpacing: 1, textTransform: 'uppercase', color: t.bg }}>END</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
