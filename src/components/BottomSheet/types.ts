export enum EBottomSheetType {
  LIST = 'LIST',
  SELECT = 'SELECT',
  MULTI_SELECT = 'MULTI_SELECT',
  REACTION = 'REACTION',
}
export type BottomSheetType = keyof typeof EBottomSheetType;
