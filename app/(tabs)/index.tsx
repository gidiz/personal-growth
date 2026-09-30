import { Link, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Button } from '@/components/ui/Button';

export default function TodayScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-surface">
      <Text className="text-lg text-ink">Today</Text>
      <Button label="Open example modal" onPress={() => router.push('/modals/example')} />
      <Button label="Disabled example" onPress={() => {}} disabled />
      <Link className="text-brand underline" href="/second">
        Go to Second
      </Link>
      <Link className="text-brand underline" href="/sign-in">
        Go to sign-in
      </Link>
    </View>
  );
}
