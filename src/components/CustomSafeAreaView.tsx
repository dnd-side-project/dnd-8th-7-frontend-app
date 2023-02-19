import {PropsWithChildren} from 'react';
import {SafeAreaView} from 'react-native';

import {COLORS} from 'styles/theme';

export default function CustomSafeAreaView({children}: PropsWithChildren) {
  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: COLORS.white,
      }}>
      {children}
    </SafeAreaView>
  );
}
