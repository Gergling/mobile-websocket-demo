import { createContext } from "react";
import { ChatContextProps } from "../types";

const noop = () => {};

export const ChatContext = createContext<ChatContextProps>({
  channels: [],
  currentChannel: undefined,
  messages: [],
  requestChannelList: noop,
  sendChatMessage: noop,
  updateChannel: noop,
});
