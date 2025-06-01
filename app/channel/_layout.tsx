import { Stack } from 'expo-router';

export default function ChannelLayout() {
  return (
    <Stack>
      <Stack.Screen name="[channel]" options={{ headerShown: false }} />
    </Stack>
  );
}
