import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  BOTTOM_TAB_NAVIGATION_PATH,
  STACK_NAVIGATION_PATH,
} from 'utils/constants';

export type StackNavigationType = keyof typeof STACK_NAVIGATION_PATH;
export type BottomTabNavigationtype = keyof typeof BOTTOM_TAB_NAVIGATION_PATH;

export type RootStackParamList<
  T = Record<StackNavigationType, object | undefined>,
> = T & {
  [STACK_NAVIGATION_PATH.MAIN]: NavigatorScreenParams<MainTabParamList>;
  [STACK_NAVIGATION_PATH.FULL_WEBVIEW]: {url: string};
};
export type MainTabParamList = Record<
  BottomTabNavigationtype,
  object | undefined
>;

export type FullWebViewScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  STACK_NAVIGATION_PATH.FULL_WEBVIEW
>;

export type RouteParams = {
  fullWebViewParams: {
    url: string;
  };
  oauthWebViewParams: {
    type: 'google';
    url: string;
  };
};
