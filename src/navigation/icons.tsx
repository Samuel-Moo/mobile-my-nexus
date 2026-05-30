import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 20, color = '#0a0a0a', strokeWidth = 1.5 }: IconProps) {
  const s = { stroke: color, strokeWidth, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  switch (name) {
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
          <Path
            d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
            {...s}
          />
        </Svg>
      );
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
    default:
      return null;
  }
}
