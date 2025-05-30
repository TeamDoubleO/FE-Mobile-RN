import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigations/AppNavigator';
// import { firebase } from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  // useEffect(() => {
  //   // Firebase App이 정상적으로 초기화되었는지 확인
  //   // console.log('Firebase App Name:', firebase.app().name); // [DEFAULT]가 찍히면 정상
  //   // FCM 토큰 받아오기
  //   const getToken = async () => {
  //     try {
  //       const fcmToken = await messaging().getToken();
  //       console.log('FCM Token:', fcmToken);
  //     } catch (error) {
  //       console.log('Error getting FCM token:', error);
  //     }
  //   };

  //   getToken();
  // }, []);
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
