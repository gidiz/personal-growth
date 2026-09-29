import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="index"
        options={{ title: 'Today', tabBarAccessibilityLabel: 'Today', tabBarIcon: () => null }}
      />
      <Tabs.Screen
        name="second"
        options={{ title: 'Second', tabBarAccessibilityLabel: 'Second', tabBarIcon: () => null }}
      />
    </Tabs>
  );
}
