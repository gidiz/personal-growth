import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { queryClient } from '@/lib/query-client';
import '../global.css';
// Side-effect import: lib/env validates EXPO_PUBLIC_* on evaluation, so a misconfigured app fails
// here, by name, instead of surfacing as an undefined somewhere downstream.
import '@/lib/env';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        {/* title is what the back control announces; without it the group name "(tabs)" leaks into the accessible name. */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Home' }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false, title: 'Home' }} />
        <Stack.Screen
          name="modals/example"
          options={{
            // 'modal' on Android is just a screen with the default push animation and no dismiss
            // gesture: gestureEnabled is iOS-only. 'formSheet' is a real draggable sheet on both.
            presentation: 'formSheet',
            sheetGrabberVisible: true,
            title: 'Example modal',
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
