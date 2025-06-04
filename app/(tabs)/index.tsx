import { ChatsList } from '@/src/chat/components/List';
import { ToggleColorScheme } from '@/src/theme/components/ToggleColorScheme';
import { Surface, Text } from 'react-native-paper';

// TODO: Move content to the root. We aren't using tabs for this.
export default function HomeScreen() {
  return (
    <Surface>
      <Text>Chats</Text>
      <ChatsList />
      <ToggleColorScheme />
      {/* <Text>Notifications Test:</Text>
      <PushNotificationsTest /> */}
    </Surface>
  );
}
