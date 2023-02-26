import {CommonActions, useNavigation} from '@react-navigation/native';
import {authStorage} from 'stores';

import {STACK_NAVIGATION_PATH} from 'utils/constants';

export default function useShortNavigation() {
  const navigation = useNavigation();

  const resetToMainScreen = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: STACK_NAVIGATION_PATH.MAIN}],
      }),
    );
  };

  const logout = () => {
    authStorage.reset();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: STACK_NAVIGATION_PATH.ONBOARDING}],
      }),
    );
  };

  return {
    navigation,
    resetToMainScreen,
    logout,
  };
}
