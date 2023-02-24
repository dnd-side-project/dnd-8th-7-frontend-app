// WebView -> WV

/**
 * @description WebView -> RN 받을 수 있는 메세지 종류
 */
export enum EWVMessageType {
  OPEN_BOTTOM_SHEET = 'OPEN_BOTTOM_SHEET',
  CLOSE_BOTTOM_SHEET = 'CLOSE_BOTTOM_SHEET',
  OPEN_NEW_WEBVIEW = 'OPEN_NEW_WEBVIEW',
  CLOSE_NEW_WEBVIEW = 'CLOSE_NEW_WEBVIEW',
  ACTION = 'ACTION',
}
export type WVMessageType = keyof typeof EWVMessageType;
export type WVMessageData<T = Record<string | number, unknown>> = {
  eventKey: string;
  contents?: T;
};

export enum ACTION_TYPE {
  GO_MAIN = 'GO_MAIN',
  LOGOUT = 'LOGOUT',
}
export type ActionType = keyof typeof ACTION_TYPE;

/**
 * @description RN -> WebView 보낼 수 있는 메세지 종류
 */
export enum ECallbackMessageType {
  CALL_BACK = 'CALL_BACK',
}
export type CallbackMessageType = keyof typeof ECallbackMessageType;
export type CallbackMessageData = {
  type: string;
  eventKey?: string;
  data?: CallbackDataType;
};
export type CallbackDataType = {
  callbackKey: BottomSheetWVCallbackType;
  parameters?: any;
};

/**
 * @description RN에서 정의되어 있어야 하는 콜백 함수입니다.
 */
export type BottomSheetWVCallbacks = {
  onItemClick?: (key: string) => void;
  onClose?: () => void;
};
export type BottomSheetWVCallbackType = keyof BottomSheetWVCallbacks;
