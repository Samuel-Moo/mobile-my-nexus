import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import {
  DotNum, DotTitle, NFCard, NFLabel, NFMono, NFSeg, NFTag, NFToggle, SRow, SecHead, useNFTheme,
} from '../../ui/nf';
import { Icon } from '../../navigation/icons';
import { TABS } from '../../navigation/TabsData';
import { useNavContext } from '../../navigation/NavContext';
import { NavShell } from '../../navigation/NavShell';

type ThemePref = 'light' | 'dark' | 'system';

function Appearance() {
  const t = useNFTheme();
  const { setColorScheme } = useColorScheme();
  const [theme, setTheme] = useState<ThemePref>('dark');

  const handleTheme = (id: ThemePref) => {
    setTheme(id);
    setColorScheme(id);
  };

  const themeOpts: { id: ThemePref; label: string; light: boolean; split: boolean }[] = [
    { id: 'light',  label: 'LIGHT',  light: true,  split: false },
    { id: 'dark',   label: 'DARK',   light: false, split: false },
    { id: 'system', label: 'SYSTEM', light: false, split: true  },
  ];

  const visibleTabs = TABS.filter(x => x.id !== 'settings');

  return (
    <>
      <DotTitle>Appearance</DotTitle>
      <NFLabel style={{ marginTop: 8 }}>How Everything looks</NFLabel>
      <SecHead>Theme</SecHead>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {themeOpts.map(opt => {
          const active = theme === opt.id;
          return (
            <Pressable key={opt.id} onPress={() => handleTheme(opt.id)}
              style={{ flex: 1, borderWidth: 1, borderColor: active ? t.accent : t.border,
                padding: 8, alignItems: 'center' }}>
              <View style={{ height: 38, width: '100%', marginBottom: 8,
                borderWidth: 1, borderColor: t.border, overflow: 'hidden' }}>
                {opt.split ? (
                  <>
                    <View style={{ position: 'absolute', top: 0, left: 0,
                      width: '50%', bottom: 0, backgroundColor: '#ffffff' }} />
                    <View style={{ position: 'absolute', top: 0, right: 0,
                      width: '50%', bottom: 0, backgroundColor: '#000000' }} />
                  </>
                ) : (
                  <View style={{ flex: 1, backgroundColor: opt.light ? '#ffffff' : '#000000' }} />
                )}
              </View>
              <NFMono size={9} color={active ? t.accent : t.text} weight="600">{opt.label}</NFMono>
            </Pressable>
          );
        })}
      </View>
      <SecHead>Font size</SecHead>
      <NFCard pad={14}>
        <SRow label="Body text" sub="Affects all reading surfaces"
          trailing={<NFSeg options={['S', 'M', 'L']} active={1} />} last />
      </NFCard>
      <SecHead>Tabs · visibility &amp; order</SecHead>
      <NFCard pad={12}>
        {visibleTabs.map((x, i, arr) => (
          <View key={x.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 10,
            paddingVertical: 9,
            borderBottomWidth: i === arr.length - 1 ? 0 : 1,
            borderBottomColor: t.line }}>
            <Icon name="drag" size={14} color={t.faint} strokeWidth={1.6} />
            <View style={{ width: 26, height: 26, borderRadius: 4, borderWidth: 1,
              borderColor: t.border, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={x.id} size={14} color={t.text} strokeWidth={1.6} />
            </View>
            <Text style={{ flex: 1, fontSize: 13, fontWeight: '500', color: t.text }}>{x.label}</Text>
            <NFToggle on={true} />
          </View>
        ))}
      </NFCard>
      <NFLabel style={{ marginTop: 18 }}>Palette · Nothing mono</NFLabel>
    </>
  );
}

function Profile() {
  const t = useNFTheme();
  return (
    <>
      <DotTitle>Profile</DotTitle>
      <NFLabel style={{ marginTop: 8 }}>You · account · personal</NFLabel>
      <NFCard pad={18} style={{ marginTop: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <View style={{ width: 60, height: 60, borderRadius: 30, borderWidth: 1,
            borderColor: t.border, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'GeistMono', fontSize: 22, fontWeight: '700',
              color: t.text }}>RG</Text>
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: t.text }}>Rodrigo García</Text>
            <NFMono size={10} color={t.muted} style={{ marginTop: 4 }}>r.garcia@hey.com</NFMono>
          </View>
          <Icon name="edit" size={16} color={t.muted} strokeWidth={1.7} />
        </View>
      </NFCard>
      <SecHead>Personal details</SecHead>
      <NFCard pad={14}>
        <SRow label="Display name"
          trailing={<Text style={{ fontSize: 13, color: t.text }}>Rodrigo</Text>} />
        <SRow label="Date of birth" sub="Used for BMR · health context"
          trailing={<NFMono size={11} color={t.muted}>1991-03-14</NFMono>} />
        <SRow label="Height"
          trailing={<NFMono size={11} color={t.muted}>176 cm</NFMono>} />
        <SRow label="Biological sex" sub="Optional · Mifflin-St Jeor"
          trailing={<Text style={{ fontSize: 12, color: t.muted }}>Male</Text>} last />
      </NFCard>
      <SecHead>Account</SecHead>
      <NFCard pad={14}>
        <SRow label="Email" sub="Change via auth flow"
          trailing={<Icon name="chev" size={14} color={t.muted} strokeWidth={1.5} />} />
        <SRow label="Change password"
          trailing={<Icon name="chev" size={14} color={t.muted} strokeWidth={1.5} />} />
        <SRow label="Active sessions" sub="3 devices"
          trailing={<Icon name="chev" size={14} color={t.muted} strokeWidth={1.5} />} last />
      </NFCard>
    </>
  );
}

function Units() {
  const t = useNFTheme();
  return (
    <>
      <DotTitle>Units</DotTitle>
      <NFLabel style={{ marginTop: 8 }}>Display · stored canonical</NFLabel>
      <SecHead>Measurements</SecHead>
      <NFCard pad={14}>
        <SRow label="Weight"   trailing={<NFSeg options={['kg', 'lb']} active={0} />} />
        <SRow label="Height"   trailing={<NFSeg options={['cm', 'ft']} active={0} />} />
        <SRow label="Distance" trailing={<NFSeg options={['km', 'mi']} active={0} />} />
        <SRow label="Energy"   trailing={<NFSeg options={['kcal', 'kJ']} active={0} />} last />
      </NFCard>
      <SecHead>Date &amp; time</SecHead>
      <NFCard pad={14}>
        <SRow label="First day of week"
          trailing={<NFSeg options={['Mon', 'Sun']} active={0} />} />
        <SRow label="Date format"
          trailing={
            <NFMono size={10} color={t.muted}
              style={{ paddingHorizontal: 8, paddingVertical: 4,
                borderWidth: 1, borderColor: t.border }}>
              DD/MM/YYYY
            </NFMono>
          } />
        <SRow label="Time format"
          trailing={<NFSeg options={['12h', '24h']} active={1} />} last />
      </NFCard>
      <SecHead>Currency</SecHead>
      <NFCard pad={14}>
        <SRow label="Default currency" sub="ISO 4217"
          trailing={
            <NFMono size={11} color={t.text}
              style={{ paddingHorizontal: 8, paddingVertical: 4,
                borderWidth: 1, borderColor: t.border }}>
              MXN $
            </NFMono>
          } />
        <SRow label="Show cents" trailing={<NFToggle on={true} />} last />
      </NFCard>
    </>
  );
}

function Notifications() {
  return (
    <>
      <DotTitle>Notifications</DotTitle>
      <NFLabel style={{ marginTop: 8 }}>Push · local · per-domain</NFLabel>
      <NFCard pad={14} style={{ marginTop: 14 }}>
        <SRow label="Allow notifications" sub="Master switch · silence everything"
          trailing={<NFToggle on={true} />} last />
      </NFCard>
      <SecHead>Daily reminders</SecHead>
      <NFCard pad={14}>
        <SRow label="Log meals"           sub="Daily at 19:30"            trailing={<NFToggle on={true}  />} />
        <SRow label="Weigh in"            sub="Mon · Wed · Fri at 07:00"  trailing={<NFToggle on={true}  />} />
        <SRow label="Wind down for sleep" sub="22:30 each night"          trailing={<NFToggle on={false} />} />
        <SRow label="Bedtime reminder"    sub="Configured per night"      trailing={<NFToggle on={true}  />} last />
      </NFCard>
      <SecHead>Other tabs</SecHead>
      <NFCard pad={14}>
        <SRow label="Goal check-in"    sub="Sunday weekly review"          trailing={<NFToggle on={true}  />} />
        <SRow label="Calendar events"  sub="Default 15 min before"         trailing={<NFToggle on={true}  />} />
        <SRow label="Exercise reminder" sub="On scheduled training days"   trailing={<NFToggle on={false} />} last />
      </NFCard>
    </>
  );
}

function Data() {
  const t = useNFTheme();
  const seg: [string, number][] = [['WRITE', 46], ['FIN', 22], ['HLT', 14], ['CAL', 10], ['GOL', 8]];
  const segColors = [t.text, t.dim, t.muted, t.dim, t.muted];
  return (
    <>
      <DotTitle>Data</DotTitle>
      <NFLabel style={{ marginTop: 8 }}>Your data · always yours</NFLabel>
      <SecHead>Storage</SecHead>
      <NFCard pad={16}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View>
            <Text style={{ fontSize: 13, fontWeight: '500', color: t.text }}>This account</Text>
            <NFMono size={9.5} color={t.muted} style={{ marginTop: 4 }}>5 TABS · SINCE JAN 2026</NFMono>
          </View>
          <DotNum size={24}>
            84.2<Text style={{ fontSize: 12, color: t.muted }}> MB</Text>
          </DotNum>
        </View>
        <View style={{ flexDirection: 'row', height: 8, overflow: 'hidden', marginTop: 14, gap: 1 }}>
          {seg.map(([n, w], i) => (
            <View key={n} style={{ width: `${w}%`, backgroundColor: segColors[i] }} />
          ))}
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
          {seg.map(([n, w]) => (
            <NFMono key={n} size={9} color={t.muted}>{n} {w}%</NFMono>
          ))}
        </View>
      </NFCard>
      <SecHead>Export · import</SecHead>
      <NFCard pad={14}>
        <SRow label="Export all data" sub="ZIP · one JSON per tab"
          trailing={<Icon name="arrowD" size={14} color={t.text} strokeWidth={1.8} />} />
        <SRow label="Import data" sub="JSON schema v1"
          trailing={<NFTag>SOON</NFTag>} />
        <SRow label="Clear tab data" sub="Per-tab wipe · confirms"
          trailing={<Icon name="chev" size={14} color={t.muted} strokeWidth={1.5} />} last />
      </NFCard>
      <SecHead>Danger zone</SecHead>
      <NFCard pad={14} style={{ borderColor: t.accent }}>
        <SRow
          label={<Text style={{ fontSize: 13.5, fontWeight: '500', color: t.accent }}>Delete account</Text>}
          sub="Cascades all data · 30s confirm"
          trailing={<Icon name="chev" size={14} color={t.accent} strokeWidth={1.5} />}
          last />
      </NFCard>
      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <NFMono size={9.5} color={t.faint}>V1.0 · BUILD 0481 · MIT</NFMono>
      </View>
    </>
  );
}

const SCREENS = [Appearance, Profile, Units, Notifications, Data];

export default function SettingsScreen() {
  const { subsByTab } = useNavContext();
  const sub = subsByTab['settings'];
  const Screen = SCREENS[sub] ?? SCREENS[0];
  return (
    <NavShell tabId="settings">
      <Screen />
    </NavShell>
  );
}
