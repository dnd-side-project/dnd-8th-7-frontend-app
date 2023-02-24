import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNavigation from 'navigations/TabNavigation';
import FullWebViewScreen from 'screens/FullWebView';
import OnboardingPage from 'screens/onboarding';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingPage} />
      <Stack.Screen name="Main" component={TabNavigation} />
      <Stack.Screen name="FullWebView" component={FullWebViewScreen} />
    </Stack.Navigator>
  );
}
