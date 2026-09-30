import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Button } from '@/components/ui/Button';

export default function ExampleModalScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-surface">
      <Text className="text-lg text-ink">Example modal</Text>
      <Button label="Dismiss" onPress={() => router.back()} />
    </View>
  );
}
