import {forwardRef, useContext, useRef} from 'react';
import {
  WebView as RNWebView,
  WebViewMessageEvent,
  WebViewProps,
} from 'react-native-webview';
import {useNavigation, CommonActions} from '@react-navigation/native';

import {generateRandomString} from 'utils';
import {STACK_NAVIGATION_PATH} from 'utils/constants';

import {
  ActionType,
  ACTION_TYPE,
  EWVMessageType,
} from 'utils/webview-bridge/types/common.type';
import {FullWebViewScreenNavigationProp} from 'types/common.type';

import useWebView from 'utils/webview-bridge/useWebView';
import {GlobalComponentContext} from 'context/GlobalComponentProvider';

export default forwardRef<RNWebView, WebViewProps>((props, ref) => {
  const localRef = useRef(null);
  const myRef = ref || localRef;
  const webviewKey = useRef(generateRandomString(20));

  const navigation = useNavigation<FullWebViewScreenNavigationProp>();

  const {bottomSheets} = useContext(GlobalComponentContext);

  const handleMessage = (e: WebViewMessageEvent) => {
    props?.onMessage?.(e);

    const webViewData = JSON.parse(e.nativeEvent.data);
    const {type, data} = webViewData;

    if (type === EWVMessageType.ACTION) {
      const action = webViewData.action as ActionType;
      switch (action) {
        case ACTION_TYPE.GO_MAIN:
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: STACK_NAVIGATION_PATH.MAIN}],
            }),
          );
          break;
        case ACTION_TYPE.LOGOUT:
          /** TODO LOGOUT 로직 추가 */
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: STACK_NAVIGATION_PATH.ONBOARDING}],
            }),
          );
          break;
      }
    }

    if (type === EWVMessageType.OPEN_BOTTOM_SHEET) {
      const {contents} = data;
      bottomSheets.open({
        webviewKey: webviewKey.current,
        key: data.eventKey,
        type: contents.type,
        props: contents.props,
      });
    } else if (type === EWVMessageType.CLOSE_BOTTOM_SHEET) {
      bottomSheets.close(data.eventKey);
    }

    if (type === EWVMessageType.OPEN_NEW_WEBVIEW) {
      const {contents} = data;
      navigation.navigate(STACK_NAVIGATION_PATH.FULL_WEBVIEW, {
        url: contents.url,
      });
    } else if (type === EWVMessageType.CLOSE_NEW_WEBVIEW) {
      navigation.goBack();
    }
  };

  useWebView(webviewKey.current, myRef);

  return <RNWebView {...props} ref={myRef} onMessage={handleMessage} />;
});
