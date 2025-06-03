import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ChatsList } from '@/src/chat/components/List';
import { PushNotificationsTest } from '@/src/push';
import { ToggleColorScheme } from '@/src/theme/components/ToggleColorScheme';
import { List, Surface, Text } from 'react-native-paper';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';

const ProgressIcon = (props: { color: string; style: Style; }) => <ThemedView>
  <List.Icon
    {...props}
    color="yellow"
    icon="progress-clock"
  />
</ThemedView>
const CompleteIcon = (props: { color: string; style: Style; }) => <ThemedView>
  <List.Icon
    {...props}
    color="green"
    icon="check"
  />
</ThemedView>

// TODO: Move content to the root. We aren't using tabs for this.
export default function HomeScreen() {
  return (
    <Surface>
      <Text>Chats</Text>
      <ChatsList />
      <ToggleColorScheme />
      <Text>Notifications Test:</Text>
      <PushNotificationsTest />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Features:
        </ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText>
          <List.Item
            left={CompleteIcon}
            titleStyle={styles.listItem}
            title="Navigation"
          />
          <List.Item left={CompleteIcon} title="Websockets" titleStyle={styles.listItem} />
          <List.Item left={ProgressIcon} title="Notifications" titleStyle={styles.listItem} />
        </ThemedText>
      </ThemedView>
    </Surface>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  listItem: {
    color: 'grey',
  }
});
