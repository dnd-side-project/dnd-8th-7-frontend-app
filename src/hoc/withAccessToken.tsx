import {Text} from 'react-native';

import useAccessToken from 'hooks/useAccessToken';

export default function withAccessToken(
  WrappedComponent: (props?: any) => JSX.Element,
) {
  const Component = (props?: any) => {
    const {accessToken, isLoading, logout} = useAccessToken();

    if (isLoading) {
      return <Text>로딩 중</Text>;
    }

    if (!accessToken) {
      logout();
      return null;
    }

    console.log(accessToken);

    return <WrappedComponent {...props} accessToken={accessToken} />;
  };

  return Component;
}
