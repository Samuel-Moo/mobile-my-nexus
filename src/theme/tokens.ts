/**
 * Design tokens — Electric Clarity palette, Concept C · Compact Index
 *
 * Use this file when you need raw values: StyleSheet.create(), Animated,
 * third-party components that don't accept className.
 *
 * For className-based styling use the NativeWind utilities from tailwind.config.js.
 */

import { useColorScheme } from 'react-native';

// ─── Tab IDs ──────────────────────────────────────────────────────────────────

export type TabId = 'finance' | 'calendar' | 'goals' | 'write' | 'health' | 'settings';

export const TAB_IDS: TabId[] = ['finance', 'calendar', 'goals', 'write', 'health', 'settings'];

// ─── Raw color values ─────────────────────────────────────────────────────────

export const COLORS = {
  light: {
    bg:         '#ffffff',
    surface:    '#fafafa',
    surfaceAlt: '#f0f0f2',
    border:     '#e5e5e8',
    muted:      '#6e6e76',
    text:       '#0a0a0a',
    danger:     '#a8423d',
    good:       '#2f8f4d',
    tabs: {
      finance:  '#a8423d', // Terracotta
      calendar: '#1c4e9e', // Atlas blue
      goals:    '#f08c00', // Marker amber
      write:    '#5f3dc4', // Ink violet
      health:   '#2f8f4d', // Forest moss
      settings: '#495057', // Wet slate
    },
  },
  dark: {
    bg:         '#0a0a0b',
    surface:    '#161618',
    surfaceAlt: '#1f1f23',
    border:     '#2a2a2e',
    muted:      '#98989f',
    text:       '#f5f5f7',
    danger:     '#e87a7a',
    good:       '#3ad29f',
    tabs: {
      finance:  '#e87a7a',
      calendar: '#6ea8fe',
      goals:    '#ffd43b',
      write:    '#9775fa',
      health:   '#3ad29f',
      settings: '#adb5bd',
    },
  },
} as const;

// ─── Typography — Compact Index ───────────────────────────────────────────────
// letterSpacing is in pixels (em × fontSize). fontVariant typed for RN.

export const TYPE = {
  display: {
    fontFamily: 'GeistMono',
    fontWeight: '500' as const,
    fontSize: 72,
    lineHeight: 68,
    letterSpacing: 2.88, // 0.04 × 72
    textTransform: 'uppercase' as const,
  },
  h1: {
    fontFamily: 'GeistMono',
    fontWeight: '500' as const,
    fontSize: 42,
    lineHeight: 42,
    letterSpacing: 2.52, // 0.06 × 42
    textTransform: 'uppercase' as const,
  },
  h2: {
    fontFamily: 'GeistMono',
    fontWeight: '500' as const,
    fontSize: 30,
    lineHeight: 30,
    letterSpacing: 2.1,  // 0.07 × 30
    textTransform: 'uppercase' as const,
  },
  h3: {
    fontFamily: 'GeistMono',
    fontWeight: '500' as const,
    fontSize: 22,
    lineHeight: 22,
    letterSpacing: 1.76, // 0.08 × 22
    textTransform: 'uppercase' as const,
  },
  h4: {
    fontFamily: 'GeistMono',
    fontWeight: '500' as const,
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 1.6,  // 0.10 × 16
    textTransform: 'uppercase' as const,
  },
  h5: {
    fontFamily: 'GeistMono',
    fontWeight: '600' as const,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 1.76, // 0.16 × 11
    textTransform: 'uppercase' as const,
  },
  body: {
    fontFamily: 'Geist',
    fontWeight: '400' as const,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.07, // -0.005 × 14
  },
  caption: {
    fontFamily: 'GeistMono',
    fontWeight: '400' as const,
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1.6,  // 0.16 × 10
    textTransform: 'uppercase' as const,
  },
  monoNum: {
    fontFamily: 'GeistMono',
    fontWeight: '500' as const,
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: -0.18, // -0.01 × 18
    fontVariant: ['tabular-nums'] as const,
  },
  button: {
    fontFamily: 'GeistMono',
    fontWeight: '600' as const,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 1.32, // 0.12 × 11
    textTransform: 'uppercase' as const,
  },
  serif: {
    fontFamily: 'Newsreader',
    fontWeight: '400' as const,
    fontStyle: 'italic' as const,
    fontSize: 14,
    lineHeight: 22,
  },
} as const;

// ─── Shape ───────────────────────────────────────────────────────────────────

export const RADIUS = {
  sm:   4,   // Compact Index (this app's default)
  md:   10,  // Refined Editorial
  lg:   18,  // Expressive Bold
  full: 9999,
} as const;

export const BORDER_WIDTH = 1;

// ─── Hooks ───────────────────────────────────────────────────────────────────

/** Returns the full color palette for the current device color scheme. */
export function useColors() {
  const scheme = useColorScheme();
  return COLORS[scheme === 'dark' ? 'dark' : 'light'];
}

/** Returns the accent hex color for a specific tab, respecting color scheme. */
export function useTabAccent(tabId: TabId): string {
  const colors = useColors();
  return colors.tabs[tabId];
}

// ─── Font setup (do this once in src/app/_layout.tsx) ────────────────────────
//
// Download Geist, Geist Mono, and Newsreader .ttf files into assets/fonts/,
// then load them like this:
//
//   import { useFonts } from 'expo-font';
//   import * as SplashScreen from 'expo-splash-screen';
//
//   SplashScreen.preventAutoHideAsync();
//
//   export default function RootLayout() {
//     const [loaded] = useFonts({
//       Geist:               require('../../assets/fonts/Geist-Regular.ttf'),
//       'Geist-Medium':      require('../../assets/fonts/Geist-Medium.ttf'),
//       'Geist-SemiBold':    require('../../assets/fonts/Geist-SemiBold.ttf'),
//       'Geist-Bold':        require('../../assets/fonts/Geist-Bold.ttf'),
//       GeistMono:           require('../../assets/fonts/GeistMono-Regular.ttf'),
//       'GeistMono-Medium':  require('../../assets/fonts/GeistMono-Medium.ttf'),
//       'GeistMono-SemiBold':require('../../assets/fonts/GeistMono-SemiBold.ttf'),
//       Newsreader:          require('../../assets/fonts/Newsreader-Italic.ttf'),
//     });
//     useEffect(() => { if (loaded) SplashScreen.hideAsync(); }, [loaded]);
//     if (!loaded) return null;
//     ...
//   }
//
// Font files:
//   Geist & Geist Mono → https://github.com/vercel/geist-font/releases
//   Newsreader         → https://fonts.google.com/specimen/Newsreader
