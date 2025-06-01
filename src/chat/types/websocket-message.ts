import { ChatChannelProps } from "./channel";

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
  event: 'message';
  data: {
    channel: string;
    message: string;
  };
};
