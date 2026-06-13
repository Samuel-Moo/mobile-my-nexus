import React from 'react';
import { Text, View } from 'react-native';
import {
  Crosshairs, DotNum, DotTitle, GlyphGrid, LiveDot,
  NFCard, NFLabel, NFMono, NFRow, NFRing, NFTag, SecHead, useNFTheme,
} from '../../ui/nf';
import { Icon } from '../../navigation/icons';
import { useNavContext } from '../../navigation/NavContext';
import { NavShell } from '../../navigation/NavShell';

const GOALS = [
  { id: 1, title: 'Finish first novel draft', target: 'SEP 1',  pct: 62, streak: 14, words: '48,200 / 75,000' },
  { id: 2, title: 'Run 5km under 22 min',     target: 'AUG 15', pct: 34, streak: 6 },
  { id: 3, title: 'Read 24 books in 2026',    target: 'DEC 31', pct: 52, streak: 21 },
  { id: 4, title: 'Ship Everything App v1',   target: 'JUL 1',  pct: 80, streak: 9 },
];

function Dashboard() {
  const t = useNFTheme();
  return (
    <>
      <DotTitle>Goals</DotTitle>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 14 }}>
        {([['ACTIVE', '4', t.accent], ['STREAK', '21d', t.text], ['DONE 26', '3', t.text]] as [string, string, string][]).map(([l, v, c]) => (
          <NFCard key={l} pad={12} style={{ flex: 1 }}>
            <NFLabel>{l}</NFLabel>
            <DotNum size={26} color={c} style={{ marginTop: 8 }}>{v}</DotNum>
          </NFCard>
        ))}
      </View>
      <SecHead>Active goals · 04</SecHead>
      <View style={{ gap: 8 }}>
        {GOALS.map(g => (
          <NFCard key={g.id} pad={14}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 14 }}>
              <NFRing size={46} stroke={4} value={g.pct} color={g.pct >= 80 ? t.accent : t.text} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }}>{g.title}</Text>
                <View style={{ flexDirection: 'row', gap: 6, marginTop: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <NFTag>BY {g.target}</NFTag>
                  <NFMono size={9.5} color={t.muted}>{g.streak}D STREAK</NFMono>
                </View>
                {g.words && <NFMono size={9.5} color={t.muted} style={{ marginTop: 6 }}>{g.words} WORDS</NFMono>}
              </View>
              <DotNum size={16} color={g.pct >= 80 ? t.accent : t.text}>{g.pct}%</DotNum>
            </View>
          </NFCard>
        ))}
      </View>
    </>
  );
}

function Wizard() {
  const t = useNFTheme();
  const steps = [1, 1, 1, 1, 0.5, 0, 0, 0];
  const pairs = [
    { ob: 'Mid-chapter writer’s block',       res: 'Voice dictation + walk',     linked: true },
    { ob: 'Inconsistent daily writing time',   res: '7am block · calendar-locked', linked: true },
    { ob: 'Plot holes in act II',              res: 'Outline pass with reader',    linked: false },
  ];
  return (
    <>
      <DotTitle>New goal</DotTitle>
      <NFLabel style={{ marginTop: 8 }}>Step 05 of 08 · Detailed plan</NFLabel>
      <View style={{ flexDirection: 'row', gap: 4, marginTop: 14 }}>
        {steps.map((s, i) => (
          <View key={i} style={{ flex: 1, height: 4,
            backgroundColor: s === 1 ? t.text : s === 0.5 ? t.accent : t.surfaceAlt }} />
        ))}
      </View>
      <NFCard pad={16} style={{ marginTop: 14 }}>
        <NFLabel>Outcome · locked step 1</NFLabel>
        <Text style={{ fontSize: 14.5, fontWeight: '500', marginTop: 8, color: t.text, lineHeight: 21 }}>
          Finish a complete first draft of the novel by September 1, 2026.
        </Text>
      </NFCard>
      <SecHead>Map resources → obstacles</SecHead>
      <View style={{ gap: 8 }}>
        {pairs.map((p, i) => (
          <NFCard key={i} pad={14}>
            <NFLabel color={t.accent}>Obstacle</NFLabel>
            <Text style={{ fontSize: 13.5, marginTop: 5, color: t.text }}>{p.ob}</Text>
            <View style={{ height: 1, backgroundColor: t.line, marginVertical: 11 }} />
            <NFLabel>Resource</NFLabel>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
              <Text style={{ fontSize: 13.5, color: p.linked ? t.text : t.muted }}>{p.res}</Text>
              {p.linked
                ? <Icon name="check" size={16} color={t.text} strokeWidth={2.2} />
                : <NFMono size={9.5} color={t.accent}>LINK</NFMono>}
            </View>
          </NFCard>
        ))}
      </View>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 14 }}>
        <View style={{ flex: 1, alignItems: 'center', paddingVertical: 13,
          borderWidth: 1, borderColor: t.border }}>
          <Text style={{ fontFamily: 'GeistMono', fontSize: 11, color: t.muted,
            textTransform: 'uppercase', letterSpacing: 1 }}>← Back</Text>
        </View>
        <View style={{ flex: 2, alignItems: 'center', paddingVertical: 13, backgroundColor: t.text }}>
          <Text style={{ fontFamily: 'GeistMono', fontSize: 11, fontWeight: '600', color: t.bg,
            textTransform: 'uppercase', letterSpacing: 1 }}>Continue → Action</Text>
        </View>
      </View>
    </>
  );
}

function Steps() {
  const t = useNFTheme();
  const steps = [
    { title: 'Outline chapter 5',         due: 'TODAY',    done: false, goal: 'NOVEL' },
    { title: 'Write 1,500 words',         due: 'TODAY',    done: false, goal: 'NOVEL' },
    { title: 'Run 4×800m intervals',      due: 'TOMORROW', done: false, goal: '5KM' },
    { title: 'Finish "Bird by Bird"',     due: 'FRI',      done: false, goal: '24 BOOKS' },
    { title: 'Review novel act II notes', due: 'SAT',      done: false, goal: 'NOVEL' },
    { title: 'Logo asset export',         due: 'MAY 9',    done: true,  goal: 'APP' },
    { title: 'Set up Sentry',             due: 'MAY 9',    done: true,  goal: 'APP' },
  ];
  const Checkbox = ({ done }: { done: boolean }) => (
    <View style={{ width: 18, height: 18, borderWidth: 1.5,
      borderColor: done ? t.text : t.border, backgroundColor: done ? t.text : 'transparent',
      alignItems: 'center', justifyContent: 'center' }}>
      {done && <Icon name="check" size={12} color={t.bg} strokeWidth={2.6} />}
    </View>
  );
  return (
    <>
      <DotTitle>Steps</DotTitle>
      <NFLabel style={{ marginTop: 8 }}>5 open · 2 done this week</NFLabel>
      <SecHead>Open</SecHead>
      {steps.filter(s => !s.done).map((s, i, arr) => (
        <NFRow key={i} last={i === arr.length - 1}
          lead={<Checkbox done={false} />}
          title={s.title} sub={`${s.goal} · DUE ${s.due}`} />
      ))}
      <SecHead>Completed</SecHead>
      {steps.filter(s => s.done).map((s, i, arr) => (
        <NFRow key={i} last={i === arr.length - 1}
          lead={<Checkbox done={true} />}
          title={<Text style={{ textDecorationLine: 'line-through', color: t.muted, fontSize: 13.5 }}>{s.title}</Text>}
          sub={`${s.goal} · ${s.due}`} />
      ))}
    </>
  );
}

function Checkins() {
  const t = useNFTheme();
  const checkins = [
    { date: 'MAY 10', goal: 'NOVEL', pct: 62, prev: 58, note: 'Got past the chapter 4 block — wrote two scenes back to back.' },
    { date: 'MAY 03', goal: 'NOVEL', pct: 58, prev: 55, note: 'Slow week. Heavy edit pass on chapter 3 took most of it.' },
    { date: 'APR 26', goal: '5KM',   pct: 34, prev: 28, note: 'First sub-5min km in three years. Knee felt good.' },
    { date: 'APR 19', goal: 'NOVEL', pct: 55, prev: 50, note: 'Outline pass with Ana — found two structural problems.' },
  ];
  return (
    <>
      <DotTitle>Check-ins</DotTitle>
      <NFLabel style={{ marginTop: 8 }}>Weekly review · next Sun</NFLabel>
      <View style={{ marginTop: 14, gap: 10 }}>
        {checkins.map((c, i) => (
          <NFCard key={i} pad={14}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <NFMono size={10.5} color={t.muted}>{c.date}</NFMono>
              <View style={{ flexDirection: 'row', gap: 8, alignItems: 'baseline' }}>
                <NFMono size={9.5} color={t.muted}>{c.goal}</NFMono>
                <DotNum size={15}>{c.pct}%</DotNum>
                <NFMono size={9.5} color={t.accent}>+{c.pct - c.prev}</NFMono>
              </View>
            </View>
            <Text style={{ fontSize: 12.5, color: t.dim, marginTop: 9, lineHeight: 19 }}>"{c.note}"</Text>
          </NFCard>
        ))}
      </View>
    </>
  );
}

function WhyBoard() {
  const t = useNFTheme();
  const anchors = ['Ana finishing hers', 'morning desk, espresso', 'the chapter 1 line', 'reader letter, 2024'];
  return (
    <>
      <DotTitle>Why board</DotTitle>
      <NFLabel style={{ marginTop: 8 }}>For · Novel</NFLabel>
      <NFCard pad={18} style={{ marginTop: 14 }}>
        <Crosshairs m={8} />
        <View style={{ position: 'absolute', top: 14, right: 14 }}>
          <LiveDot />
        </View>
        <Text style={{ fontSize: 16, lineHeight: 24, fontWeight: '500', color: t.text }}>
          Because the story has been in my head since 2019. Because shipping it once is worth more than keeping it perfect forever. Because my future self deserves a finished thing.
        </Text>
        <NFMono size={9.5} color={t.muted} style={{ marginTop: 16 }}>WRITTEN APR 3 · OPENED TODAY</NFMono>
      </NFCard>
      <SecHead>Anchors · 04</SecHead>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {anchors.map((label, i) => (
          <View key={i} style={{ width: '47%', aspectRatio: 1.3,
            borderWidth: 1, borderColor: t.border, padding: 12,
            justifyContent: 'space-between', overflow: 'hidden' }}>
            <GlyphGrid rows={3} cols={6} dot={2.2} gap={4} color={t.text}
              lit={(_r, c) => ((i + c) % 3 === 0) ? 0.8 : 0} style={{ width: 'auto' } as any} />
            <Text style={{ fontSize: 12, color: t.dim, lineHeight: 17 }}>{label}</Text>
          </View>
        ))}
      </View>
    </>
  );
}

const SCREENS = [Dashboard, Wizard, Steps, Checkins, WhyBoard];

export default function GoalsScreen() {
  const { subsByTab } = useNavContext();
  const sub = subsByTab['goals'];
  const Screen = SCREENS[sub] ?? SCREENS[0];
  return (
    <NavShell tabId="goals">
      <Screen />
    </NavShell>
  );
}
