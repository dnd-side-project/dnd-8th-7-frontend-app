import {Image, StyleSheet, View} from 'react-native';

import SplashLogo from 'assets/splash_logo.png';

import CustomSafeAreaView from 'components/CustomSafeAreaView';
import {pixelSizeHorizontal} from 'styles/normalize';

export default function SplashPage() {
  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <Image source={SplashLogo} style={styles.logo} />
      </View>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  logo: {
    width: pixelSizeHorizontal(89),
    height: pixelSizeHorizontal(97),
  },
});
