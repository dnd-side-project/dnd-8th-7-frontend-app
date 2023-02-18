import React, {useContext} from 'react';
import {
  BottomSheetsDispatchContext,
  BottomSheetsStateContext,
} from 'context/BottomSheetsProvider';
import ListBottomSheet from 'components/BottomSheet/ListBottomSheet';
import {EBottomSheetType} from './types';
import bottomSheetBridge from 'utils/webview-bridge/bridges/bottomsheetBridge';

export default function GlobalBottomSheets() {
  const openedBottomSheets = useContext(BottomSheetsStateContext);
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

        switch (type) {
          case EBottomSheetType.LIST:
            return (
              <ListBottomSheet
                {...props}
                key={key}
                modalVisible={true}
                onClose={handleClose}
                onItemClick={handleItemClick}
              />
            );
        }
      })}
    </>
  );
}
