import {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

import {pixelSizeHorizontal, widthPixel} from 'styles/normalize';
import {COLORS} from 'styles/theme';

import CustomSafeAreaView from 'components/CustomSafeAreaView';
import Button from 'components/Button';
import TypoGraphy from 'components/Typography';
import Slider, {SliderHandleRef} from 'components/Slider';

const ONBOARDING_MOCK_DATA = [
  {
    title: '계획을 세웠는데도\n지키지 못한 적이 있다면',
    description: '하루 블럭이 해결해 줄 거에요!',
    imageUrl:
      'https://mblogthumb-phinf.pstatic.net/MjAxNzA4MjJfMjcw/MDAxNTAzMzU1NTI5Mjg0.OBV0OZkJQHRZzIWAtVDM60JLl9wq5WwiwnRTwgYqDq4g.II9maLicfuatQ8bxN7F6uUt1ZVa_95hP2OVB0Ig4uf8g.JPEG.doghter4our/IMG_0907.jpg?type=w800',
  },
  {
    title: '복잡한 일상을\n심플하게 만들어주는',
    description: '하루 계획을 블럭으로 나누어 할 일을 추가해요',
    imageUrl:
      'https://blog.kakaocdn.net/dn/bEBCGu/btq4BxAm6MX/h2kwUkbxW6BDvoJNKHgnr1/img.jpg',
  },
  {
    title: '하루 일기로\n오늘 하루를 정리하는',
    description: '하루가 어땠는지 간단하게 적어 봐요',
    imageUrl:
      'https://p16-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/f5ab5df30ca625fb0a7aa2d3cc087cbb.jpeg',
  },
  {
    title: '한달 리포트에서\n블럭 달성률을 확인하는',
    description: 'n가장 달성률이 높은 블럭은 뭘까요?',
    imageUrl:
      'https://i.pinimg.com/564x/87/f2/b5/87f2b5bfb4af3cfa0ed36501ec4df5b9.jpg',
  },
  {
    title: '친구를 팔로우하고\n하루 블럭을 공유하는',
    description: '오늘 하루 친구들의 블럭을 볼 수 있어요',
    imageUrl:
      'https://cdn.ppomppu.co.kr/zboard/data3/2019/0220/20190220141945_hplxucsz.jpg',
  },
];

export default function OnboardingPage() {
  const sliderRef = useRef<SliderHandleRef>(null);
  const transformAnim = new Animated.Value(widthPixel(15));
  const fadeAnim = new Animated.Value(0);

  const [curPage, setCurPage] = useState(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(transformAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [curPage]);

  const handleNextPress = () => {
    setCurPage(cur => Math.min(ONBOARDING_MOCK_DATA.length - 1, cur + 1));
    sliderRef.current?.moveNext();
  };

  return (
    <CustomSafeAreaView>
      <View style={[styles.container]}>
        <Animated.View
          style={{transform: [{translateY: transformAnim}], opacity: fadeAnim}}>
          <TypoGraphy level="headline00" style={styles.title}>
            {ONBOARDING_MOCK_DATA[curPage].title}
          </TypoGraphy>
          <TypoGraphy level="body02" style={styles.description}>
            {ONBOARDING_MOCK_DATA[curPage].description}
          </TypoGraphy>
        </Animated.View>
        <Slider
          ref={sliderRef}
          imageUrls={ONBOARDING_MOCK_DATA.map(({imageUrl}) => imageUrl)}
          onChange={cur => setCurPage(cur)}
        />
        <View style={{marginBottom: widthPixel(20)}}>
          <Button onPress={handleNextPress}>다음</Button>
        </View>
      </View>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingHorizontal: pixelSizeHorizontal(20),
    justifyContent: 'space-between',
  },
  headlineContainer: {},
  title: {
    marginTop: widthPixel(70),
    marginBottom: widthPixel(8),
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    color: COLORS.text100,
  },
});
