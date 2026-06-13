export type TabId = 'finance' | 'calendar' | 'goals' | 'write' | 'health' | 'settings';

export interface TabDef {
  id: TabId;
  label: string;
  code: string;
  route: string;
  subs: string[];
}

export const TABS: TabDef[] = [
  {
    id: 'finance',
    label: 'Finance',
    code: 'FIN',
    route: '/(tabs)/finance',
    subs: ['Ledger', 'Accounts', 'Budgets', 'Analytics', 'Recurring'],
  },
  {
    id: 'calendar',
    label: 'Calendar',
    code: 'CAL',
    route: '/(tabs)/calendar',
    subs: ['Month', 'Week', 'Day', 'Agenda', 'Calendars'],
  },
  {
    id: 'goals',
    label: 'Goals',
    code: 'GOL',
    route: '/(tabs)/goals',
    subs: ['Dashboard', 'Wizard', 'Steps', 'Check-ins', 'Why board'],
  },
  {
    id: 'write',
    label: 'Write',
    code: 'WRT',
    route: '/(tabs)/journal',
    subs: ['Documents', 'Books', 'Prompts', 'Voice', 'OCR'],
  },
  {
    id: 'health',
    label: 'Health',
    code: 'HLT',
    route: '/(tabs)/health',
    subs: ['Dashboard', 'Calories', 'Weight', 'Exercise', 'Sleep'],
  },
  {
    id: 'settings',
    label: 'Settings',
    code: 'SYS',
    route: '/(tabs)/settings',
    subs: ['Appearance', 'Profile', 'Units', 'Notifications', 'Data'],
  },
];
