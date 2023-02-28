import {isRefExisted} from 'utils/webview-bridge';
import {CallbackMessageData, ECallbackMessageType} from '../types/common.type';
import WebBridge from '../WebBridge';

import API from 'api';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';
import {authStorage} from 'stores';

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

export const webviewLaunchImageLibrary = (
  webviewKey: string,
  eventKey: string,
) => {
  launchImageLibrary({mediaType: 'photo'}, async ({didCancel, assets}) => {
    if (!didCancel) {
      const formdata = new FormData();
      const file = {
        name: assets?.[0]?.fileName,
        type: assets?.[0]?.type,
        uri: assets?.[0]?.uri,
      };
      formdata.append('image', file);

      try {
        const {accessToken} = await authStorage.get();
        const {data: imageUrl} = await API.post('/api/user/image', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        imagePickerBridge.onImagePick(webviewKey, eventKey, imageUrl);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error);
        }
      }
    }
  });
};
