import {CommonActions, Route, useNavigation} from '@react-navigation/native';
import {authStorage} from 'stores';

import {STACK_NAVIGATION_PATH} from 'utils/constants';

type ResetState = Omit<Route<string>, 'key'>;

export default function useShortNavigation() {
  const navigation = useNavigation();

  const resetScreenTo = (route: ResetState) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [route],
      }),
    );
  };

  const resetToMainScreen = () => {
    resetScreenTo({name: STACK_NAVIGATION_PATH.MAIN});
  };

  const logout = () => {
    authStorage.reset();
    resetScreenTo({name: STACK_NAVIGATION_PATH.ONBOARDING});
  };

  return {
    navigation,
    resetScreenTo,
    resetToMainScreen,
    logout,
  };
}
