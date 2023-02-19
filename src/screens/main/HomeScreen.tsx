import {BASE_URL} from 'utils/constants';

import CustomSafeAreaView from 'components/CustomSafeAreaView';
import WebView from 'components/WebView';

export default function HomeScreen() {
  return (
    <CustomSafeAreaView>
      <WebView
        source={{uri: `${BASE_URL}/home`}}
        automaticallyAdjustContentInsets={false}
      />
    </CustomSafeAreaView>
  );
}
