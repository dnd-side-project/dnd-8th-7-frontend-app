import {StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {COLORS, TYPOGRAPHY} from 'styles/theme';
import {pixelSizeHorizontal} from 'styles/normalize';
import {API_URL, STACK_NAVIGATION_PATH} from 'utils/constants';

import {FullWebViewScreenNavigationProp} from 'types/common.type';

import Button from 'components/Button';
import {GoogleLogo} from 'components/icons';

export default function GoogleLogInButton() {
  const navigation = useNavigation<FullWebViewScreenNavigationProp>();

  const handleLogin = () => {
    navigation.push(STACK_NAVIGATION_PATH.OAUTH_WEBVIEW, {
      url: `${API_URL}/api/login/google`,
    });
  };

  return (
    <Button buttonStyle={[styles.container]} onPress={handleLogin}>
      <GoogleLogo size={20} />
      <Text style={[TYPOGRAPHY.headline03, styles.text]}>
        구글 계정으로 로그인
      </Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray400,
    borderWidth: 1,
  },
  text: {
    marginLeft: pixelSizeHorizontal(10),
    textAlign: 'center',
    color: COLORS.black,
  },
});
