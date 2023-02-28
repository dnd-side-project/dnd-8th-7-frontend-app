import {isRefExisted} from 'utils/webview-bridge';
import {CallbackMessageData, ECallbackMessageType} from '../types/common.type';
import WebBridge from '../WebBridge';

const onImagePick = (webviewKey: string, eventKey: string, value: string) => {
  if (!isRefExisted(webviewKey)) return;

  const ref = WebBridge.webviewList.get(webviewKey);
  const message: CallbackMessageData = {
    type: ECallbackMessageType.CALL_BACK,
    eventKey,
    data: {
      callbackKey: 'onImagePick',
      parameters: value,
    },
  };

  // @ts-ignore
  ref?.current.postMessage(JSON.stringify(message));
};

const imagePickerBridge = {
  onImagePick,
};

export default imagePickerBridge;
