import {forwardRef, useContext, useRef} from 'react';
import {
  WebView as RNWebView,
  WebViewMessageEvent,
  WebViewProps,
} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

import {generateRandomString} from 'utils';

import {EWVMessageType} from 'utils/webview-bridge/types/common.type';
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

    const eventKey = data.eventKey;
    if (type === EWVMessageType.OPEN_BOTTOM_SHEET) {
      const {contents} = data;
      bottomSheets.open({
        webviewKey: webviewKey.current,
        key: eventKey,
        type: contents.type,
        props: contents.props,
      });
    } else if (type === EWVMessageType.CLOSE_BOTTOM_SHEET) {
      bottomSheets.close(eventKey);
    }

    if (type === EWVMessageType.OPEN_NEW_WEBVIEW) {
      const {contents} = data;
      navigation.navigate('FullWebView', {url: contents.url});
    } else if (type === EWVMessageType.CLOSE_NEW_WEBVIEW) {
      navigation.goBack();
    }
  };

  useWebView(webviewKey.current, myRef);

  return <RNWebView {...props} ref={myRef} onMessage={handleMessage} />;
});
