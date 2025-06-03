import { useState } from "react";
import { Card, IconButton, List, Text, TextInput, useTheme } from "react-native-paper";
import { useChat } from "../hooks";

export const Chat = () => {
  const { currentChannel, messages, sendChatMessage } = useChat();
  const [yourMessage, setYourMessage] = useState<string>('test');
  const {
    colors: { onSecondary, onSecondaryContainer, secondary, secondaryContainer },
  } = useTheme();
  const submit = () => {
    sendChatMessage(yourMessage);

    // TODO: Purely for testing. Would usually reset to blank.
    setYourMessage('randomiser' + Math.random().toString());
  }

  return (
    <Card mode='contained'>
      <Text>{currentChannel?.name || '(Invalid channel)'}</Text>
      {messages.map(({ value, yours }, idx) => <List.Item
        description={value}
        key={idx}
        left={yours ? undefined : (props) => <List.Icon {...props} icon="chat" />}
        right={yours ? (props) => <List.Icon {...props} icon="account"/> : undefined}
        theme={{
          colors: {
            // surface: secondaryContainer,
            // surfaceVariant: secondaryContainer,
            // onSurface: onSecondaryContainer,
            // onSurfaceVariant: onSecondaryContainer
          },
        }}
        titleStyle={{ textAlign: yours ? 'right' : 'auto' }}
        title={`You ${yours ? 'sent' : 'got'} this message at some point`}
      />)}
      <TextInput value={yourMessage} onChangeText={setYourMessage} />
      <IconButton icon="send" onPress={submit} size={40} />
    </Card>
  )
};
