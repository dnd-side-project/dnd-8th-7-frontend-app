import StackNavigation from 'navigations/StackNavigation';
import GlobalComponentProvider from 'context/GlobalComponentProvider';
import GlobalBottomSheets from 'components/BottomSheet/GlobalBottomSheets';

function App() {
  return (
    <GlobalComponentProvider>
      <StackNavigation />
      <GlobalBottomSheets />
    </GlobalComponentProvider>
  );
}

export default App;
