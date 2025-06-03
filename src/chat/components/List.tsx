import { useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { List, Surface, useTheme } from "react-native-paper";
import { useChat } from "../hooks";

export const ChatsList = () => {
  const { navigate } = useRouter();
  const { channels, requestChannelList } = useChat();
  const chats = useMemo(
    () => channels.map(({ messages, name, ...props }) => {
      const lastMessageData = messages[messages.length - 1];
      const lastMessage = lastMessageData?.value || '(Start a chat...)';
      // const handlePress = () => push('/channels/[channel]', {
      //   params: { channel: name },
      // });
      const handlePress = () => navigate({
        // pathname: `/channel/${name}`,
        pathname: '/channel/[channel]',
        params: { channel: name },
      });
      return {
        ...props,
        handlePress,
        lastMessage,
        name,
      }
    }),
    [channels, navigate]
  );
  const {
    colors: { onPrimaryContainer },
  } = useTheme();

  useEffect(requestChannelList, [requestChannelList]);

  return (
    <Surface>
      {chats.map(({ lastMessage, name, handlePress }, idx) => <List.Item
        description={lastMessage}
        key={idx}
        left={(props) => <List.Icon {...props} icon="account"/>}
        onPress={handlePress}
        right={(props) => <List.Icon {...props} icon="check-all"/>}
        titleStyle={{ fontWeight: 'bold' }}
        theme={{
          colors: { onSurface: onPrimaryContainer, onSurfaceVariant: onPrimaryContainer },
        }}
        title={name}
      />)}
    </Surface>
  )
};
