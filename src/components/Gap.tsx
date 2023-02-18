import {heightPixel} from 'styles/normalize';
import {View} from 'react-native';

export default function Gap({n}: {n: number}) {
  return <View style={{height: heightPixel(n)}} />;
}
