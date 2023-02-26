import CustomSafeAreaView from 'components/CustomSafeAreaView';

import withAccessToken from 'hoc/withAccessToken';

import WebView from 'components/WebView';
import {BASE_URL} from 'utils/constants';

export default withAccessToken(function ReportScreen({accessToken}) {
  return (
    <CustomSafeAreaView>
      <WebView
        source={{
          uri: `${BASE_URL}/report`,
          headers: {
            Authorization: accessToken,
          },
        }}
        automaticallyAdjustContentInsets={false}
      />
    </CustomSafeAreaView>
  );
});
