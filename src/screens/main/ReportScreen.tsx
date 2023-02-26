import CustomSafeAreaView from 'components/CustomSafeAreaView';

import withAccessToken from 'hoc/withAccessToken';

import WebView from 'components/WebView';
import {BASE_URL} from 'utils/constants';

export default withAccessToken(function ReportScreen() {
  return (
    <CustomSafeAreaView>
      <WebView
        source={{uri: `${BASE_URL}/report`}}
        automaticallyAdjustContentInsets={false}
      />
    </CustomSafeAreaView>
  );
});
