import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function ExampleModalScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <Text>Example modal</Text>
      <Link href="/">Dismiss</Link>
    </View>
  );
}
