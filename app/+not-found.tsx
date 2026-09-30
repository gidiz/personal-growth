import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <View className="flex-1 items-center justify-center gap-4 bg-surface">
        <Text className="text-lg text-ink">This screen does not exist.</Text>
        <Link className="text-brand underline" href="/">
          Go to the home screen
        </Link>
      </View>
    </>
  );
}
