import React from 'react';
import { Text, View } from 'react-native';
import {
  DotNum, DotTitle, NFCard, NFLabel, NFMono, NFRow, NFToggle, SecHead, useNFTheme,
} from '../../ui/nf';
import { Icon } from '../../navigation/icons';
import { useNavContext } from '../../navigation/NavContext';
import { NavShell } from '../../navigation/NavShell';

const CALS = [
  { name: 'Work',     fill: 'solid'   },
  { name: 'Personal', fill: 'outline' },
  { name: 'Health',   fill: 'accent'  },
  { name: 'Writing',  fill: 'dotted'  },
] as const;

const EVENTS = [
  { day: 11, h: 9,  dur: 1,   title: 'Standup · Eng',     cal: 0 },
  { day: 11, h: 11, dur: 0.5, title: '1:1 · Diego',       cal: 0 },
  { day: 11, h: 14, dur: 2,   title: 'Design review',     cal: 0 },
  { day: 11, h: 18, dur: 1,   title: 'Run · Chapultepec', cal: 2 },
  { day: 12, h: 10, dur: 1.5, title: 'Therapy',           cal: 1 },
  { day: 12, h: 15, dur: 1,   title: 'Book — chapter 4',  cal: 3 },
  { day: 13, h: 9,  dur: 1,   title: 'Standup · Eng',     cal: 0 },
  { day: 14, h: 13, dur: 1,   title: 'Lunch · Ana',       cal: 1 },
];

type FillType = 'solid' | 'outline' | 'accent' | 'dotted';

function CalMark({ fill, w = 3, h = 32 }: { fill: FillType; w?: number; h?: number }) {
  const t = useNFTheme();
  if (fill === 'accent')  return <View style={{ width: w, height: h, backgroundColor: t.accent }} />;
  if (fill === 'outline') return <View style={{ width: w, height: h, borderWidth: 1, borderColor: t.text }} />;
  if (fill === 'dotted')  return (
    <View style={{ width: w, height: h, overflow: 'hidden', gap: 2 }}>
      {Array.from({ length: Math.ceil(h / 4) }).map((_, i) => (
        <View key={i} style={{ height: 2, backgroundColor: t.text }} />
      ))}
    </View>
  );
  return <View style={{ width: w, height: h, backgroundColor: t.text }} />;
}

function Month() {
  const t = useNFTheme();
  const startDay = 3, monthDays = 31, today = 11;
  const cells: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= monthDays; d++) cells.push(d);

  const evByDay: Record<number, typeof EVENTS> = {};
  EVENTS.forEach(e => (evByDay[e.day] = evByDay[e.day] ?? []).push(e));

  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <DotTitle>May 26</DotTitle>
        <View style={{ flexDirection: 'row', gap: 14 }}>
          <Icon name="chevl" size={18} color={t.muted} strokeWidth={1.5} />
          <Icon name="chev"  size={18} color={t.muted} strokeWidth={1.5} />
        </View>
      </View>

      <View style={{ marginTop: 16 }}>
        {/* Day headers */}
        <View style={{ flexDirection: 'row', marginBottom: 4 }}>
          {['S','M','T','W','T','F','S'].map((d, i) => (
            <View key={i} style={{ flex: 1, alignItems: 'center' }}>
              <NFMono size={9} color={t.muted}>{d}</NFMono>
            </View>
          ))}
        </View>
        {/* Grid rows */}
        {Array.from({ length: Math.ceil(cells.length / 7) }).map((_, row) => (
          <View key={row} style={{ flexDirection: 'row' }}>
            {cells.slice(row * 7, row * 7 + 7).map((d, i) => {
              const evs = d ? (evByDay[d] ?? []) : [];
              const isToday = d === today;
              return (
                <View key={i} style={{ flex: 1, aspectRatio: 1,
                  borderWidth: 1, borderColor: isToday ? t.accent : t.line,
                  padding: 4, opacity: d ? 1 : 0 }}>
                  <NFMono size={10.5} weight={isToday ? '700' : '400'}
                    color={isToday ? t.accent : t.text}>
                    {d ?? ''}
                  </NFMono>
                  {evs.length > 0 && (
                    <View style={{ flexDirection: 'row', gap: 2, marginTop: 'auto' }}>
                      {evs.slice(0, 3).map((e, j) => (
                        <View key={j} style={{ width: 3, height: 3, borderRadius: 1.5,
                          backgroundColor: CALS[e.cal].fill === 'accent' ? t.accent : t.text }} />
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </View>

      <SecHead>Today · May 11</SecHead>
      {EVENTS.filter(e => e.day === today).map((e, i, arr) => (
        <NFRow key={i} last={i === arr.length - 1}
          lead={<CalMark fill={CALS[e.cal].fill} />}
          title={e.title}
          sub={`${e.h}:00–${e.h + e.dur}:00 · ${CALS[e.cal].name.toUpperCase()}`}
        />
      ))}
    </>
  );
}

function Week() {
  const t = useNFTheme();
  const days = ['M11','T12','W13','T14','F15','S16','S17'];
  const hours = [8, 10, 12, 14, 16, 18, 20];

  return (
    <>
      <DotTitle>Week 20</DotTitle>
      <NFLabel style={{ marginTop: 8 }}>May 11 – 17</NFLabel>

      <View style={{ marginTop: 14, flexDirection: 'row', gap: 2 }}>
        <View style={{ width: 20 }} />
        {days.map(d => (
          <View key={d} style={{ flex: 1, alignItems: 'center' }}>
            <NFMono size={9} color={t.muted}>{d[0]}</NFMono>
            <NFMono size={10} color={t.text}>{d.slice(1)}</NFMono>
          </View>
        ))}
      </View>

      <View style={{ marginTop: 8, height: 250, borderWidth: 1, borderColor: t.line, position: 'relative' }}>
        {hours.map((h, i) => (
          <View key={h} style={{ position: 'absolute', left: 0, right: 0,
            top: `${(i / hours.length) * 100}%` as any,
            borderTopWidth: 1, borderTopColor: t.line,
            borderStyle: 'dashed', paddingLeft: 3 }}>
            <NFMono size={8} color={t.faint}>{h}</NFMono>
          </View>
        ))}
        {EVENTS.filter(e => e.day >= 11 && e.day <= 17).map((e, i) => {
          const col = e.day - 11;
          const top = ((e.h - 8) / 12) * 100;
          const ht = (e.dur / 12) * 100;
          const fill = CALS[e.cal].fill;
          const isAccent = fill === 'accent';
          const isSolid = fill === 'solid';
          return (
            <View key={i} style={{
              position: 'absolute',
              left: 20 + col * ((1 / 7) * 100) + '%' as any,
              width: `${(1 / 7) * 100}%`,
              top: `${top}%` as any,
              height: `${ht}%` as any,
              backgroundColor: isAccent ? t.accent : isSolid ? t.text : t.surfaceAlt,
              borderWidth: fill === 'outline' ? 1 : 0,
              borderColor: t.text,
              padding: 2, overflow: 'hidden',
            }}>
              <Text style={{ fontFamily: 'GeistMono', fontSize: 7.5, fontWeight: '600',
                color: (isAccent || isSolid) ? t.bg : t.text }}>
                {e.title.slice(0, 12)}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Legend */}
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 14, flexWrap: 'wrap' }}>
        {CALS.map(c => (
          <View key={c.name} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <CalMark fill={c.fill} w={10} h={10} />
            <NFMono size={9} color={t.muted}>{c.name.toUpperCase()}</NFMono>
          </View>
        ))}
      </View>
    </>
  );
}

function Day() {
  const t = useNFTheme();
  const evs = EVENTS.filter(e => e.day === 11);
  const hours = Array.from({ length: 13 }, (_, i) => 8 + i);

  return (
    <>
      <DotTitle>Mon 11</DotTitle>
      <NFLabel style={{ marginTop: 8 }}>{evs.length} events · 5.5h scheduled</NFLabel>
      <View style={{ marginTop: 14 }}>
        {hours.map(h => (
          <View key={h} style={{ flexDirection: 'row', gap: 10, minHeight: 44 }}>
            <NFMono size={9.5} color={t.muted} style={{ width: 34, paddingTop: 2 }}>{h}:00</NFMono>
            <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: t.line, paddingTop: 3 }}>
              {evs.filter(e => e.h === h).map((e, i) => {
                const fill = CALS[e.cal].fill;
                const isAccent = fill === 'accent', isSolid = fill === 'solid';
                return (
                  <View key={i} style={{ marginBottom: 3, paddingVertical: 7, paddingHorizontal: 10,
                    height: e.dur * 44 - 7,
                    backgroundColor: isAccent ? t.accent : isSolid ? t.text : 'transparent',
                    borderWidth: (fill === 'outline' || fill === 'dotted') ? 1 : 0,
                    borderColor: t.text, borderLeftWidth: 3,
                    borderLeftColor: isAccent ? t.accent : t.text }}>
                    <Text style={{ fontSize: 12.5, fontWeight: '600',
                      color: (isAccent || isSolid) ? t.bg : t.text }}>{e.title}</Text>
                    <NFMono size={9} color={(isAccent || isSolid) ? `${t.bg}b3` : t.muted}
                      style={{ marginTop: 3 }}>
                      {h}:00–{h + e.dur}:00 · {CALS[e.cal].name.toUpperCase()}
                    </NFMono>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </View>
    </>
  );
}

function Agenda() {
  const t = useNFTheme();
  const byDay: Record<number, typeof EVENTS> = {};
  EVENTS.forEach(e => (byDay[e.day] = byDay[e.day] ?? []).push(e));
  const dow = ['MON','TUE','WED','THU','FRI','SAT','SUN'];

  return (
    <>
      <DotTitle>Agenda</DotTitle>
      <NFLabel style={{ marginTop: 8 }}>Upcoming · 7 days</NFLabel>
      <View style={{ marginTop: 14 }}>
        {Object.keys(byDay).map(Number).sort((a, b) => a - b).map(d => (
          <View key={d} style={{ marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
              <DotNum size={22}>{d}</DotNum>
              <NFLabel>MAY · {dow[(d - 1) % 7]}</NFLabel>
            </View>
            {byDay[d].map((e, i, arr) => (
              <NFRow key={i} last={i === arr.length - 1}
                lead={<NFMono size={10} color={t.muted} style={{ width: 42 }}>{e.h}:00</NFMono>}
                title={e.title}
                sub={`${CALS[e.cal].name.toUpperCase()} · ${e.dur}H`}
                value={<CalMark fill={CALS[e.cal].fill} w={4} h={4} />}
              />
            ))}
          </View>
        ))}
      </View>
    </>
  );
}

function Calendars() {
  const t = useNFTheme();
  return (
    <>
      <DotTitle>Calendars</DotTitle>
      <NFLabel style={{ marginTop: 8 }}>4 calendars · 1 default</NFLabel>
      <View style={{ marginTop: 14, gap: 8 }}>
        {CALS.map((c, i) => (
          <NFCard key={c.name} pad={14}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 36, height: 36, borderRadius: 4, borderWidth: 1,
                borderColor: t.border, alignItems: 'center', justifyContent: 'center' }}>
                <CalMark fill={c.fill} w={14} h={14} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }}>{c.name}</Text>
                <NFMono size={9.5} color={t.muted} style={{ marginTop: 4 }}>
                  {i === 0 ? 'DEFAULT · 12 EVENTS' : `${4 - i} EVENTS THIS WEEK`}
                </NFMono>
              </View>
              <NFToggle on={i < 3} />
            </View>
          </NFCard>
        ))}
        {/* Add calendar */}
        <NFCard pad={14} style={{ borderStyle: 'dashed' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ width: 36, height: 36, borderRadius: 4, borderWidth: 1,
              borderColor: t.border, borderStyle: 'dashed',
              alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="plus" size={18} color={t.muted} strokeWidth={1.5} />
            </View>
            <View>
              <Text style={{ fontSize: 13.5, fontWeight: '500', color: t.muted }}>Add calendar…</Text>
              <NFMono size={9.5} color={t.faint} style={{ marginTop: 4 }}>LOCAL OR GOOGLE · PHASE 3</NFMono>
            </View>
          </View>
        </NFCard>
      </View>
    </>
  );
}

const SCREENS = [Month, Week, Day, Agenda, Calendars];

export default function CalendarScreen() {
  const { subsByTab } = useNavContext();
  const sub = subsByTab['calendar'];
  const Screen = SCREENS[sub] ?? SCREENS[0];
  return (
    <NavShell tabId="calendar">
      <Screen />
    </NavShell>
  );
}
