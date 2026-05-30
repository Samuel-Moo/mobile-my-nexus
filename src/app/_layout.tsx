import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../../global.css";
import { NavProvider } from '../navigation/NavContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
    const [loaded] = useFonts({
      Geist:               require('../../assets/fonts/Geist-Regular.ttf'),
      'Geist-Medium':      require('../../assets/fonts/Geist-Medium.ttf'),
      'Geist-SemiBold':    require('../../assets/fonts/Geist-SemiBold.ttf'),
      'Geist-Bold':        require('../../assets/fonts/Geist-Bold.ttf'),
      GeistMono:           require('../../assets/fonts/GeistMono-Regular.ttf'),
      'GeistMono-Medium':  require('../../assets/fonts/GeistMono-Medium.ttf'),
      'GeistMono-SemiBold':require('../../assets/fonts/GeistMono-SemiBold.ttf'),
      Newsreader:          require('../../assets/fonts/Newsreader_14pt-Italic.ttf'),
    });
    useEffect(() => { if (loaded) SplashScreen.hideAsync(); }, [loaded]);
    if (!loaded) return null;
    return (
    <SafeAreaProvider>
      <NavProvider>
        <Stack screenOptions={{ headerShown: false }} />

      </NavProvider>
    </SafeAreaProvider>
  );
}


