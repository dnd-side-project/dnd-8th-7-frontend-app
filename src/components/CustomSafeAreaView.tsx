import {PropsWithChildren} from 'react';
import {Dimensions, SafeAreaView} from 'react-native';

import {COLORS} from 'styles/theme';

export default function CustomSafeAreaView({children}: PropsWithChildren) {
  return (
    <SafeAreaView
      style={{
        height: Dimensions.get('window').height,
        backgroundColor: COLORS.white,
      }}>
      {children}
    </SafeAreaView>
  );
}
