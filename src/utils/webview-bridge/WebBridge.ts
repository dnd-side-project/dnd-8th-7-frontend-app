import {ForwardedRef} from 'react';
import WebView from 'react-native-webview';

type WVRef = ForwardedRef<WebView<{}>>;
export default class WebBridge {
  static webviewList = new Map<string, WVRef>();

  addWebView(webviewKey: string, ref: WVRef) {
    WebBridge.webviewList.set(webviewKey, ref);
  }

  removeWebView(webviewKey: string) {
    if (WebBridge.webviewList.has(webviewKey)) {
      WebBridge.webviewList.delete(webviewKey);
    }
  }
}
