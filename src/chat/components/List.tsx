import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { List } from "react-native-paper";
import { useChat } from "../hooks";

export const ChatsList = () => {
  const { navigate, push } = useRouter();
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

  useEffect(requestChannelList, [requestChannelList]);

  return (
    <>
      {chats.map(({ lastMessage, name, handlePress }, idx) => <List.Item
        key={idx}
        left={(props) => <ThemedView style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
          <List.Icon
            {...props}
            icon="account"
          />
        </ThemedView>}
        title={name}
        description={lastMessage}
        onPress={handlePress}
      />)}
    </>
  )
};
