import {useState, createContext, useMemo} from 'react';
import {BottomSheetsContext} from 'utils/webview-bridge/types/bottomSheets.type';

interface GlobalComponentProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

type ContextText = {
  bottomSheets: BottomSheetsContext;
};

export const GlobalComponentContext = createContext<ContextText>(
  {} as ContextText,
);

const useBottomSheetContext = () => {
  const [openedModals, setOpenedModals] = useState<BottomSheetsContext['list']>(
    [],
  );
  const bottomSheetAction = useMemo(() => {
    const open: BottomSheetsContext['open'] = bottomSheet => {
      setOpenedModals(bottomSheets => [...bottomSheets, bottomSheet]);
    };

    const close: BottomSheetsContext['close'] = key => {
      setOpenedModals(bottomSheets =>
        bottomSheets.filter(bottomSheet => bottomSheet.key !== key),
      );
    };

    return {open, close};
  }, []);

  return {...bottomSheetAction, list: openedModals};
};

const GlobalComponentProvider = ({children}: GlobalComponentProviderProps) => {
  const bottomSheets = useBottomSheetContext();

  const dispatch = {
    bottomSheets,
  };

  return (
    <GlobalComponentContext.Provider value={dispatch}>
      {children}
    </GlobalComponentContext.Provider>
  );
};

export default GlobalComponentProvider;
