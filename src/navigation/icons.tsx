import React from 'react';
import Svg, { Circle, Line, Path, Polyline, Rect } from 'react-native-svg';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  fill?: string;
}

export function Icon({ name, size = 20, color = '#0a0a0a', strokeWidth = 1.5, fill = 'none' }: IconProps) {
  const s = { stroke: color, strokeWidth, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill };

  switch (name) {
    // ── Tab icons ───────────────────────────────────────────────────
    case 'finance':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M12 3v18" {...s} />
          <Path d="M16.5 7H10a2.5 2.5 0 100 5h4a2.5 2.5 0 110 5H7.5" {...s} />
        </Svg>
      );
    case 'calendar':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Rect x="3" y="5" width="18" height="16" rx="2" {...s} />
          <Path d="M8 3v4M16 3v4M3 10h18" {...s} />
        </Svg>
      );
    case 'goals':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="12" r="8.5" {...s} />
          <Circle cx="12" cy="12" r="4.5" {...s} />
          <Circle cx="12" cy="12" r="1.2" fill={color} stroke="none" />
        </Svg>
      );
    case 'write':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M4 20l4-1L20.5 6.5a2.1 2.1 0 00-3-3L5 16l-1 4z" {...s} />
          <Path d="M14 5.5l3 3" {...s} />
        </Svg>
      );
    case 'health':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M3 12h3.5l2-5 3.5 10 2.5-7 1.5 4 1.5-2H21" {...s} />
        </Svg>
      );
    case 'settings':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="12" r="3" {...s} />
          <Path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" {...s} />
        </Svg>
      );

    // ── UI icons ────────────────────────────────────────────────────
    case 'grid':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Rect x="3" y="3" width="7" height="7" rx="1.5" {...s} />
          <Rect x="14" y="3" width="7" height="7" rx="1.5" {...s} />
          <Rect x="3" y="14" width="7" height="7" rx="1.5" {...s} />
          <Rect x="14" y="14" width="7" height="7" rx="1.5" {...s} />
        </Svg>
      );
    case 'x':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M18 6L6 18M6 6l12 12" {...s} />
        </Svg>
      );
    case 'arrowR':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M5 12h14M13 5l7 7-7 7" {...s} />
        </Svg>
      );
    case 'arrowD':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M12 5v14M5 13l7 7 7-7" {...s} />
        </Svg>
      );
    case 'chevl':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M15 18l-6-6 6-6" {...s} />
        </Svg>
      );
    case 'chev':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M9 18l6-6-6-6" {...s} />
        </Svg>
      );
    case 'check':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M20 6L9 17l-5-5" {...s} />
        </Svg>
      );
    case 'plus':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M12 5v14M5 12h14" {...s} />
        </Svg>
      );
    case 'search':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx="11" cy="11" r="7" {...s} />
          <Path d="M21 21l-4.35-4.35" {...s} />
        </Svg>
      );
    case 'filter':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" {...s} />
        </Svg>
      );
    case 'sort':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M3 6h18M7 12h10M11 18h2" {...s} />
        </Svg>
      );
    case 'drag':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx="9" cy="6" r="1" fill={color} stroke="none" />
          <Circle cx="15" cy="6" r="1" fill={color} stroke="none" />
          <Circle cx="9" cy="12" r="1" fill={color} stroke="none" />
          <Circle cx="15" cy="12" r="1" fill={color} stroke="none" />
          <Circle cx="9" cy="18" r="1" fill={color} stroke="none" />
          <Circle cx="15" cy="18" r="1" fill={color} stroke="none" />
        </Svg>
      );
    case 'tag':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" {...s} />
          <Line x1="7" y1="7" x2="7.01" y2="7" {...s} strokeWidth={2.5} />
        </Svg>
      );
    case 'apple':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M12 2a3 3 0 013 3" {...s} />
          <Path d="M17.5 8C19.5 8 21 9.5 21 11.5c0 4-3.5 9-9 9s-9-5-9-9C3 9.5 4.5 8 6.5 8c1 0 2 .5 2.5 1a3 3 0 005 0c.5-.5 1.5-1 2.5-1z" {...s} />
        </Svg>
      );
    case 'doc':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" {...s} />
          <Polyline points="14 2 14 8 20 8" {...s} />
          <Line x1="16" y1="13" x2="8" y2="13" {...s} />
          <Line x1="16" y1="17" x2="8" y2="17" {...s} />
          <Polyline points="10 9 9 9 8 9" {...s} />
        </Svg>
      );
    case 'system':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Rect x="2" y="3" width="20" height="14" rx="2" {...s} />
          <Path d="M8 21h8M12 17v4" {...s} />
        </Svg>
      );
    case 'lock':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Rect x="3" y="11" width="18" height="11" rx="2" {...s} />
          <Path d="M7 11V7a5 5 0 0110 0v4" {...s} />
        </Svg>
      );
    case 'mic':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M12 2a3 3 0 013 3v6a3 3 0 01-6 0V5a3 3 0 013-3z" {...s} />
          <Path d="M19 10v1a7 7 0 01-14 0v-1M12 19v3M8 23h8" {...s} />
        </Svg>
      );
    case 'pause':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill !== 'none' ? fill : 'none'}>
          <Rect x="6" y="4" width="4" height="16" {...s} fill={fill} />
          <Rect x="14" y="4" width="4" height="16" {...s} fill={fill} />
        </Svg>
      );
    case 'image':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Rect x="3" y="3" width="18" height="18" rx="2" {...s} />
          <Circle cx="8.5" cy="8.5" r="1.5" {...s} />
          <Polyline points="21 15 16 10 5 21" {...s} />
        </Svg>
      );
    case 'star':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
          <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case 'sparkles':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" {...s} />
          <Path d="M5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75L5 3z" {...s} />
          <Path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75L19 15z" {...s} />
        </Svg>
      );
    case 'edit':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" {...s} />
          <Path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" {...s} />
        </Svg>
      );
    case 'bat':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Rect x="1" y="7" width="18" height="11" rx="2" {...s} />
          <Path d="M23 11v3" {...s} strokeWidth={strokeWidth + 0.5} />
          <Rect x="3" y="9" width="10" height="7" rx="1" fill={color} stroke="none" />
        </Svg>
      );
    case 'wifi':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0" {...s} />
          <Circle cx="12" cy="20" r="1" fill={color} stroke="none" />
        </Svg>
      );
    case 'dumbbell':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M6 4v16M18 4v16M6 8h2M6 16h2M16 8h2M16 16h2M8 12h8" {...s} />
        </Svg>
      );
    case 'bed':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path d="M2 4v16M2 8h20v12H2M2 12h20" {...s} />
          <Path d="M7 12V8M17 12V8a4 4 0 00-4-4h-2a4 4 0 00-4 4" {...s} />
        </Svg>
      );
    default:
      return null;
  }
}
