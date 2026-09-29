import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function TodayScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <Text>Today</Text>
      <Link href="/second">Go to Second</Link>
      <Link href="/modals/example">Open example modal</Link>
      <Link href="/sign-in">Go to sign-in</Link>
    </View>
  );
}
