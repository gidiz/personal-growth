import { Stack } from 'expo-router';
import '../global.css';

export default function RootLayout() {
  return (
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
  );
}
