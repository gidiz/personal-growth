import { Stack } from 'expo-router';

// No redirect or session guard here on purpose: the auth boundary belongs to the Auth ticket.
export default function AuthLayout() {
  return <Stack />;
}
