import {EBottomSheetType} from 'components/BottomSheet/types';

import type {EmojiBottomSheetProps} from 'components/BottomSheet/EmojiBottomSheet';
import type {ListBottomSheetProps} from 'components/BottomSheet/ListBottomSheet';

export type BottomSheetPropsType = {
  [EBottomSheetType.LIST]: ListBottomSheetProps;
  [EBottomSheetType.EMOJI]: EmojiBottomSheetProps;
};
export type BottomSheetType = {
  webviewKey: string;
  key: string;
  type: EBottomSheetType.LIST;
  props: BottomSheetPropsType[BottomSheetType['type']];
};
export interface BottomSheetsContext {
  open: (data: BottomSheetType) => void;
  close: (key: string) => void;
  list: BottomSheetType[];
}
