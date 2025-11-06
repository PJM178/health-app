import { Header } from '@/components/Header';
import SideMenu from '@/components/SideMenu';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Header />
      <Stack >
        <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
        <Stack.Screen name="about" options={{ title: "About", headerShown: false }} />
        <Stack.Screen name="/products" options={{ title: "About", headerShown: false }} />
        {/* <Stack.Screen name="users/profile" options={{ title: "Profile", headerShown: true, animation: "slide_from_bottom", animationDuration: 100 }} /> */}
      </Stack>
      <SideMenu side="left" isOpen={false} />
    </GestureHandlerRootView>
  );
}
