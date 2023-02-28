import {Platform} from 'react-native';
import WebView, {WebViewNavigation} from 'react-native-webview';
import {RouteProp, useRoute} from '@react-navigation/native';
import qs from 'query-string';

import {authStorage} from 'stores';
import {
  BASE_URL,
  HARUBLOCK_ORIGIN,
  STACK_NAVIGATION_PATH,
} from 'utils/constants';
import useShortNavigation from 'hooks/useShortNavigation';
import {RouteParams} from 'types/common.type';

import CustomSafeAreaView from 'components/CustomSafeAreaView';

interface Props {
  url?: string;
}

const loginCallbackUrl = HARUBLOCK_ORIGIN + '/login/callback';

export default function OAuthWebViewScreen({url}: Props) {
  const {navigation, resetToMainScreen, resetScreenTo} = useShortNavigation();
  const route = useRoute<RouteProp<RouteParams, 'oauthWebViewParams'>>();
  const uri = route.params?.url || url || '';

  const handleNavigationStateChange = async (e: WebViewNavigation) => {
    const {query, url: webviewUrl} = qs.parseUrl(e.url);

    if (webviewUrl !== loginCallbackUrl) {
      return;
    }

    if (!query?.token || typeof query.token !== 'string') {
      /** TODO 에러 메세지 노출 하도록 수정 */
      navigation.goBack();
      return;
    }

    await authStorage.set({accessToken: query.token});

    if (query.isNewUser === 'true') {
      resetScreenTo({
        name: STACK_NAVIGATION_PATH.FULL_WEBVIEW,
        params: {url: BASE_URL + '/profiles/new/agreements'},
      });
    } else {
      resetToMainScreen();
    }
  };

  /**
   * TODO uri undefined일 경우 화면 처리
   */
  return (
    <CustomSafeAreaView>
      <WebView
        source={{uri}}
        automaticallyAdjustContentInsets={false}
        onNavigationStateChange={handleNavigationStateChange}
        userAgent={
          Platform.OS === 'android'
            ? 'Chrome/18.0.1025.133 Mobile Safari/535.19'
            : 'AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75'
        }
        scrollEnabled={false}
      />
    </CustomSafeAreaView>
  );
}
