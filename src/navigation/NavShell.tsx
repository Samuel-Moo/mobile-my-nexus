import React, { ReactNode, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Breadcrumb } from './Breadcrumb';
import { FAB } from './FAB';
import { useNavContext } from './NavContext';
import { SwitcherOverlay } from './SwitcherOverlay';
import { SubtabStrip } from './SubtabStrip';
import { TABS, TabId } from './TabsData';
import { ZenOverlay } from './ZenOverlay';

interface NavShellProps {
  tabId: TabId;
  children: ReactNode;
}

export function NavShell({ tabId, children }: NavShellProps) {
  const { setCurrentTab, subsByTab, switcherOpen, zenMode } = useNavContext();
  const tab = TABS.find(t => t.id === tabId)!;
  const activeSubIndex = subsByTab[tabId];
  const activeSubName = tab.subs[activeSubIndex];

  useEffect(() => {
    setCurrentTab(tabId);
  }, [tabId, setCurrentTab]);

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top', 'left', 'right']}>
      <Breadcrumb tabId={tabId} subName={activeSubName} />
      <SubtabStrip tabId={tabId} subs={tab.subs} />
      <View className="flex-1">
        <ScrollView
          className="flex-1 px-[18px] pt-1"
          contentContainerStyle={{ paddingBottom: 90, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
        <FAB />
      </View>
      <SwitcherOverlay visible={switcherOpen} />
      <ZenOverlay visible={zenMode} />
    </SafeAreaView>
  );
}
