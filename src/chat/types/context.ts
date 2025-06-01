import { ChatChannelProps } from "./channel";
import { ChatMessageProps } from "./message";

export type ChatContextProps = {
  channels: ChatChannelProps[];
  currentChannel: ChatChannelProps | undefined;
  messages: ChatMessageProps[];
  requestChannelList: () => void;
  sendChatMessage: (message: string) => void;
  updateChannel: (channelName?: string) => void;
};
