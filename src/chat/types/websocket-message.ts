import { ChatChannelProps } from "./channel";
import { ChatMessageProps } from "./message";

export type WebsocketMessageProps = {
  event: 'join';
  data: {
    channel: string;
  };
} | {
  event: 'request-channels';
} | {
  event: 'list-channels';
  data: {
    channels: ChatChannelProps[];
  };
} | {
  event: 'list-messages';
  data: ChatMessageProps[];
} | {
  event: 'message';
  data: {
    channel: string;
    message: string;
  };
};
