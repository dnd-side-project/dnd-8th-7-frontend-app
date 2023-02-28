import WebBridge from './WebBridge';

const webBridge = new WebBridge();
export default webBridge;

export const isRefExisted = (webviewKey: string) => {
  if (!WebBridge.webviewList.has(webviewKey)) return false;

  const ref = WebBridge.webviewList.get(webviewKey);
  if (!ref) {
    WebBridge.webviewList.delete(webviewKey);
    return false;
  }

  return true;
};
