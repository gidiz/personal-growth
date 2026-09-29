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
        options={{ presentation: 'modal', title: 'Example modal' }}
      />
    </Stack>
  );
}
