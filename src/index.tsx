import StackNavigation from 'navigations/StackNavigation';
import BottomSheetsProvider from 'context/BottomSheetsProvider';
import GlobalBottomSheets from 'components/BottomSheet/GlobalBottomSheets';

function App() {
  return (
    <BottomSheetsProvider>
      <StackNavigation />
      <GlobalBottomSheets />
    </BottomSheetsProvider>
  );
}

export default App;
