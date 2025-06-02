import { ThemedView } from "@/components/ThemedView";
import { Button, Text } from "react-native-paper";
import { usePushNotificationSetup } from "../hooks/setup";
import { scheduleNewChatMessageNotification } from "../utils";

export const PushNotificationsTest = () => {
  const { expoPushToken, channels, notification } = usePushNotificationSetup();

  return (
    <ThemedView>
      <Text>Test?</Text>
      <Text>Your expo push token: {expoPushToken}</Text>
      <Text>{`Channels: ${JSON.stringify(
        channels.map(c => c.id),
        null,
        2
      )}`}</Text>
      <ThemedView style={{  }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </ThemedView>
      <Button
        onPress={async () => {
          await scheduleNewChatMessageNotification('Test message!');
        }}
      >Press to schedule a notification</Button>
    </ThemedView>
  );
};
