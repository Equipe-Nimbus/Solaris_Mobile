import '../../global.css';

import { Stack } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function RootLayout() {
  return (
      <Stack
        screenOptions={{
          navigationBarHidden: true,
        }}
      >
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
  );
}
