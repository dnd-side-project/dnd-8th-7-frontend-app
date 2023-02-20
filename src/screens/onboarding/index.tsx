import {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

import {pixelSizeHorizontal, widthPixel} from 'styles/normalize';
import {COLORS} from 'styles/theme';

import CustomSafeAreaView from 'components/CustomSafeAreaView';
import Button from 'components/Button';
import TypoGraphy from 'components/Typography';
import Slider, {SliderHandleRef} from 'components/Slider';
import GoogleLogInButton from 'components/Button/GoogleLogIn';

const ONBOARDING_MOCK_DATA = [
  {
    title: '계획을 세웠는데도\n지키지 못한 적이 있다면',
    description: '하루 블럭이 해결해 줄 거에요!',
    imageUrl:
      'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc1f9ee53-1e17-455b-a823-1bd312806f9a%2F%25E1%2584%258B%25E1%2585%25A9%25E1%2586%25AB%25E1%2584%2587%25E1%2585%25A9%25E1%2584%2583%25E1%2585%25B5%25E1%2586%25BC_%25E1%2584%258B%25E1%2585%25B5%25E1%2584%2586%25E1%2585%25B5%25E1%2584%258C%25E1%2585%25B5_1.png?id=55806e37-c471-4234-a4fe-225d936f71a0&table=block&spaceId=6b88ddc4-f128-46b4-81c0-0c24c244ef18&width=1040&userId=855c1a47-1c01-4607-b7a4-b02a59dbf6e5&cache=v2',
  },
  {
    title: '복잡한 일상을\n심플하게 만들어주는',
    description: '하루 계획을 블럭으로 나누어 할 일을 추가해요',
    imageUrl:
      'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0a784320-e9ed-4377-a53d-ba4c33e9a432%2F%25E1%2584%258B%25E1%2585%25A9%25E1%2586%25AB%25E1%2584%2587%25E1%2585%25A9%25E1%2584%2583%25E1%2585%25B5%25E1%2586%25BC_%25E1%2584%258B%25E1%2585%25B5%25E1%2584%2586%25E1%2585%25B5%25E1%2584%258C%25E1%2585%25B5_2.png?id=992825dc-7590-49b2-86cd-3ceb38ed6ae5&table=block&spaceId=6b88ddc4-f128-46b4-81c0-0c24c244ef18&width=1040&userId=855c1a47-1c01-4607-b7a4-b02a59dbf6e5&cache=v2',
  },
  {
    title: '하루 일기로\n오늘 하루를 정리하는',
    description: '하루가 어땠는지 간단하게 적어 봐요',
    imageUrl:
      'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fdee17655-917d-4513-9567-4f18a1471a40%2F%25E1%2584%258B%25E1%2585%25A9%25E1%2586%25AB%25E1%2584%2587%25E1%2585%25A9%25E1%2584%2583%25E1%2585%25B5%25E1%2586%25BC_%25E1%2584%258B%25E1%2585%25B5%25E1%2584%2586%25E1%2585%25B5%25E1%2584%258C%25E1%2585%25B5_3.png?id=1ab0efed-5dd8-4e9c-abb5-365a9b96ccc6&table=block&spaceId=6b88ddc4-f128-46b4-81c0-0c24c244ef18&width=1200&userId=855c1a47-1c01-4607-b7a4-b02a59dbf6e5&cache=v2',
  },
  {
    title: '한달 리포트에서\n블럭 달성률을 확인하는',
    description: '가장 달성률이 높은 블럭은 뭘까요?',
    imageUrl:
      'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F21860b4c-0151-4bea-8f94-e62245110a49%2F%25E1%2584%258B%25E1%2585%25A9%25E1%2586%25AB%25E1%2584%2587%25E1%2585%25A9%25E1%2584%2583%25E1%2585%25B5%25E1%2586%25BC_%25E1%2584%258B%25E1%2585%25B5%25E1%2584%2586%25E1%2585%25B5%25E1%2584%258C%25E1%2585%25B5_4.png?id=1c2fb91d-c0c4-4245-8ccb-f288d3d44ee8&table=block&spaceId=6b88ddc4-f128-46b4-81c0-0c24c244ef18&width=1040&userId=855c1a47-1c01-4607-b7a4-b02a59dbf6e5&cache=v2',
  },
  {
    title: '친구를 팔로우하고\n하루 블럭을 공유하는',
    description: '오늘 하루 친구들의 블럭을 볼 수 있어요',
    imageUrl:
      'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0ecda0e6-5c5c-4954-b891-b869d529b375%2F%25E1%2584%258B%25E1%2585%25A9%25E1%2586%25AB%25E1%2584%2587%25E1%2585%25A9%25E1%2584%2583%25E1%2585%25B5%25E1%2586%25BC_%25E1%2584%258B%25E1%2585%25B5%25E1%2584%2586%25E1%2585%25B5%25E1%2584%258C%25E1%2585%25B5_5.png?id=de05b039-cc24-4fcc-aad0-1179df98515b&table=block&spaceId=6b88ddc4-f128-46b4-81c0-0c24c244ef18&width=1040&userId=855c1a47-1c01-4607-b7a4-b02a59dbf6e5&cache=v2',
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
          {curPage !== ONBOARDING_MOCK_DATA.length - 1 ? (
            <Button onPress={handleNextPress}>다음</Button>
          ) : (
            <GoogleLogInButton />
          )}
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
