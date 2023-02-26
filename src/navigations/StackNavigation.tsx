import {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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
    authStorage
      .get()
      .then(() => resetToMainScreen())
      .catch(() => logout());
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
