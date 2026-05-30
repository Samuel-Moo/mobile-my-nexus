import React, { createContext, useCallback, useContext, useState } from 'react';
import { router } from 'expo-router';
import { TABS, TabId } from './TabsData';

type SubMap = Record<TabId, number>;

interface NavContextValue {
  activeTabId: TabId;
  subsByTab: SubMap;
  switcherOpen: boolean;
  zenMode: boolean;
  setCurrentTab: (id: TabId) => void;
  setSub: (idx: number) => void;
  openSwitcher: () => void;
  closeSwitcher: () => void;
  pickTab: (id: TabId) => void;
  enterZen: () => void;
  exitZen: () => void;
}

const initSubs: SubMap = {
  finance: 0,
  calendar: 0,
  goals: 0,
  write: 0,
  health: 0,
  settings: 0,
};

const NavContext = createContext<NavContextValue>({} as NavContextValue);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [activeTabId, setActiveTabId] = useState<TabId>('finance');
  const [subsByTab, setSubsByTab] = useState<SubMap>(initSubs);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [zenMode, setZenMode] = useState(false);

  const setCurrentTab = useCallback((id: TabId) => {
    setActiveTabId(id);
  }, []);

  const setSub = useCallback(
    (idx: number) => {
      setSubsByTab(prev => ({ ...prev, [activeTabId]: idx }));
    },
    [activeTabId],
  );

  const openSwitcher = useCallback(() => setSwitcherOpen(true), []);
  const closeSwitcher = useCallback(() => setSwitcherOpen(false), []);

  const pickTab = useCallback((id: TabId) => {
    const tab = TABS.find(t => t.id === id);
    setSwitcherOpen(false);
    setActiveTabId(id);
    if (tab) router.replace(tab.route as any);
  }, []);

  const enterZen = useCallback(() => {
    setZenMode(true);
    setSwitcherOpen(false);
  }, []);

  const exitZen = useCallback(() => setZenMode(false), []);

  return (
    <NavContext.Provider
      value={{
        activeTabId,
        subsByTab,
        switcherOpen,
        zenMode,
        setCurrentTab,
        setSub,
        openSwitcher,
        closeSwitcher,
        pickTab,
        enterZen,
        exitZen,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export const useNavContext = () => useContext(NavContext);
