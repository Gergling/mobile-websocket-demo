import { PropsWithChildren } from "react";
import { useChatContext } from "../hooks/context";
import { ChatContext } from "./Context";

export const ChatContextProvider = ({ children }: PropsWithChildren) => {
  const contextValue = useChatContext();

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};
