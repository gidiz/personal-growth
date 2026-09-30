import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function SignInScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-surface">
      <Text className="text-lg text-ink">Sign in</Text>
      <Link className="text-brand underline" href="/">
        Back to Today
      </Link>
    </View>
  );
}
