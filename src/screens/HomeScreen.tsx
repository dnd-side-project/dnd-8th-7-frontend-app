import WebView from '@/components/WebView';
import {Dimensions, View} from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{height: Dimensions.get('window').height}}>
      <WebView
        source={{uri: 'http://localhost:3000/webview-test'}}
        automaticallyAdjustContentInsets={false}
      />
    </View>
  );
}
