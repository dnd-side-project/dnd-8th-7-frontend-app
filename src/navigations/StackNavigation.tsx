import {useEffect} from 'react';
import {Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

import {setTokenInAxiosInstance} from 'api';
import {STACK_NAVIGATION_PATH} from 'utils/constants';
import {authStorage} from 'stores';
import useShortNavigation from 'hooks/useShortNavigation';

import SplashPage from 'screens/Splash';
import TabNavigation from 'navigations/TabNavigation';
import FullWebViewScreen from 'screens/FullWebView';
import OnboardingPage from 'screens/onboarding';
import OAuthWebView from 'screens/OAuthWebView';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  const {resetToMainScreen, logout} = useShortNavigation();

  useEffect(() => {
    /**
     * TODO ios 스플래시 동작 오류 있음
     */
    if (Platform.OS === 'android') {
      SplashScreen.show();
    }
    authStorage
      .get()
      .then(token => {
        if (!token?.accessToken) throw new Error();
        setTokenInAxiosInstance(token);
        resetToMainScreen();
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        SplashScreen.hide();
      });
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={STACK_NAVIGATION_PATH.SPLASH}
        component={SplashPage}
      />
      <Stack.Screen
        name={STACK_NAVIGATION_PATH.ONBOARDING}
        component={OnboardingPage}
      />
      <Stack.Screen
        name={STACK_NAVIGATION_PATH.MAIN}
        component={TabNavigation}
      />
      <Stack.Screen
        name={STACK_NAVIGATION_PATH.FULL_WEBVIEW}
        component={FullWebViewScreen}
      />
      <Stack.Screen
        name={STACK_NAVIGATION_PATH.OAUTH_WEBVIEW}
        component={OAuthWebView}
      />
    </Stack.Navigator>
  );
}
