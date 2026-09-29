import { Pressable, Text, type PressableProps } from 'react-native';

type ButtonProps = {
  label: string;
  onPress: PressableProps['onPress'];
  disabled?: boolean;
  accessibilityHint?: string;
};

export function Button({ label, onPress, disabled = false, accessibilityHint }: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      className={[
        'min-h-touch-min min-w-touch-min items-center justify-center rounded-control px-5 py-3',
        // Disabled and pressed never rely on colour alone: disabled also loses the border and
        // dims opacity, pressed also inverts the border, so the state survives a greyscale view.
        disabled
          ? 'border-2 border-transparent bg-disabled opacity-60'
          : 'border-2 border-brand bg-brand active:border-ink active:bg-brand-pressed',
        // Web-only focus ring; the platform default outline is not removed anywhere.
        'focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-focus',
      ].join(' ')}
    >
      <Text
        className={['text-base font-semibold', disabled ? 'text-ink-muted' : 'text-ink-inverted'].join(
          ' ',
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}
