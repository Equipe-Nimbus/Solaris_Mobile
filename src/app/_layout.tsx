import '../../global.css';

import { SplashScreen, Stack } from "expo-router";
import { hydrateAuth } from '../lib/auth';
import FlashMessage from 'react-native-flash-message';
import { setupAxiosInterceptors } from '../lib/api-interceptors';

export const unstable_settings = {
  initialRouteName: '(app)',
};

setupAxiosInterceptors();
hydrateAuth()
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          navigationBarHidden: true,
        }}
      >
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
      <FlashMessage position="top" />
    </>
  );
}
