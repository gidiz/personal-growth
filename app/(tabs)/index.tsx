import { Link, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Button } from '@/components/ui/Button';
import { useExampleQuery } from '@/hooks/useExampleQuery';

export default function TodayScreen() {
  const router = useRouter();
  const { data, isPending } = useExampleQuery();

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-surface">
      <Text className="text-lg text-ink">Today</Text>
      <Text className="px-6 text-center text-ink-muted">
        {isPending ? 'Loading…' : data?.principle}
      </Text>
      <Text className="px-6 text-center text-xs text-ink-muted">
        {`Cached previous visit: ${data?.previousSeenAt ?? 'none yet'}`}
      </Text>
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
