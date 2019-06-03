import firebase from 'react-native-firebase';
// Optional flow type

export default async (message) => {
  // console.log('messaaage', message);
  const notification = new firebase.notifications.Notification();
  notification.android.setPriority(firebase.notifications.Android.Priority.High);
  firebase.notifications().displayNotification(notification);

  return Promise.resolve(message);
};
