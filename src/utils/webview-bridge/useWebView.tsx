import {ForwardedRef, useEffect} from 'react';
import WebView from 'react-native-webview';

import webBridge from 'utils/webview-bridge';

export default function useWebView(
  webviewKey: string,
  ref: ForwardedRef<WebView>,
) {
  useEffect(() => {
    webBridge.addWebView(webviewKey, ref);

    return () => {
      webBridge.removeWebView(webviewKey);
    };
  }, []);
}
