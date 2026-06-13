import React from 'react';
import { Text, View } from 'react-native';
import Svg, { Circle, G, Line, Polyline } from 'react-native-svg';
import {
  DotNum, DotTitle, NFBar, NFCard, NFLabel, NFMono, NFRing, NFRow, NFSpark, SecHead, useNFTheme,
} from '../../ui/nf';
import { Icon } from '../../navigation/icons';
import { useNavContext } from '../../navigation/NavContext';
import { NavShell } from '../../navigation/NavShell';

function Dashboard() {
  const t = useNFTheme();
  const trends = [
    { name: 'CALORIES', data: [1850, 2020, 1720, 1980, 2100, 1900, 1360] },
    { name: 'WEIGHT',   data: [74.8, 74.7, 74.5, 74.5, 74.4, 74.5, 74.2] },
    { name: 'SLEEP',    data: [7.5, 6.8, 7.2, 8.1, 7.0, 7.8, 7.7] },
  ];
  return (
    <>
      <DotTitle>Today</DotTitle>
      <NFLabel style={{ marginTop: 8 }}>Mon · May 11 · all systems</NFLabel>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 14 }}>
        {/* Left column */}
        <View style={{ flex: 1, gap: 8 }}>
          <NFCard pad={14}>
            <NFLabel>Calories</NFLabel>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 }}>
              <NFRing size={48} stroke={5} value={68} color={t.text} />
              <View>
                <DotNum size={18}>1,360</DotNum>
                <NFMono size={9} color={t.muted}>/ 2,000</NFMono>
              </View>
            </View>
          </NFCard>
          <NFCard pad={14}>
            <NFLabel>Exercise</NFLabel>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 }}>
              <NFRing size={48} stroke={5} value={75} color={t.text} />
              <View>
                <DotNum size={18}>3/4</DotNum>
                <NFMono size={9} color={t.muted}>SESSIONS</NFMono>
              </View>
            </View>
          </NFCard>
        </View>
        {/* Right column */}
        <View style={{ flex: 1, gap: 8 }}>
          <NFCard pad={14}>
            <NFLabel>Weight</NFLabel>
            <DotNum size={24} style={{ marginTop: 8 }}>
              74.2<Text style={{ fontSize: 12, color: t.muted }}> kg</Text>
            </DotNum>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 5 }}>
              <Icon name="arrowD" size={11} color={t.accent} strokeWidth={2} />
              <NFMono size={9} color={t.accent}>0.3 VS SAT</NFMono>
            </View>
          </NFCard>
          <NFCard pad={14}>
            <NFLabel>Last night</NFLabel>
            <DotNum size={22} style={{ marginTop: 8 }}>7h 42m</DotNum>
            <NFMono size={9} color={t.muted} style={{ marginTop: 5 }}>● ● ● ● ○ ON GOAL</NFMono>
          </NFCard>
        </View>
      </View>
      <SecHead>Trends · 7 days</SecHead>
      <View style={{ gap: 8 }}>
        {trends.map(tr => (
          <NFCard key={tr.name} pad={12}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <NFMono size={10.5} color={t.text} weight="600">{tr.name}</NFMono>
              <NFMono size={10.5} color={t.muted}>{tr.data[tr.data.length - 1]}</NFMono>
            </View>
            <NFSpark data={tr.data} height={28} />
          </NFCard>
        ))}
      </View>
    </>
  );
}

function Calories() {
  const t = useNFTheme();
  const meals = [
    { type: 'Breakfast', items: [['Avocado toast', 340], ['Black coffee', 5]] as [string, number][] },
    { type: 'Lunch',     items: [['Chicken bowl · El Califa', 620], ['Sparkling water', 0]] as [string, number][] },
    { type: 'Snacks',    items: [['Almonds, 30g', 170], ['Apple', 95]] as [string, number][] },
    { type: 'Dinner',    items: [['(not logged)', 0]] as [string, number][] },
  ];
  const total = meals.flatMap(m => m.items).reduce((a, b) => a + b[1], 0);
  const macros: [string, number, number][] = [['Protein', 56, 120], ['Carbs', 142, 250], ['Fat', 48, 70]];
  return (
    <>
      <DotTitle>Calories</DotTitle>
      <NFLabel style={{ marginTop: 8 }}>Today · {total} / 2,000 kcal</NFLabel>
      <NFCard pad={14} style={{ marginTop: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <NFRing size={72} stroke={7} value={(total / 2000) * 100} color={t.text}
            label={`${total}`} sub="KCAL" />
          <View style={{ flex: 1, gap: 9 }}>
            {macros.map(([name, v, tot]) => (
              <View key={name}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                  <NFMono size={10} color={t.text}>{name}</NFMono>
                  <NFMono size={10} color={t.muted}>{v} / {tot}g</NFMono>
                </View>
                <NFBar value={(v / tot) * 100} h={4} />
              </View>
            ))}
          </View>
        </View>
      </NFCard>
      <SecHead>Meals</SecHead>
      <View style={{ gap: 8 }}>
        {meals.map(m => {
          const mTotal = m.items.reduce((a, b) => a + b[1], 0);
          return (
            <NFCard key={m.type} pad={14}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: 8 }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: t.text }}>{m.type}</Text>
                <NFMono size={11} color={t.muted}>{mTotal} KCAL</NFMono>
              </View>
              {m.items.map((it, i) => (
                <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between',
                  paddingVertical: 4 }}>
                  <Text style={{ fontSize: 12, color: it[1] === 0 ? t.muted : t.dim }}>{it[0]}</Text>
                  <NFMono size={11} color={t.muted}>{it[1]}</NFMono>
                </View>
              ))}
            </NFCard>
          );
        })}
      </View>
    </>
  );
}

function Weight() {
  const t = useNFTheme();
  const data = [75.2, 75.0, 74.8, 74.9, 74.7, 74.6, 74.7, 74.5, 74.5, 74.4, 74.5, 74.3, 74.2, 74.2];
  const W = 300, H = 120;
  const sy = (v: number) => H - ((v - 73.5) / 2) * H;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * W},${sy(v)}`).join(' ');
  const stats: [string, string, string, boolean][] = [
    ['BMI',       '22.4',   'HEALTHY',  false],
    ['PROJECTED', 'Jul 22', 'AT RATE',  false],
    ['PB',        '74.2',   '★ TODAY',  true ],
  ];
  return (
    <>
      <DotTitle>Weight</DotTitle>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 14, marginTop: 12 }}>
        <DotNum size={46}>
          74.2<Text style={{ fontSize: 16, color: t.muted }}> kg</Text>
        </DotNum>
        <View style={{ paddingBottom: 4 }}>
          <NFMono size={10} color={t.accent}>↓ 1.0 KG / MO</NFMono>
          <NFMono size={10} color={t.muted} style={{ marginTop: 3 }}>GOAL 72.0 · AUG 1</NFMono>
        </View>
      </View>
      <NFCard pad={14} style={{ marginTop: 14 }}>
        <NFLabel>Trend · 14 days</NFLabel>
        <Svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none"
          style={{ marginTop: 10 }}>
          {[0, 1, 2, 3].map(i => (
            <Line key={i} x1="0" y1={i * 30 + 15} x2={W} y2={i * 30 + 15}
              stroke={t.line} strokeDasharray="2 3" />
          ))}
          <Line x1="0" y1="100" x2={W} y2="100"
            stroke={t.accent} strokeDasharray="3 3" opacity={0.5} />
          <Polyline points={pts} fill="none" stroke={t.text} strokeWidth={2} />
          {data.map((v, i) => (
            <Circle key={i}
              cx={(i / (data.length - 1)) * W}
              cy={sy(v)}
              r={i === data.length - 1 ? 4 : 2}
              fill={i === data.length - 1 ? t.accent : t.text}
            />
          ))}
        </Svg>
      </NFCard>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
        {stats.map(([l, v, s, accent]) => (
          <NFCard key={l} pad={12} style={{ flex: 1 }}>
            <NFLabel size={8.5}>{l}</NFLabel>
            <DotNum size={18} style={{ marginTop: 6 }}>{v}</DotNum>
            <NFMono size={8.5} color={accent ? t.accent : t.muted} style={{ marginTop: 4 }}>{s}</NFMono>
          </NFCard>
        ))}
      </View>
    </>
  );
}

const EXERCISE_RINGS = [
  { r: 48, val: 78, label: 'STEPS',      value: '7,820', sub: 'GOAL 10,000' },
  { r: 37, val: 65, label: 'ACTIVE MIN', value: '32',    sub: 'GOAL 50' },
  { r: 26, val: 42, label: 'BURNED',     value: '240',   sub: 'KCAL' },
];

function ExerciseRings({ colors }: { colors: string[] }) {
  const SVG_SIZE = 116;
  const CX = 58, CY = 58, SW = 8;
  return (
    <Svg width={SVG_SIZE} height={SVG_SIZE} viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}>
      {EXERCISE_RINGS.map((ring, i) => {
        const C = 2 * Math.PI * ring.r;
        return (
          <G key={ring.r}>
            <Circle cx={CX} cy={CY} r={ring.r} fill="none" stroke={colors[3]} strokeWidth={SW} />
            <Circle cx={CX} cy={CY} r={ring.r} fill="none" stroke={colors[i]} strokeWidth={SW}
              strokeDasharray={C} strokeDashoffset={C * (1 - ring.val / 100)}
              strokeLinecap="butt"
              transform={`rotate(-90, ${CX}, ${CY})`}
            />
          </G>
        );
      })}
    </Svg>
  );
}

function Exercise() {
  const t = useNFTheme();
  const ringColors = [t.text, t.dim, t.accent, t.surfaceAlt];
  const sessions = [
    { name: 'Run · Chapultepec',    sub: 'CARDIO · 42 MIN · YESTERDAY', kcal: 380 },
    { name: 'Push day · El Gym',    sub: 'STRENGTH · 55 MIN · SAT',     kcal: 280 },
    { name: 'Climbing · Black wall',sub: 'SPORT · 90 MIN · THU',        kcal: 520 },
  ];
  return (
    <>
      <DotTitle>Exercise</DotTitle>
      <NFLabel style={{ marginTop: 8 }}>Week of May 11</NFLabel>
      <NFCard pad={18} style={{ marginTop: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18 }}>
          <ExerciseRings colors={ringColors} />
          <View style={{ flex: 1, gap: 10 }}>
            {EXERCISE_RINGS.map((ring, i) => (
              <View key={ring.label}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <View style={{ width: 7, height: 7, borderRadius: 3.5,
                    backgroundColor: ringColors[i] }} />
                  <NFLabel size={8.5}>{ring.label}</NFLabel>
                </View>
                <DotNum size={20} style={{ marginTop: 2 }}>{ring.value}</DotNum>
                <NFMono size={8.5} color={t.muted}>{ring.sub}</NFMono>
              </View>
            ))}
          </View>
        </View>
      </NFCard>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
        <NFCard pad={12} style={{ flex: 1 }}>
          <NFLabel>Sessions</NFLabel>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
            <DotNum size={22}>3</DotNum>
            <NFMono size={9.5} color={t.muted}>/ 4</NFMono>
          </View>
          <NFBar value={75} h={4} style={{ marginTop: 6 }} />
        </NFCard>
        <NFCard pad={12} style={{ flex: 1 }}>
          <NFLabel>Streak</NFLabel>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
            <DotNum size={22}>9</DotNum>
            <NFMono size={9.5} color={t.muted}>WK · BEST 14</NFMono>
          </View>
          <View style={{ flexDirection: 'row', gap: 3, marginTop: 7 }}>
            {Array.from({ length: 14 }).map((_, i) => (
              <View key={i} style={{ flex: 1, height: 4,
                backgroundColor: i < 9 ? t.text : t.surfaceAlt }} />
            ))}
          </View>
        </NFCard>
      </View>
      <SecHead>Recent sessions</SecHead>
      {sessions.map((s, i, arr) => (
        <NFRow key={i} last={i === arr.length - 1}
          lead={
            <View style={{ width: 30, height: 30, borderRadius: 4, borderWidth: 1,
              borderColor: t.border, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="dumbbell" size={16} color={t.text} strokeWidth={1.7} />
            </View>
          }
          title={s.name}
          sub={s.sub}
          value={`${s.kcal} kcal`}
        />
      ))}
    </>
  );
}

function Sleep() {
  const t = useNFTheme();
  const week: [string, number, number][] = [
    ['M', 7.5, 4], ['T', 6.8, 3], ['W', 7.2, 4],
    ['T', 8.1, 5], ['F', 7.0, 3], ['S', 7.8, 4], ['S', 7.7, 4],
  ];
  const H = 96;
  return (
    <>
      <DotTitle>Sleep</DotTitle>
      <NFLabel style={{ marginTop: 8 }}>Last 7 nights · avg 7h 26m</NFLabel>
      <NFCard pad={16} style={{ marginTop: 14 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <NFLabel>Last night</NFLabel>
          <NFMono size={9.5} color={t.accent}>ON TARGET</NFMono>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10, marginTop: 8 }}>
          <DotNum size={38}>7h 42m</DotNum>
          <NFMono size={11} color={t.muted}>● ● ● ● ○</NFMono>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 10 }}>
          <Icon name="bed" size={12} color={t.muted} strokeWidth={1.5} />
          <NFMono size={10} color={t.muted}>23:18 → 07:00</NFMono>
        </View>
      </NFCard>
      <SecHead>Past 7 nights</SecHead>
      <NFCard pad={14}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between',
          height: H, position: 'relative' }}>
          {/* Target line at 8h */}
          <View style={{ position: 'absolute', left: 0, right: 0,
            bottom: (8 / 10) * H, height: 1, backgroundColor: t.accent, opacity: 0.5 }} />
          {week.map(([label, hrs, quality], i) => {
            const barH = Math.round((hrs / 10) * H);
            const opacity = 0.45 + (quality / 5) * 0.55;
            return (
              <View key={i} style={{ flex: 1, alignItems: 'center', gap: 5 }}>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <View style={{ width: 12, height: barH,
                    backgroundColor: t.text, opacity }} />
                </View>
                <NFMono size={9} color={t.muted}>{label}</NFMono>
              </View>
            );
          })}
        </View>
      </NFCard>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 10 }}>
        <NFCard pad={12} style={{ flex: 1 }}>
          <NFLabel>Consistency</NFLabel>
          <DotNum size={22} color={t.accent} style={{ marginTop: 5 }}>
            8.4<Text style={{ color: t.muted, fontSize: 12 }}>/10</Text>
          </DotNum>
          <NFMono size={8.5} color={t.muted} style={{ marginTop: 4 }}>BEDTIME ±21M</NFMono>
        </NFCard>
        <NFCard pad={12} style={{ flex: 1 }}>
          <NFLabel>Avg quality</NFLabel>
          <DotNum size={22} style={{ marginTop: 5 }}>
            3.9<Text style={{ color: t.muted, fontSize: 12 }}>/5</Text>
          </DotNum>
          <NFMono size={8.5} color={t.muted} style={{ marginTop: 4 }}>30-DAY</NFMono>
        </NFCard>
      </View>
    </>
  );
}

const SCREENS = [Dashboard, Calories, Weight, Exercise, Sleep];

export default function HealthScreen() {
  const { subsByTab } = useNavContext();
  const sub = subsByTab['health'];
  const Screen = SCREENS[sub] ?? SCREENS[0];
  return (
    <NavShell tabId="health">
      <Screen />
    </NavShell>
  );
}
