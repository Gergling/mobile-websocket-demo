import * as Notifications from 'expo-notifications';

export const scheduleNewChatMessageNotification = (
  newMessage: string
) => Notifications.scheduleNotificationAsync({
  content: {
    title: "You've got a new message! 📬",
    body: newMessage,
    // data: { data: 'goes here', test: { test1: 'more data' } },
  },
  trigger: null,
  // trigger: {
  //   type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
  //   seconds: 2,
  // },
});
