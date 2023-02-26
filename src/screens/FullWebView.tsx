import {RouteProp, useRoute} from '@react-navigation/native';

import withAccessToken from 'hoc/withAccessToken';
import {RouteParams} from 'types/common.type';

import CustomSafeAreaView from 'components/CustomSafeAreaView';
import WebView from 'components/WebView';

interface Props {
  accessToken: string;
  url?: string;
}

export default withAccessToken(function FullWebViewScreen({
  accessToken,
  url,
}: Props) {
  const route = useRoute<RouteProp<RouteParams, 'fullWebViewParams'>>();
  let uri = route.params?.url || url || '';

  /**
   * TODO uri undefined일 경우 화면 처리
   */
  return (
    <CustomSafeAreaView>
      <WebView
        source={{
          uri,
          headers: {
            Authorization: accessToken,
          },
        }}
        automaticallyAdjustContentInsets={false}
      />
    </CustomSafeAreaView>
  );
});
