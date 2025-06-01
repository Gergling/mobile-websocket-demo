import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { IconButton, List, Text, TextInput } from "react-native-paper";
import { useChat } from "../hooks";

export const Chat = () => {
  const { currentChannel, messages, sendChatMessage } = useChat();
  const [yourMessage, setYourMessage] = useState<string>('test');
  const submit = () => {
    sendChatMessage(yourMessage);

    // TODO: Purely for testing. Would usually reset to blank.
    setYourMessage('randomiser' + Math.random().toString());
  }

  return (
    <ThemedView>
      <Text style={styles.view}>{currentChannel?.name || '(Invalid channel)'}</Text>
      <ThemedView style={styles.view}>
        {messages.map(({ value, yours }, idx) => <List.Item
          key={idx}
          left={yours ? undefined : (props) => <ThemedView style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
            <List.Icon
              {...props}
              icon="chat"
            />
          </ThemedView>}
          title={`You ${yours ? 'sent' : 'got'} this message at some point`}
          description={value}
        />)}
      </ThemedView>
      <TextInput value={yourMessage} onChangeText={setYourMessage} />
      <IconButton iconColor="white" icon="send" onPress={submit} size={40} />
    </ThemedView>
  )
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#eeddee',
    color: '#440044',
  },
});
