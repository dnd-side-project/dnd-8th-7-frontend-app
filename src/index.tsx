import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from 'navigations/StackNavigation';

import GlobalComponentProvider from 'context/GlobalComponentProvider';

import GlobalBottomSheets from 'components/BottomSheet/GlobalBottomSheets';
function App() {
  return (
    <NavigationContainer>
      <GlobalComponentProvider>
        <StackNavigation />
        <GlobalBottomSheets />
      </GlobalComponentProvider>
    </NavigationContainer>
  );
}

export default App;
