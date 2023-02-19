import React, {useContext} from 'react';

import {
  BottomSheetsDispatchContext,
  BottomSheetsContext,
} from 'context/BottomSheetsProvider';
import bottomSheetBridge from 'utils/webview-bridge/bridges/bottomsheetBridge';

import {EBottomSheetType} from './types';

import ListBottomSheet from 'components/BottomSheet/ListBottomSheet';
import EmojiBottomSheet from 'components/BottomSheet/EmojiBottomSheet';

const BottomSheetComponent = {
  [EBottomSheetType.LIST]: ListBottomSheet,
  [EBottomSheetType.EMOJI]: EmojiBottomSheet,
};

export default function GlobalBottomSheets() {
  const openedBottomSheets = useContext(BottomSheetsContext);
  const {close} = useContext(BottomSheetsDispatchContext);

  return (
    <>
      {openedBottomSheets.map(bottomSheet => {
        const {key, type, props, webviewKey} = bottomSheet;

        const handleItemClick = (value: string) => {
          props?.onItemClick?.(value);
          if (webviewKey) {
            bottomSheetBridge.onItemClick(webviewKey, key, value);
          }
        };

        const handleClose = () => {
          props?.onClose?.();
          close(key);

          if (webviewKey) {
            bottomSheetBridge.onClose(webviewKey, key);
          }
        };

        const BottomSheet = BottomSheetComponent[type];
        return (
          <BottomSheet
            {...props}
            key={key}
            modalVisible={true}
            onClose={handleClose}
            onItemClick={handleItemClick}
          />
        );
      })}
    </>
  );
}
