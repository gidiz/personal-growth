import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function SignInScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <Text>Sign in</Text>
      <Link href="/">Back to Today</Link>
    </View>
  );
}
