import {BASE_URL} from 'utils/constants';

import withAccessToken from 'hoc/withAccessToken';

import CustomSafeAreaView from 'components/CustomSafeAreaView';
import WebView from 'components/WebView';

export default withAccessToken(function ProfileScreen({accessToken}) {
  return (
    <CustomSafeAreaView>
      <WebView
        source={{
          uri: `${BASE_URL}/profile`,
          headers: {
            Authorization: accessToken,
          },
        }}
        automaticallyAdjustContentInsets={false}
      />
    </CustomSafeAreaView>
  );
});
