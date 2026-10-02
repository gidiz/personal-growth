import { Link, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Button } from '@/components/ui/Button';
import { useExampleQuery } from '@/hooks/useExampleQuery';

// Local to this route because it exists only to show the scaffold works, and goes away with the
// example hook. `.rule/ui-rules.md` requires loading, offline, error and content to be distinct.
function ExamplePanel() {
  const query = useExampleQuery();

  if (query.isPaused) {
    return (
      <Text accessibilityRole="alert" className="px-6 text-center text-ink">
        Paused while the app is offline or in the background. It will finish on its own.
      </Text>
    );
  }

  if (query.isError) {
    return (
      <>
        <Text accessibilityRole="alert" className="px-6 text-center text-ink">
          Could not read the local cache, so nothing is shown here.
        </Text>
        <Button label="Try again" onPress={() => query.refetch()} />
      </>
    );
  }

  if (query.isPending) {
    return <Text className="px-6 text-center text-ink-muted">Loading…</Text>;
  }

  return (
    <>
      <Text className="px-6 text-center text-ink-muted">{query.data.principle}</Text>
      <Text className="px-6 text-center text-xs text-ink-muted">
        {`Cached previous visit: ${query.data.previousSeenAt ?? 'none yet'}`}
      </Text>
    </>
  );
}

export default function TodayScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-surface">
      <Text className="text-lg text-ink">Today</Text>
      <ExamplePanel />
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
