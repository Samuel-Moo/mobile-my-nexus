import React from 'react';
import { Text, View } from 'react-native';
import {
  Crosshairs, DotNum, DotTitle, GlyphGrid, LiveDot, MiniBarChart,
  NFBar, NFCard, NFLabel, NFMono, NFRow, NFTag, SecHead, useNFTheme,
} from '../../ui/nf';
import { Icon } from '../../navigation/icons';
import { useNavContext } from '../../navigation/NavContext';
import { NavShell } from '../../navigation/NavShell';

const TXNS = [
  { id: 1, date: 'MAY 11', cat: 'Groceries', icon: 'tag',    merchant: 'Mercado Roma',  amt: -42.18 },
  { id: 2, date: 'MAY 11', cat: 'Coffee',    icon: 'apple',  merchant: 'Tiempo Café',   amt: -4.50  },
  { id: 3, date: 'MAY 10', cat: 'Salary',    icon: 'arrowD', merchant: 'Stripe payout', amt: +3200  },
  { id: 4, date: 'MAY 10', cat: 'Transport', icon: 'arrowR', merchant: 'Uber',          amt: -9.20  },
  { id: 5, date: 'MAY 09', cat: 'Rent',      icon: 'doc',    merchant: 'Condesa flat',  amt: -1450  },
  { id: 6, date: 'MAY 09', cat: 'Utilities', icon: 'system', merchant: 'CFE',           amt: -62.40 },
  { id: 7, date: 'MAY 08', cat: 'Groceries', icon: 'tag',    merchant: 'Sumesa',        amt: -28.90 },
  { id: 8, date: 'MAY 08', cat: 'Coffee',    icon: 'apple',  merchant: 'Cardinal',      amt: -3.80  },
];

const money = (n: number) =>
  (n < 0 ? '−' : '+') + '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function Ledger() {
  const t = useNFTheme();
  return (
    <>
      <DotTitle>Ledger</DotTitle>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 14 }}>
        <NFCard pad={13} style={{ flex: 1 }}>
          <NFLabel>Net · month</NFLabel>
          <DotNum size={26} color={t.accent} style={{ marginTop: 8 }}>+$1,599</DotNum>
          <NFMono size={9.5} color={t.muted} style={{ marginTop: 6 }}>VS −$420 LAST</NFMono>
        </NFCard>
        <NFCard pad={13} style={{ flex: 1 }}>
          <NFLabel>Today</NFLabel>
          <DotNum size={26} style={{ marginTop: 8 }}>−$46.68</DotNum>
          <NFMono size={9.5} color={t.muted} style={{ marginTop: 6 }}>2 EXPENSES</NFMono>
        </NFCard>
      </View>
      <SecHead right={<NFMono size={9} color={t.faint}>08 ROWS</NFMono>}>Recent · May</SecHead>
      {TXNS.map((tx, i) => (
        <NFRow key={tx.id} last={i === TXNS.length - 1}
          lead={
            <View style={{ width: 32, height: 32, borderRadius: 4, borderWidth: 1,
              borderColor: t.border, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={tx.icon} size={16} color={t.text} strokeWidth={1.6} />
            </View>
          }
          title={tx.merchant}
          sub={`${tx.date} · ${tx.cat.toUpperCase()}`}
          value={money(tx.amt)}
          valColor={tx.amt > 0 ? t.accent : t.text}
        />
      ))}
    </>
  );
}

function Accounts() {
  const t = useNFTheme();
  const accts = [
    { name: 'Chase Checking',  type: 'BANK', bal: 5420.18,  last: '+$3,200 YESTERDAY' },
    { name: 'Cash',            type: 'CASH', bal: 240.00,   last: '−$1,450 MAY 9' },
    { name: 'BBVA Credit',     type: 'CARD', bal: -682.40,  last: '−$62 YESTERDAY' },
    { name: 'Savings · Vault', type: 'BANK', bal: 12480.00, last: '+$500 MAY 1' },
  ];
  const total = accts.reduce((a, b) => a + b.bal, 0);
  return (
    <>
      <DotTitle>Accounts</DotTitle>
      <NFCard pad={16} style={{ marginTop: 14 }}>
        <Crosshairs m={7} />
        <NFLabel>Net worth</NFLabel>
        <DotNum size={40} style={{ marginTop: 10 }}>
          ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </DotNum>
        <View style={{ marginTop: 12 }}>
          <GlyphGrid rows={2} cols={20} dot={2.4} gap={5} color={t.text} lit={(_r, c) => c < 13 ? 1 : 0} />
        </View>
        <NFMono size={9.5} color={t.muted} style={{ marginTop: 10 }}>4 ACCOUNTS · MXN/USD MIX</NFMono>
      </NFCard>
      <SecHead>Accounts · 04</SecHead>
      <View style={{ gap: 8 }}>
        {accts.map(a => (
          <NFCard key={a.name} pad={14}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: t.text }}>{a.name}</Text>
                <NFTag>{a.type}</NFTag>
              </View>
              <DotNum size={18} color={a.bal < 0 ? t.accent : t.text}>
                {a.bal < 0 ? '−' : ''}${Math.abs(a.bal).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </DotNum>
            </View>
            <NFMono size={9.5} color={t.muted} style={{ marginTop: 10 }}>{a.last}</NFMono>
          </NFCard>
        ))}
      </View>
    </>
  );
}

function Budgets() {
  const t = useNFTheme();
  const budgets = [
    { cat: 'Groceries', spent: 320,  limit: 500 },
    { cat: 'Rent',      spent: 1450, limit: 1450 },
    { cat: 'Coffee',    spent: 84,   limit: 60 },
    { cat: 'Transport', spent: 122,  limit: 200 },
    { cat: 'Utilities', spent: 62,   limit: 150 },
  ];
  return (
    <>
      <DotTitle>Budgets</DotTitle>
      <NFLabel style={{ marginTop: 8 }}>Envelopes · monthly</NFLabel>
      <View style={{ marginTop: 14, gap: 12 }}>
        {budgets.map(b => {
          const pct = (b.spent / b.limit) * 100, over = pct > 100;
          return (
            <NFCard key={b.cat} pad={14}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <View style={{ width: 6, height: 6, backgroundColor: over ? t.accent : t.text }} />
                  <Text style={{ fontSize: 13.5, fontWeight: '600', color: t.text }}>{b.cat}</Text>
                </View>
                <Text style={{ fontFamily: 'GeistMono', fontSize: 12, color: over ? t.accent : t.text }}>
                  ${b.spent}<Text style={{ color: t.muted }}> / ${b.limit}</Text>
                </Text>
              </View>
              <NFBar value={pct} over={over} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 7 }}>
                <NFMono size={9.5} color={t.muted}>{Math.round(pct)}% USED</NFMono>
                <NFMono size={9.5} color={over ? t.accent : t.muted}>
                  {over ? `${(pct - 100).toFixed(0)}% OVER` : `$${(b.limit - b.spent).toFixed(0)} LEFT`}
                </NFMono>
              </View>
            </NFCard>
          );
        })}
      </View>
    </>
  );
}

function Analytics() {
  const t = useNFTheme();
  const cats = [
    { name: 'Rent',      val: 1450 },
    { name: 'Groceries', val: 320 },
    { name: 'Transport', val: 122 },
    { name: 'Coffee',    val: 84 },
    { name: 'Utilities', val: 62 },
  ];
  const total = cats.reduce((a, b) => a + b.val, 0);
  const flow = [60, -180, -40, -25, 3200, -210, -90];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <>
      <DotTitle>Analytics</DotTitle>
      <NFLabel style={{ marginTop: 8 }}>May · breakdown</NFLabel>
      <NFCard pad={16} style={{ marginTop: 14 }}>
        <NFLabel>Spending · $2,038</NFLabel>
        <View style={{ marginTop: 14, gap: 11 }}>
          {cats.map((c, i) => {
            const pct = (c.val / total) * 100;
            return (
              <View key={c.name}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                  <Text style={{ fontSize: 12, color: t.text }}>{c.name}</Text>
                  <NFMono size={11} color={t.muted}>${c.val} · {Math.round(pct)}%</NFMono>
                </View>
                <NFBar value={pct} over={i === 0} h={4} />
              </View>
            );
          })}
        </View>
      </NFCard>
      <NFCard pad={16} style={{ marginTop: 10 }}>
        <NFLabel>Cash flow · 7 days</NFLabel>
        <MiniBarChart data={flow} days={days} height={92} />
      </NFCard>
    </>
  );
}

function Recurring() {
  const t = useNFTheme();
  const items = [
    { name: 'Rent · Condesa flat', freq: 'MONTHLY · 1ST',  amt: -1450,  next: 'JUN 1' },
    { name: 'Spotify Family',      freq: 'MONTHLY · 15TH', amt: -15.99, next: 'MAY 15' },
    { name: 'Stripe payout',       freq: 'BI-WEEKLY',      amt: +3200,  next: 'MAY 24' },
    { name: 'CFE electricity',     freq: 'MONTHLY · 9TH',  amt: -62.40, next: 'JUN 9' },
    { name: 'Gym · La Roma',       freq: 'MONTHLY · 5TH',  amt: -48,    next: 'JUN 5' },
  ];
  return (
    <>
      <DotTitle>Recurring</DotTitle>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 }}>
        <LiveDot /><NFLabel>5 active · server cron</NFLabel>
      </View>
      <View style={{ marginTop: 14, gap: 8 }}>
        {items.map(r => (
          <NFCard key={r.name} pad={14}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flex: 1, minWidth: 0, gap: 6 }}>
                <Text style={{ fontSize: 13.5, fontWeight: '600', color: t.text }}>{r.name}</Text>
                <NFMono size={9.5} color={t.muted}>{r.freq}</NFMono>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 5 }}>
                <DotNum size={16} color={r.amt > 0 ? t.accent : t.text}>{money(r.amt)}</DotNum>
                <NFMono size={9} color={t.muted}>NEXT {r.next}</NFMono>
              </View>
            </View>
          </NFCard>
        ))}
      </View>
    </>
  );
}

const SCREENS = [Ledger, Accounts, Budgets, Analytics, Recurring];

export default function FinanceScreen() {
  const { subsByTab } = useNavContext();
  const sub = subsByTab['finance'];
  const Screen = SCREENS[sub] ?? SCREENS[0];
  return (
    <NavShell tabId="finance">
      <Screen />
    </NavShell>
  );
}
