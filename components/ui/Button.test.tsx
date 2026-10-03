import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from './Button';

// `render` and `fireEvent` are async in React Native Testing Library 14. Forgetting to await them
// leaves `screen` detached, and every query fails with "`render` function has not been called".
describe('Button', () => {
  it('exposes its label as the accessible name', async () => {
    await render(<Button label="Save entry" onPress={() => {}} />);

    expect(screen.getByRole('button', { name: 'Save entry' })).toBeOnTheScreen();
  });

  it('calls the handler when pressed', async () => {
    const onPress = jest.fn();
    await render(<Button label="Save entry" onPress={onPress} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Save entry' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call the handler when disabled', async () => {
    const onPress = jest.fn();
    await render(<Button label="Save entry" onPress={onPress} disabled />);

    await fireEvent.press(screen.getByRole('button', { name: 'Save entry' }));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('reports the disabled state to assistive technology', async () => {
    await render(<Button label="Save entry" onPress={() => {}} disabled />);

    expect(screen.getByRole('button', { name: 'Save entry' })).toBeDisabled();
  });

  it('exposes the hint when one is given', async () => {
    await render(
      <Button label="Save entry" onPress={() => {}} accessibilityHint="Stores today's note" />,
    );

    expect(screen.getByHintText("Stores today's note")).toBe(
      screen.getByRole('button', { name: 'Save entry' }),
    );
  });
});
