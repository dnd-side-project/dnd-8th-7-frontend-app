export enum EBottomSheetType {
  LIST = 'LIST',
  SELECT = 'SELECT',
  MULTI_SELECT = 'MULTI_SELECT',
  EMOJI = 'EMOJI',
}
export type BottomSheetType = keyof typeof EBottomSheetType;
