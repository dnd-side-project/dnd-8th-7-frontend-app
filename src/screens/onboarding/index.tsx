import {View, StyleSheet} from 'react-native';

import {pixelSizeHorizontal} from 'styles/normalize';

import CustomSafeAreaView from 'components/CustomSafeAreaView';
import Button from 'components/Button';
import TypoGraphy from 'components/Typography';
import Gap from 'components/Gap';
import Slider from 'components/Slider';

export default function OnboardingPage() {
  return (
    <CustomSafeAreaView>
      <View style={[styles.container]}>
        <TypoGraphy level="headline00" style={styles.title}>
          당신의 하루를{'\n'}블럭으로 나눠보세요
        </TypoGraphy>
        <Gap n={30} />
        <Slider />
        <Gap n={60} />
        <Button>다음</Button>
      </View>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: pixelSizeHorizontal(20),
    justifyContent: 'flex-end',
  },
  title: {
    textAlign: 'center',
  },
});
