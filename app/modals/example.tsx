import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function ExampleModalScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-surface">
      <Text className="text-lg text-ink">Example modal</Text>
      <Link className="text-brand underline" href="/">
        Dismiss
      </Link>
    </View>
  );
}
