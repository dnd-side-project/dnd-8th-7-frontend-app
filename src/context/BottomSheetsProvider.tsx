import {useState, createContext} from 'react';

import {EBottomSheetType} from '@/components/BottomSheet/types';

import {ListBottomSheetProps} from '@/components/BottomSheet/ListBottomSheet';
import {SelectBottomSheetProps} from '@/components/BottomSheet/SelectBottomSheet';

interface BottomSheetsProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

type BottomSheetPropsType = {
  [EBottomSheetType.LIST]: ListBottomSheetProps;
  [EBottomSheetType.SELECT]: SelectBottomSheetProps;
};
type BottomSheetStateType = {
  wvKey: string;
  key: string;
  type: EBottomSheetType.LIST | EBottomSheetType.SELECT;
  props: BottomSheetPropsType[BottomSheetStateType['type']];
};
interface BottomSheetsDispatch {
  open: (data: BottomSheetStateType) => void;
  close: (key: string) => void;
}

export const BottomSheetsDispatchContext = createContext<BottomSheetsDispatch>({
  open: () => {
    return;
  },
  close: () => {
    return;
  },
});

export const BottomSheetsStateContext = createContext<BottomSheetStateType[]>(
  [],
);

const BottomSheetsProvider = ({children}: BottomSheetsProviderProps) => {
  const [openedModals, setOpenedModals] = useState<BottomSheetStateType[]>([]);

  const open: BottomSheetsDispatch['open'] = bottomSheet => {
    setOpenedModals(bottomSheets => [...bottomSheets, bottomSheet]);
  };

  const close: BottomSheetsDispatch['close'] = key => {
    setOpenedModals(bottomSheets =>
      bottomSheets.filter(bottomSheet => bottomSheet.key !== key),
    );
  };

  const dispatch = {open, close};

  return (
    <BottomSheetsStateContext.Provider value={openedModals}>
      <BottomSheetsDispatchContext.Provider value={dispatch}>
        {children}
      </BottomSheetsDispatchContext.Provider>
    </BottomSheetsStateContext.Provider>
  );
};

export default BottomSheetsProvider;
