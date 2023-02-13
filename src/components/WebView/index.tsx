import {forwardRef, useContext, useRef} from 'react';
import {
  WebView as RNWebView,
  WebViewMessageEvent,
  WebViewProps,
} from 'react-native-webview';

import {generateRandomString} from '@/utils/utils';

import {EWVMessageType} from '@/utils/webview-bridge/types/common.type';
import useWebView from '@/utils/webview-bridge/useWebView';

import {BottomSheetsDispatchContext} from '@/context/BottomSheetsProvider';

export default forwardRef<RNWebView, WebViewProps>((props, ref) => {
  const localRef = useRef(null);
  const myRef = ref || localRef;
  const wvKey = useRef(generateRandomString(20));

  const {open, close} = useContext(BottomSheetsDispatchContext);

  const handleMessage = (e: WebViewMessageEvent) => {
    props?.onMessage?.(e);

    const webViewData = JSON.parse(e.nativeEvent.data);
    const {type, data} = webViewData;

    const bottomSheetKey = data.eventKey;
    if (type === EWVMessageType.OPEN_BOTTOM_SHEET) {
      const {contents} = data;
      open({
        wvKey: wvKey.current,
        key: bottomSheetKey,
        type: contents.type,
        props: contents.props,
      });
    } else if (type === EWVMessageType.CLOSE_BOTTOM_SHEET) {
      close(bottomSheetKey);
    }
  };

  useWebView(wvKey.current, myRef);

  return <RNWebView {...props} ref={myRef} onMessage={handleMessage} />;
});
