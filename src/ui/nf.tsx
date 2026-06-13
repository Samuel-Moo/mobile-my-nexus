// Nothing Edition — shared primitives
// Strict monochrome + signature red. Translated from the HTML/JSX prototype.
import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Polyline } from 'react-native-svg';
import { useColorScheme } from 'nativewind';

// ── Theme tokens ─────────────────────────────────────────────────────────────

export interface NFTheme {
  bg: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  line: string;
  text: string;
  dim: string;
  muted: string;
  faint: string;
  accent: string;
  onAccent: string;
  dotOff: string;
}

export const NF_DARK: NFTheme = {
  bg:         '#000000',
  surface:    '#0b0b0c',
  surfaceAlt: '#161618',
  border:     '#262629',
  line:       '#1d1d20',
  text:       '#ffffff',
  dim:        '#c6c6cb',
  muted:      '#6c6c72',
  faint:      '#3a3a3e',
  accent:     '#ff2d2d',
  onAccent:   '#ffffff',
  dotOff:     '#222226',
};

export const NF_LIGHT: NFTheme = {
  bg:         '#ffffff',
  surface:    '#f6f6f4',
  surfaceAlt: '#ececea',
  border:     '#e0e0dd',
  line:       '#ececea',
  text:       '#000000',
  dim:        '#2a2a2a',
  muted:      '#8a8a88',
  faint:      '#c4c4c1',
  accent:     '#e1140b',
  onAccent:   '#ffffff',
  dotOff:     '#dcdcd8',
};

export function useNFTheme(): NFTheme {
  const { colorScheme } = useColorScheme();
  return colorScheme === 'dark' ? NF_DARK : NF_LIGHT;
}

// ── Typography ────────────────────────────────────────────────────────────────

interface DotTitleProps { children: ReactNode; size?: number; color?: string; style?: object }
export function DotTitle({ children, size = 30, color, style }: DotTitleProps) {
  const t = useNFTheme();
  return (
    <Text style={[{ fontFamily: 'GeistMono', fontWeight: '700', fontSize: size,
      lineHeight: size * 1.02, letterSpacing: size * 0.02,
      textTransform: 'uppercase', color: color ?? t.text }, style]}>
      {children}
    </Text>
  );
}

interface DotNumProps { children: ReactNode; size?: number; color?: string; style?: object }
export function DotNum({ children, size = 48, color, style }: DotNumProps) {
  const t = useNFTheme();
  return (
    <Text style={[{ fontFamily: 'GeistMono', fontWeight: '600', fontSize: size,
      lineHeight: size, letterSpacing: size * 0.01, color: color ?? t.text }, style]}>
      {children}
    </Text>
  );
}

interface NFLabelProps { children: ReactNode; color?: string; size?: number; style?: object }
export function NFLabel({ children, color, size = 9.5, style }: NFLabelProps) {
  const t = useNFTheme();
  return (
    <Text style={[{ fontFamily: 'GeistMono', fontSize: size, fontWeight: '500',
      letterSpacing: size * 0.18, textTransform: 'uppercase', color: color ?? t.muted }, style]}>
      {children}
    </Text>
  );
}

interface NFMonoProps { children: ReactNode; color?: string; size?: number; weight?: string; style?: object }
export function NFMono({ children, color, size = 12, weight = '500', style }: NFMonoProps) {
  const t = useNFTheme();
  return (
    <Text style={[{ fontFamily: 'GeistMono', fontSize: size,
      fontWeight: weight as any, color: color ?? t.dim }, style]}>
      {children}
    </Text>
  );
}

// ── Layout primitives ─────────────────────────────────────────────────────────

interface NFCardProps {
  children: ReactNode;
  pad?: number;
  style?: object;
  active?: boolean;
  onPress?: () => void;
}
export function NFCard({ children, pad = 14, style, active = false, onPress }: NFCardProps) {
  const t = useNFTheme();
  const inner = (
    <View style={[{
      backgroundColor: t.surface,
      borderWidth: 1,
      borderColor: active ? t.text : t.border,
      borderRadius: 4,
      padding: pad,
      position: 'relative',
    }, style]}>
      {children}
    </View>
  );
  if (onPress) return <Pressable onPress={onPress}>{inner}</Pressable>;
  return inner;
}

interface NFRowProps {
  lead?: ReactNode;
  title: ReactNode;
  sub?: string;
  value?: ReactNode;
  valColor?: string;
  last?: boolean;
  onPress?: () => void;
}
export function NFRow({ lead, title, sub, value, valColor, last = false, onPress }: NFRowProps) {
  const t = useNFTheme();
  const inner = (
    <View style={[s.row, !last && { borderBottomWidth: 1, borderBottomColor: t.line }]}>
      {lead != null && <View style={{ flexShrink: 0 }}>{lead}</View>}
      <View style={{ flex: 1, minWidth: 0, gap: 3 }}>
        {typeof title === 'string'
          ? <Text style={{ fontFamily: 'Geist', fontSize: 13.5, fontWeight: '500', color: t.text }} numberOfLines={1}>{title}</Text>
          : title}
        {sub != null && (
          <Text style={{ fontFamily: 'GeistMono', fontSize: 10.5, color: t.muted, letterSpacing: 0.4 }} numberOfLines={1}>{sub}</Text>
        )}
      </View>
      {value != null && (
        <View style={{ flexShrink: 0 }}>
          {typeof value === 'string'
            ? <Text style={{ fontFamily: 'GeistMono', fontSize: 13.5, fontWeight: '600',
                color: valColor ?? t.text, fontVariant: ['tabular-nums'] }}>{value}</Text>
            : value}
        </View>
      )}
    </View>
  );
  if (onPress) return <Pressable onPress={onPress}>{inner}</Pressable>;
  return inner;
}

interface SecHeadProps { children: string; right?: ReactNode; style?: object }
export function SecHead({ children, right, style }: SecHeadProps) {
  return (
    <View style={[s.secHead, style]}>
      <NFLabel>{children}</NFLabel>
      {right}
    </View>
  );
}

// ── Visual components ─────────────────────────────────────────────────────────

interface NFBarProps { value: number; over?: boolean; h?: number; style?: object }
export function NFBar({ value, over = false, h = 5, style }: NFBarProps) {
  const t = useNFTheme();
  return (
    <View style={[{ width: '100%', height: h, backgroundColor: t.surfaceAlt, overflow: 'hidden' }, style]}>
      <View style={{ width: `${Math.min(100, value)}%`, height: h, backgroundColor: over ? t.accent : t.text }} />
    </View>
  );
}

interface NFTagProps { children: ReactNode; accent?: boolean; style?: object }
export function NFTag({ children, accent = false, style }: NFTagProps) {
  const t = useNFTheme();
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center',
      borderWidth: 1, borderColor: accent ? t.accent : t.border,
      borderRadius: 3, paddingHorizontal: 7, paddingVertical: 3 }, style]}>
      <Text style={{ fontFamily: 'GeistMono', fontSize: 9, fontWeight: '600',
        letterSpacing: 1.08, textTransform: 'uppercase', color: accent ? t.accent : t.muted }}>
        {children}
      </Text>
    </View>
  );
}

interface LiveDotProps { size?: number; on?: boolean; style?: object }
export function LiveDot({ size = 6, on = true, style }: LiveDotProps) {
  const t = useNFTheme();
  return (
    <View style={[{ width: size, height: size, borderRadius: size / 2,
      backgroundColor: on ? t.accent : t.faint }, style]} />
  );
}

interface NFToggleProps { on: boolean }
export function NFToggle({ on }: NFToggleProps) {
  const t = useNFTheme();
  return (
    <View style={{ width: 38, height: 22, borderRadius: 0, borderWidth: 1,
      borderColor: on ? t.text : t.border,
      backgroundColor: on ? t.text : 'transparent', position: 'relative' }}>
      <View style={{ position: 'absolute', top: 2, left: on ? 18 : 2, width: 14, height: 14,
        backgroundColor: on ? t.bg : t.muted }} />
    </View>
  );
}

interface NFRingProps {
  size?: number;
  value?: number;
  stroke?: number;
  color?: string;
  label?: string;
  sub?: string;
}
export function NFRing({ size = 64, value = 70, stroke = 6, color, label, sub }: NFRingProps) {
  const t = useNFTheme();
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const offset = C * (1 - value / 100);
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={t.surfaceAlt} strokeWidth={stroke} />
        <Circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color ?? t.text} strokeWidth={stroke}
          strokeDasharray={`${C} ${C}`} strokeDashoffset={offset} strokeLinecap="butt"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`} />
      </Svg>
      {label != null && (
        <View style={StyleSheet.absoluteFillObject}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'GeistMono', fontSize: size * 0.26, fontWeight: '600', color: t.text, lineHeight: size * 0.28 }}>
              {label}
            </Text>
            {sub != null && (
              <Text style={{ fontFamily: 'GeistMono', fontSize: 7.5, color: t.muted, letterSpacing: 0.75, marginTop: 2 }}>
                {sub}
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

interface NFSparkProps { data: number[]; height?: number; color?: string }
export function NFSpark({ data, height = 28, color }: NFSparkProps) {
  const t = useNFTheme();
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const W = 280;
  const pts = data.map((v, i) =>
    `${(i / (data.length - 1)) * W},${height - ((v - min) / range) * (height - 4) - 2}`
  ).join(' ');
  const lastY = height - ((data[data.length - 1] - min) / range) * (height - 4) - 2;
  return (
    <Svg width="100%" height={height} viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none"
      style={{ marginTop: 6, display: 'flex' }}>
      <Polyline points={pts} fill="none" stroke={color ?? t.text} strokeWidth={1.6} strokeLinejoin="round" />
      <Circle cx={W} cy={lastY} r={3} fill={t.accent} />
    </Svg>
  );
}

// Dot-grid glyph decoration
interface GlyphGridProps {
  rows?: number;
  cols?: number;
  gap?: number;
  dot?: number;
  lit?: (r: number, c: number) => number;
  color?: string;
  style?: object;
}
export function GlyphGrid({ rows = 5, cols = 14, gap = 5, dot = 2.4, lit, color, style }: GlyphGridProps) {
  const t = useNFTheme();
  return (
    <View style={[{ overflow: 'hidden' }, style]}>
      {Array.from({ length: rows }).map((_, r) => (
        <View key={r} style={{ flexDirection: 'row', marginBottom: r < rows - 1 ? gap : 0 }}>
          {Array.from({ length: cols }).map((_, c) => {
            const v = lit ? lit(r, c) : 0;
            return (
              <View key={c} style={{
                width: dot, height: dot, borderRadius: dot / 2,
                backgroundColor: v > 0 ? (color ?? t.accent) : t.dotOff,
                opacity: v > 0 ? v : 1,
                marginRight: c < cols - 1 ? gap : 0,
              }} />
            );
          })}
        </View>
      ))}
    </View>
  );
}

// Corner crosshair marks
interface CrosshairsProps { color?: string; m?: number; len?: number }
export function Crosshairs({ color, m = 8, len = 6 }: CrosshairsProps) {
  const t = useNFTheme();
  const c = color ?? t.faint;
  const tick = (pos: object) => (
    <View style={[{ position: 'absolute', width: len, height: len }, pos]}>
      <View style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, backgroundColor: c }} />
      <View style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, backgroundColor: c }} />
    </View>
  );
  return (
    <>
      {tick({ top: m, left: m })}
      {tick({ top: m, right: m })}
      {tick({ bottom: m, left: m })}
      {tick({ bottom: m, right: m })}
    </>
  );
}

// Monochrome segmented control for settings
interface NFSegProps { options: string[]; active: number }
export function NFSeg({ options, active }: NFSegProps) {
  const t = useNFTheme();
  return (
    <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: t.border }}>
      {options.map((o, i) => (
        <View key={o} style={{
          paddingHorizontal: 10, paddingVertical: 5,
          backgroundColor: i === active ? t.text : 'transparent',
          borderRightWidth: i < options.length - 1 ? 1 : 0,
          borderRightColor: t.border,
        }}>
          <Text style={{ fontFamily: 'GeistMono', fontSize: 10, fontWeight: i === active ? '600' : '500',
            letterSpacing: 0.6, textTransform: 'uppercase',
            color: i === active ? t.bg : t.muted }}>{o}</Text>
        </View>
      ))}
    </View>
  );
}

// Settings row helper
interface SRowProps { label: ReactNode; sub?: string; trailing?: ReactNode; last?: boolean }
export function SRow({ label, sub, trailing, last = false }: SRowProps) {
  const t = useNFTheme();
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
      !last && { borderBottomWidth: 1, borderBottomColor: t.line }]}>
      <View style={{ flex: 1, minWidth: 0 }}>
        {typeof label === 'string'
          ? <Text style={{ fontSize: 13.5, color: t.text, fontWeight: '500' }}>{label}</Text>
          : label}
        {sub != null && (
          <Text style={{ fontFamily: 'GeistMono', fontSize: 9.5, color: t.muted, marginTop: 3, letterSpacing: 0.38 }}>
            {sub}
          </Text>
        )}
      </View>
      {trailing != null && <View style={{ flexShrink: 0 }}>{trailing}</View>}
    </View>
  );
}

// ── Inline sparkline chart ─────────────────────────────────────────────────────

interface MiniBarChartProps {
  data: number[];
  days: string[];
  height?: number;
  positiveColor?: string;
  negativeColor?: string;
}
export function MiniBarChart({ data, days, height = 80, positiveColor, negativeColor }: MiniBarChartProps) {
  const t = useNFTheme();
  const maxAbs = Math.max(...data.map(Math.abs));
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height }}>
      {data.map((v, i) => {
        const h = Math.max(3, (Math.abs(v) / maxAbs) * (height - 16));
        const pos = v >= 0;
        return (
          <View key={i} style={{ flex: 1, alignItems: 'center', gap: 4 }}>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <View style={{ width: 14, height: h, backgroundColor: pos ? (positiveColor ?? t.text) : (negativeColor ?? t.accent) }} />
            </View>
            <NFMono size={9} color={t.muted}>{days[i]}</NFMono>
          </View>
        );
      })}
    </View>
  );
}

// ── StyleSheet ────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  secHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 18,
    marginBottom: 10,
  },
});
