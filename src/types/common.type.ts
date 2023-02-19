import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  FullWebView: {url: string};
};
export type MainTabParamList = {
  Home: undefined;
  Report: undefined;
  Social: undefined;
  Profile: undefined;
};

export type FullWebViewScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FullWebView'
>;

export type RouteParams = {
  fullWebViewParams: {
    url: string;
  };
};
