import { useCallback, useEffect, useReducer, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { ChatChannelProps, ChatContextProps, ChatMessageProps, WebsocketMessageProps } from "../types";

const DOMAIN = '192.168.1.240';

type ChatLogAction = ChatMessageProps & {
  // type: 'new-message';
};

const chatLogReducer = (state: ChatMessageProps[], action: ChatLogAction) => {
  console.log('action:', action)
  return [
    ...state,
    action,
  ];
};

const useLog = (x: string, y: any) => useEffect(() => console.log(x, y), [x, y]);

export const useChatContext = (): ChatContextProps => {
  const WS_URL = `ws://${DOMAIN}:80`
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<WebsocketMessageProps | null>(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    },
  );
  const [channels, setChannels] = useState<ChatChannelProps[]>([]);
  const [currentChannel, setCurrentChannel] = useState<ChatChannelProps | undefined>();
  const [messages, dispatchMessage] = useReducer(chatLogReducer, []);
  // const { channel: channelName } = useLocalSearchParams();

  // const currentChannel = useMemo(() => {
  //   console.log('usememo current channel', channelName, channels)
  //   if (channelName) {
  //     console.log('channelName', channelName, channels)

  //     return channels.find(({ name }) => channelName === name);
  //   }
  // }, [channelName, channels]);

  const requestChannelList = useCallback(
    () => sendJsonMessage<WebsocketMessageProps>({ event: 'request-channels' }),
    [sendJsonMessage]
  );

  const send = useCallback(
    (msg: WebsocketMessageProps) => sendJsonMessage(msg),
    [sendJsonMessage]
  );

  const sendChatMessage = useCallback(
    (message: string) => {
      console.log('sending', message)
      if (currentChannel) {
        dispatchMessage({ yours: true, value: message });
        send({ event: 'message', data: { channel: currentChannel.name, message } });
      } else {
        console.error('Attempting to message without a channel.')
      }
    },
    [currentChannel, send]
  );

  const updateChannel = (channelName?: string) => {
    const channel = channels.find(({ name }) => channelName === name);
    setCurrentChannel(channel);
  };

  // Run when the connection state (readyState) changes
  useEffect(() => {
    if (readyState === ReadyState.OPEN && currentChannel) {
      send({
        event: "join",
        data: {
          channel: currentChannel.name,
        },
      })
    }
  }, [currentChannel, readyState, send]);
  
  // Run when a new WebSocket message is received (lastJsonMessage)
  useEffect(() => {
    if (lastJsonMessage) {
      const { event } = lastJsonMessage;
      switch (event) {
        case 'join':
          break;
        case 'list-channels':
          console.log('list channels triggered', lastJsonMessage, lastJsonMessage.data.channels)
          setChannels(lastJsonMessage.data.channels);
          break;
        case 'message':
          dispatchMessage({ yours: false, value: lastJsonMessage.data.message });
          break;
        default:
          console.error(`Unexpected message event: '${event}'.`);
      }
    }
  }, [lastJsonMessage]);

  useLog('channels', channels);
  useLog('current channel', currentChannel);
  useEffect(() => console.log('ready state', ReadyState[readyState]), [readyState])

  return {
    channels,
    currentChannel,
    messages,
    requestChannelList,
    sendChatMessage,
    updateChannel,
  }
};
