import {RouteProp, useRoute} from '@react-navigation/native';
import CustomSafeAreaView from 'components/CustomSafeAreaView';
import {RouteParams} from 'types/common.type';
import WebView from 'components/WebView';

interface Props {
  url?: string;
}

export default function FullWebViewScreen({url}: Props) {
  const route = useRoute<RouteProp<RouteParams, 'fullWebViewParams'>>();
  let uri = route.params?.url || url || '';

  /**
   * TODO uri undefined일 경우 화면 처리
   */
  return (
    <CustomSafeAreaView>
      <WebView source={{uri}} automaticallyAdjustContentInsets={false} />
    </CustomSafeAreaView>
  );
}
