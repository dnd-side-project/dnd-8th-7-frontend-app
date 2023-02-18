import {useState, createContext} from 'react';
import {ListBottomSheetProps} from 'components/BottomSheet/ListBottomSheet';
import {EBottomSheetType} from 'components/BottomSheet/types';

interface BottomSheetsProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

type BottomSheetPropsType = {
  [EBottomSheetType.LIST]: ListBottomSheetProps;
};
type BottomSheetType = {
  webviewKey: string;
  key: string;
  type: EBottomSheetType.LIST;
  props: BottomSheetPropsType[BottomSheetType['type']];
};
interface BottomSheetsDispatch {
  open: (data: BottomSheetType) => void;
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

export const BottomSheetsContext = createContext<BottomSheetType[]>([]);

const BottomSheetsProvider = ({children}: BottomSheetsProviderProps) => {
  const [openedModals, setOpenedModals] = useState<BottomSheetType[]>([]);

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
    <BottomSheetsContext.Provider value={openedModals}>
      <BottomSheetsDispatchContext.Provider value={dispatch}>
        {children}
      </BottomSheetsDispatchContext.Provider>
    </BottomSheetsContext.Provider>
  );
};

export default BottomSheetsProvider;
