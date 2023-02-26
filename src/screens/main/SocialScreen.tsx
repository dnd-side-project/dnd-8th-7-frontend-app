import {BASE_URL} from 'utils/constants';

import withAccessToken from 'hoc/withAccessToken';

import CustomSafeAreaView from 'components/CustomSafeAreaView';
import WebView from 'components/WebView';

export default withAccessToken(function SocialScreen() {
  return (
    <CustomSafeAreaView>
      <WebView
        source={{uri: `${BASE_URL}/social`}}
        automaticallyAdjustContentInsets={false}
      />
    </CustomSafeAreaView>
  );
});
