import {forwardRef, useContext, useRef} from 'react';
import {
  WebView as RNWebView,
  WebViewMessageEvent,
  WebViewProps,
} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';

import {GlobalComponentContext} from 'context/GlobalComponentProvider';

import {generateRandomString, requestCameraPermissionAndroid} from 'utils';
import {webviewLaunchImageLibrary} from 'utils/webview-bridge/image-picker/imagePickerBridge';
import {STACK_NAVIGATION_PATH} from 'utils/constants';
import useWebView from 'utils/webview-bridge/useWebView';
import useShortNavigation from 'hooks/useShortNavigation';

import {
  ActionType,
  ACTION_TYPE,
  EWVMessageType,
} from 'utils/webview-bridge/types/common.type';
import {FullWebViewScreenNavigationProp} from 'types/common.type';

export default forwardRef<RNWebView, WebViewProps>((props, ref) => {
  const localRef = useRef(null);
  const myRef = ref || localRef;
  const webviewKey = useRef(generateRandomString(20));

  const navigation = useNavigation<FullWebViewScreenNavigationProp>();

  const {logout, resetToMainScreen, resetScreenTo} = useShortNavigation();
  const {bottomSheets} = useContext(GlobalComponentContext);

  const handleMessage = async (e: WebViewMessageEvent) => {
    props?.onMessage?.(e);

    const webViewData = JSON.parse(e.nativeEvent.data);
    const {type, data} = webViewData;

    if (type === EWVMessageType.ACTION) {
      const action = webViewData.action as ActionType;
      switch (action) {
        case ACTION_TYPE.GO_MAIN:
          resetToMainScreen();
          break;
        case ACTION_TYPE.LOGOUT:
          logout();
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
      if (contents.reset) {
        resetScreenTo({
          name: STACK_NAVIGATION_PATH.FULL_WEBVIEW,
          params: {url: contents.url},
        });
      } else {
        navigation.push(STACK_NAVIGATION_PATH.FULL_WEBVIEW, {
          url: contents.url,
        });
      }
    } else if (type === EWVMessageType.CLOSE_NEW_WEBVIEW) {
      navigation.goBack();
    }

    if (type === EWVMessageType.PICK_IMAGE_FROM_LIBRARY) {
      let canUse = true;
      if (Platform.OS === 'android') {
        canUse = await requestCameraPermissionAndroid();
      }
      if (canUse) {
        webviewLaunchImageLibrary(webviewKey.current, data.eventKey);
      }
    }
  };

  useWebView(webviewKey.current, myRef);

  return <RNWebView {...props} ref={myRef} onMessage={handleMessage} />;
});
