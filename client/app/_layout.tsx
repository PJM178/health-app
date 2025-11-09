import { Header } from '@/components/Header';
import SideMenu from '@/components/SideMenu';
import SideMenuContent from '@/components/SideMenuContent';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(isMenuOpen);
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack
              screenOptions={{
                header: (props) => <Header openSideMenu={setIsMenuOpen} />
              }}
            >
              <Stack.Screen name="index" options={{ title: "Home", headerShown: true }} />
              <Stack.Screen name="about" options={{ title: "About", headerShown: true }} />
              <Stack.Screen name="/products" options={{ title: "About", headerShown: true }} />
              <Stack.Screen name="users/profile" options={{ title: "Profile", headerShown: true }} />
            </Stack>
            <SideMenu
              side="left"
              isOpen={isMenuOpen}
              setIsOpen={setIsMenuOpen}
            >
              <SideMenuContent
                closeSideMenu={() => setIsMenuOpen(false)}
              />
            </SideMenu>
          </GestureHandlerRootView>
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
