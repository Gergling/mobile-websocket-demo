import { Chat } from "@/src/chat";
import { useChat } from "@/src/chat/hooks";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

export default function Channel() {
  const { channel } = useLocalSearchParams();
  const { updateChannel } = useChat();

  useEffect(() => {
    if (typeof channel === 'string') {
      updateChannel(channel);
    } else {
      console.error('channel is not a string', channel)
    }
  }, [channel, updateChannel]);

  return (
    <Chat />
  );
}
