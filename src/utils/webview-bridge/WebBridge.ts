import {ForwardedRef} from 'react';
import WebView from 'react-native-webview';

type WVRef = ForwardedRef<WebView<{}>>;
export default class WebBridge {
  static webviewList = new Map<string, WVRef>();

  addWebView(wvKey: string, ref: WVRef) {
    WebBridge.webviewList.set(wvKey, ref);
  }

  removeWebView(wvKey: string) {
    if (WebBridge.webviewList.has(wvKey)) {
      WebBridge.webviewList.delete(wvKey);
    }
  }
}
