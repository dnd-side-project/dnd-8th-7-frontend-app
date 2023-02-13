import {ECallbackMessageType} from '../types/common.type';
import WebBridge from '../WebBridge';

const isRefExisted = (webviewKey: string) => {
  if (!WebBridge.webviewList.has(webviewKey)) return false;

  const ref = WebBridge.webviewList.get(webviewKey);
  if (!ref) {
    WebBridge.webviewList.delete(webviewKey);
    return false;
  }

  return true;
};

const onItemClick = (webviewKey: string, eventKey: string, value: string) => {
  if (!isRefExisted(webviewKey)) return;

  const ref = WebBridge.webviewList.get(webviewKey);
  // @ts-ignore
  ref?.current.postMessage(
    JSON.stringify({
      type: ECallbackMessageType.CALL_BACK,
      eventKey,
      data: {
        callbackKey: 'onItemClick',
        parameters: value,
      },
    }),
  );
};

const onClose = (webviewKey: string, eventKey: string) => {
  if (!isRefExisted(webviewKey)) return;

  const ref = WebBridge.webviewList.get(webviewKey);
  // @ts-ignore
  ref?.current.postMessage(
    JSON.stringify({
      type: ECallbackMessageType.CALL_BACK,
      eventKey,
      data: {
        callbackKey: 'onClose',
      },
    }),
  );
};

const bottomSheetBridge = {
  onItemClick,
  onClose,
};

export default bottomSheetBridge;
