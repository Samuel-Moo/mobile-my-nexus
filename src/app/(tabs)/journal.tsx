import React, { useEffect, useRef } from 'react';
import { Animated, Modal, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Crosshairs, DotNum, DotTitle, GlyphGrid, LiveDot,
  NFBar, NFCard, NFLabel, NFMono, NFRow, NFTag, SecHead, useNFTheme,
} from '../../ui/nf';
import { Icon } from '../../navigation/icons';
import { useNavContext } from '../../navigation/NavContext';
import { NavShell } from '../../navigation/NavShell';

const DOCS = [
  { title: 'On Quiet Tools',                 tags: ['ESSAY', 'DRAFT'], words: 1284, edited: '2H AGO' },
  { title: 'Chapter 5 — Notes',              tags: ['NOVEL'],          words: 340,  edited: 'YESTERDAY' },
  { title: 'Mexico City spring journal',     tags: ['JOURNAL'],        words: 2104, edited: 'MAY 9' },
  { title: 'A response to "Designing Calm"', tags: ['ESSAY'],          words: 680,  edited: 'MAY 7' },
  { title: 'Random morning page',            tags: ['JOURNAL'],        words: 412,  edited: 'MAY 5' },
  { title: 'Letter to my future self',       tags: ['JOURNAL'],        words: 920,  edited: 'APR 30' },
];

function Documents() {
  const t = useNFTheme();
  return (
    <>
      <DotTitle>Documents</DotTitle>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
        <NFLabel>6 docs · 5,750 words</NFLabel>
        <View style={{ flexDirection: 'row', gap: 14 }}>
          <Icon name="filter" size={15} color={t.muted} strokeWidth={1.6} />
          <Icon name="sort"   size={15} color={t.muted} strokeWidth={1.6} />
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12, marginBottom: 4,
        paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: t.border, borderRadius: 4 }}>
        <Icon name="search" size={14} color={t.muted} strokeWidth={1.8} />
        <Text style={{ fontSize: 12.5, color: t.muted, flex: 1, fontFamily: 'Geist' }}>
          Search title, body, tag…
        </Text>
        <NFMono size={9.5} color={t.muted}
          style={{ paddingHorizontal: 5, paddingVertical: 2, borderWidth: 1, borderColor: t.border }}>
          ⌘K
        </NFMono>
      </View>
      {DOCS.map((d, i, arr) => (
        <NFRow key={i} last={i === arr.length - 1}
          title={d.title}
          sub={`${d.words} WORDS · ${d.edited}`}
          value={
            <View style={{ flexDirection: 'row', gap: 4 }}>
              {d.tags.map(tag => <NFTag key={tag}>{tag}</NFTag>)}
            </View>
          }
        />
      ))}
    </>
  );
}

function BookCover({ title, ver }: { title: string; ver: string }) {
  const t = useNFTheme();
  return (
    <View style={{ width: 64, height: 82, borderWidth: 1, borderColor: t.border,
      backgroundColor: t.surfaceAlt, padding: 8,
      justifyContent: 'space-between', flexShrink: 0, overflow: 'hidden' }}>
      <GlyphGrid rows={3} cols={5} dot={2} gap={3} color={t.text}
        lit={(r, c) => ((r * 5 + c) % 4 === 0) ? 1 : 0}
        style={{ width: 'auto' } as any} />
      <Text style={{ fontFamily: 'GeistMono', fontSize: 8, fontWeight: '700',
        color: t.text, lineHeight: 10, textTransform: 'uppercase' }}>
        {title.slice(0, 18)}
      </Text>
      <NFMono size={7} color={t.muted}>{ver}</NFMono>
    </View>
  );
}

function Books() {
  const t = useNFTheme();
  const books = [
    { title: "The Cartographer's Apprentice", chapters: '12 / 18', pct: 62, words: '48,200', ver: 'v0.4' },
    { title: 'Untitled novella',              chapters: '3 / 8',   pct: 14, words: '4,800',  ver: 'v0.1' },
  ];
  const chapters = [
    { name: 'Ch 12 — The harbor at dawn', book: 'CARTOGRAPHER', status: 'DRAFT',   words: 1840, edited: '2H AGO' },
    { name: 'Ch 11 — A misread chart',    book: 'CARTOGRAPHER', status: 'DONE',    words: 3210, edited: 'YESTERDAY' },
    { name: 'Ch 3  — The visit',          book: 'UNTITLED',     status: 'REVISED', words: 1640, edited: 'MAY 8' },
  ];
  return (
    <>
      <DotTitle>Books</DotTitle>
      <NFLabel style={{ marginTop: 8 }}>2 projects · 53,000 words</NFLabel>
      <View style={{ gap: 10, marginTop: 14 }}>
        {books.map((b, i) => (
          <NFCard key={i} pad={14}>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <BookCover title={b.title} ver={b.ver} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }}>{b.title}</Text>
                <NFMono size={9.5} color={t.muted} style={{ marginTop: 5 }}>
                  {b.chapters} CH · {b.words} WORDS
                </NFMono>
                <View style={{ marginTop: 12 }}>
                  <NFBar value={b.pct} over={b.pct >= 80} />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                    <NFMono size={9} color={t.muted}>{b.pct}% OF 75,000</NFMono>
                    <NFMono size={9} color={t.muted}>{b.words}</NFMono>
                  </View>
                </View>
              </View>
            </View>
          </NFCard>
        ))}
      </View>
      <SecHead>Recent chapters</SecHead>
      {chapters.map((c, i, arr) => (
        <NFRow key={i} last={i === arr.length - 1}
          title={c.name}
          sub={`${c.book} · ${c.words} WORDS · ${c.edited}`}
          value={<NFTag accent={c.status === 'REVISED'}>{c.status}</NFTag>}
        />
      ))}
    </>
  );
}

function Prompts() {
  const t = useNFTheme();
  const prompts = [
    { cat: 'FICTION',     diff: 'INTERMEDIATE', text: 'A character finds a letter addressed to them, never sent.',    saved: false },
    { cat: 'POETRY',      diff: 'ADVANCED',     text: 'A poem in twelve lines, each containing a different colour.', saved: true  },
    { cat: 'NON-FICTION', diff: 'INTERMEDIATE', text: 'Defend an unpopular opinion you secretly hold.',              saved: false },
  ];
  const cats = ['ALL', 'JOURNALING', 'FICTION', 'POETRY', 'DIALOGUE'];
  return (
    <>
      <DotTitle>Prompts</DotTitle>
      <NFLabel style={{ marginTop: 8 }}>Daily rotation · midnight</NFLabel>
      <NFCard pad={18} style={{ marginTop: 14 }}>
        <Crosshairs m={8} />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <NFLabel color={t.accent}>Today · Journaling</NFLabel>
          <Icon name="sparkles" size={14} color={t.accent} strokeWidth={1.7} />
        </View>
        <Text style={{ fontSize: 17, lineHeight: 25, marginTop: 12, color: t.text, fontWeight: '500' }}>
          "Write about a smell that takes you somewhere else."
        </Text>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
          <View style={{ flex: 1, paddingVertical: 10, backgroundColor: t.text, alignItems: 'center' }}>
            <Text style={{ fontFamily: 'GeistMono', fontSize: 10.5, fontWeight: '600',
              color: t.bg, letterSpacing: 0.8, textTransform: 'uppercase' }}>
              Use prompt →
            </Text>
          </View>
          <View style={{ paddingHorizontal: 16, paddingVertical: 10,
            borderWidth: 1, borderColor: t.text, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'GeistMono', fontSize: 10.5, fontWeight: '600',
              color: t.text, letterSpacing: 0.8, textTransform: 'uppercase' }}>
              Save
            </Text>
          </View>
        </View>
      </NFCard>
      <View style={{ flexDirection: 'row', gap: 14, marginTop: 16, marginBottom: 4 }}>
        {cats.map((c, i) => (
          <Text key={c} style={{
            fontFamily: 'GeistMono', fontSize: 10.5, letterSpacing: 1,
            color: i === 0 ? t.text : t.muted,
            fontWeight: i === 0 ? '600' : '500',
            paddingBottom: 2,
            borderBottomWidth: i === 0 ? 2 : 0,
            borderBottomColor: t.accent,
          }}>
            {c}
          </Text>
        ))}
      </View>
      <View style={{ gap: 8, marginTop: 10 }}>
        {prompts.map((p, i) => (
          <NFCard key={i} pad={14}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <NFMono size={9.5} color={t.muted}>{p.cat}</NFMono>
                <NFMono size={9.5} color={t.accent}>{p.diff}</NFMono>
              </View>
              <Icon name="star" size={14} color={p.saved ? t.accent : t.muted}
                strokeWidth={1.7} fill={p.saved ? t.accent : 'none'} />
            </View>
            <Text style={{ fontSize: 14, marginTop: 9, lineHeight: 20, color: t.dim }}>"{p.text}"</Text>
          </NFCard>
        ))}
      </View>
    </>
  );
}

function VoiceOverlay({ onClose }: { onClose: () => void }) {
  const t = useNFTheme();
  const insets = useSafeAreaInsets();
  const r0 = useRef(new Animated.Value(1)).current;
  const r1 = useRef(new Animated.Value(1)).current;
  const r2 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const ripple = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, { toValue: 1.14, duration: 1200, useNativeDriver: false }),
          Animated.timing(anim, { toValue: 0.92, duration: 1200, useNativeDriver: false }),
        ])
      );
    const a0 = ripple(r0, 0);
    const a1 = ripple(r1, 500);
    const a2 = ripple(r2, 1000);
    a0.start(); a1.start(); a2.start();
    return () => { r0.stopAnimation(); r1.stopAnimation(); r2.stopAnimation(); };
  }, []);

  const bars = Array.from({ length: 24 }, (_, i) => ({
    h: Math.max(4, 5 + Math.abs(Math.sin(i * 0.7) * 28) + (i % 3) * 4),
    lit: i < 14,
  }));

  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top,
      paddingBottom: insets.bottom + 24 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 18, paddingVertical: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <LiveDot />
          <NFLabel>Voice → text · ENG</NFLabel>
        </View>
        <Pressable onPress={onClose} hitSlop={12}>
          <Icon name="x" size={18} color={t.text} strokeWidth={1.7} />
        </Pressable>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',
        paddingHorizontal: 30, gap: 20 }}>
        <View style={{ width: 150, height: 150, alignItems: 'center', justifyContent: 'center' }}>
          {([r0, r1, r2] as Animated.Value[]).map((anim, i) => {
            const sz = 150 - i * 22;
            return (
              <Animated.View key={i} style={{
                position: 'absolute',
                width: sz, height: sz, borderRadius: sz / 2,
                borderWidth: 1, borderColor: t.dotOff,
                transform: [{ scale: anim }],
              }} />
            );
          })}
          <View style={{ width: 84, height: 84, borderRadius: 42,
            backgroundColor: t.accent, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="mic" size={38} color={t.onAccent} strokeWidth={1.8} />
          </View>
        </View>

        <DotNum size={40}>00:42</DotNum>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2, height: 38 }}>
          {bars.map((b, i) => (
            <View key={i} style={{ width: 3, height: b.h,
              backgroundColor: b.lit ? t.text : t.faint }} />
          ))}
        </View>

        <Text style={{ fontSize: 15, lineHeight: 23, color: t.dim, textAlign: 'center', minHeight: 70 }}>
          "The architecture had to disappear. Every screen, every chrome element — gone.{' '}
          <Text style={{ color: t.muted }}>What remained was the sentence…</Text>"
        </Text>
        <NFLabel size={9}>Native STT · on-device · 0ms</NFLabel>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 24, paddingTop: 8 }}>
        <Pressable onPress={onClose}
          style={{ width: 44, height: 44, borderRadius: 22,
            borderWidth: 1, borderColor: t.border, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="x" size={18} color={t.muted} strokeWidth={1.5} />
        </Pressable>
        <View style={{ width: 64, height: 64, borderRadius: 32,
          backgroundColor: t.accent, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="pause" size={24} color={t.onAccent} strokeWidth={2} fill={t.onAccent} />
        </View>
        <View style={{ width: 44, height: 44, borderRadius: 22,
          backgroundColor: t.text, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="check" size={20} color={t.bg} strokeWidth={2.4} />
        </View>
      </View>
    </View>
  );
}

function OCROverlay({ onClose }: { onClose: () => void }) {
  const t = useNFTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: insets.top }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 18, paddingVertical: 10 }}>
        <NFLabel>OCR · review extracted</NFLabel>
        <Pressable onPress={onClose} hitSlop={12}>
          <Icon name="x" size={18} color={t.text} strokeWidth={1.7} />
        </Pressable>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 18, gap: 12 }}>
        <View style={{ height: 150, borderWidth: 1, borderColor: t.border,
          backgroundColor: t.surfaceAlt, position: 'relative',
          overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="image" size={34} color={t.muted} strokeWidth={1.4} />
          <View style={{ position: 'absolute', top: 8, right: 8 }}>
            <NFTag accent>ML KIT · 98%</NFTag>
          </View>
          <View style={{ position: 'absolute', left: 0, right: 0, height: 2,
            backgroundColor: t.accent, top: '40%' as any }} />
        </View>

        <NFLabel>Extracted · edit before insert</NFLabel>

        <NFCard pad={16}>
          <Text style={{ fontSize: 13, lineHeight: 21, color: t.text }}>
            A good tool gets out of the way. Not by hiding, but by being so steady that you forget it is there at all. The cursor blinks. The page waits.{' '}
            <Text style={{ backgroundColor: t.accent, color: t.onAccent }}> Nothing else moves.</Text>
          </Text>
        </NFCard>

        <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          <NFLabel>Provider</NFLabel>
          <NFTag accent>ML KIT</NFTag>
          <NFTag>TESSERACT</NFTag>
          <NFTag>VISION</NFTag>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 8,
        paddingHorizontal: 18, paddingBottom: insets.bottom + 24, paddingTop: 14 }}>
        <View style={{ flex: 1, paddingVertical: 13, borderWidth: 1, borderColor: t.border,
          alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: 'GeistMono', fontSize: 11, fontWeight: '600',
            color: t.muted, textTransform: 'uppercase', letterSpacing: 1 }}>
            Discard
          </Text>
        </View>
        <View style={{ flex: 2, paddingVertical: 13, backgroundColor: t.accent,
          alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: 'GeistMono', fontSize: 11, fontWeight: '600',
            color: t.onAccent, textTransform: 'uppercase', letterSpacing: 1 }}>
            Insert at cursor
          </Text>
        </View>
      </View>
    </View>
  );
}

const SCREENS = [Documents, Books, Prompts];

export default function JournalScreen() {
  const { subsByTab, setSub } = useNavContext();
  const sub = subsByTab['write'];

  if (sub === 3 || sub === 4) {
    return (
      <Modal visible transparent={false} animationType="slide"
        onRequestClose={() => setSub(0)} statusBarTranslucent>
        {sub === 3
          ? <VoiceOverlay onClose={() => setSub(0)} />
          : <OCROverlay onClose={() => setSub(0)} />}
      </Modal>
    );
  }

  const Screen = SCREENS[sub] ?? SCREENS[0];
  return (
    <NavShell tabId="write">
      <Screen />
    </NavShell>
  );
}
