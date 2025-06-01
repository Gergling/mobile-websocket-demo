import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Chat } from '@/src/chat';
import { ChatsList } from '@/src/chat/components/List';
import { List } from 'react-native-paper';
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

export default function HomeScreen() {
  return (
    <>
      <ThemedView style={styles.view}>
        <ThemedText type="title">
          Chats
        </ThemedText>
        <ChatsList />
      </ThemedView>
      <ThemedView>
        <ThemedText type="title">
          Chat Window
        </ThemedText>
        <Chat />
      </ThemedView>
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
          <List.Item left={ProgressIcon} title="Websockets" titleStyle={styles.listItem} />
          <List.Item left={ProgressIcon} title="Notifications" titleStyle={styles.listItem} />
        </ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#eeddee',
    color: '#440044',
  },
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
