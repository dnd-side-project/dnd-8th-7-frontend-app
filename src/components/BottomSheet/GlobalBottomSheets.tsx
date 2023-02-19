import React, {useContext} from 'react';

import bottomSheetBridge from 'utils/webview-bridge/bridges/bottomsheetBridge';

import {EBottomSheetType} from './types';

import ListBottomSheet from 'components/BottomSheet/ListBottomSheet';
import EmojiBottomSheet from 'components/BottomSheet/EmojiBottomSheet';
import {GlobalComponentContext} from 'context/GlobalComponentProvider';

const BottomSheetComponent = {
  [EBottomSheetType.LIST]: ListBottomSheet,
  [EBottomSheetType.EMOJI]: EmojiBottomSheet,
};

export default function GlobalBottomSheets() {
  const {bottomSheets} = useContext(GlobalComponentContext);

  return (
    <>
      {bottomSheets.list.map(bottomSheet => {
        const {key, type, props, webviewKey} = bottomSheet;

        const handleItemClick = (value: string) => {
          props?.onItemClick?.(value);
          if (webviewKey) {
            bottomSheetBridge.onItemClick(webviewKey, key, value);
          }
        };

        const handleClose = () => {
          props?.onClose?.();
          bottomSheets.close(key);

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
