import CustomSafeAreaView from 'components/CustomSafeAreaView';
import WebView from 'components/WebView';

export default function HomeScreen() {
  return (
    <CustomSafeAreaView>
      <WebView
        source={{uri: 'http://localhost:3000/home'}}
        automaticallyAdjustContentInsets={false}
      />
    </CustomSafeAreaView>
  );
}
