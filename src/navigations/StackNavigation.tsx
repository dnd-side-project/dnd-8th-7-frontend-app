import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {STACK_NAVIGATION_PATH} from 'utils/constants';

import TabNavigation from 'navigations/TabNavigation';
import FullWebViewScreen from 'screens/FullWebView';
import OnboardingPage from 'screens/onboarding';
import OAuthWebView from 'screens/OAuthWebView';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
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
