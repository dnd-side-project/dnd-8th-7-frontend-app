import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Animated, Image, PanResponder, StyleSheet, View} from 'react-native';

import {pixelSizeHorizontal, widthPixel} from 'styles/normalize';
import {COLORS} from 'styles/theme';

import Gap from 'components/Gap';

export type SliderHandleRef = {
  moveNext: () => void;
};

interface Props {
  imageUrls?: string[];
  onChange?: (curPage: number, prevPage: number) => void;
  defaultPage?: number;
}

export default forwardRef<SliderHandleRef, Props>(function Slider(
  {imageUrls = [], onChange, defaultPage = 0},
  ref,
) {
  const sliderSize = imageUrls.length;

  const [curPage, setCurPage] = useState(defaultPage);

  const imageWidth = widthPixel(260);
  const panX = useRef(new Animated.Value(curPage)).current;

  const moveImage = (page: number) =>
    Animated.timing(panX, {
      toValue: -(page * imageWidth),
      duration: 300,
      useNativeDriver: true,
    });

  const handleMoveImage = (page: number) => {
    onChange?.(page, curPage);
    moveImage(page).start();
    setCurPage(page);
  };

  const panResponders = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      panX.setValue(-(curPage * imageWidth) + gestureState.dx);
    },
    onPanResponderRelease: (_, gestureState) => {
      if (
        Math.abs(gestureState.vx) > 1 ||
        Math.abs(gestureState.dx) > imageWidth * 0.8
      ) {
        if (gestureState.dx > 0) {
          const nextPage = Math.max(0, curPage - 1);
          handleMoveImage(nextPage);
        } else {
          const nextPage = Math.min(sliderSize - 1, curPage + 1);
          handleMoveImage(nextPage);
        }
      } else {
        moveImage(curPage).start();
      }
    },
  });

  useImperativeHandle(
    ref,
    () => ({
      moveNext: () => {
        const nextPage = Math.min(sliderSize - 1, curPage + 1);
        handleMoveImage(nextPage);
      },
    }),
    [curPage, sliderSize],
  );

  return (
    <View style={styles.container}>
      <View style={styles.viewerContainer} {...panResponders.panHandlers}>
        <Animated.View
          style={{
            ...styles.viewer,
            transform: [{translateX: panX}],
          }}>
          {imageUrls.map(url => (
            <View key={url} style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: url,
                }}
              />
            </View>
          ))}
        </Animated.View>
      </View>
      <Gap n={69} />
      <View style={styles.points}>
        {Array.from({length: sliderSize}).map((_, idx) => (
          <Point key={idx} active={idx === curPage} />
        ))}
      </View>
    </View>
  );
});

function Point({active = false}) {
  return (
    <View
      style={[
        styles.point,
        {backgroundColor: active ? COLORS.black : COLORS.gray200},
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  viewerContainer: {
    width: widthPixel(260),
    overflow: 'hidden',
  },
  viewer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 14,
    width: widthPixel(260),
    height: widthPixel(324),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  points: {
    flexDirection: 'row',
    gap: pixelSizeHorizontal(10),
    width: '100%',
    justifyContent: 'center',
    marginTop: pixelSizeHorizontal(20),
  },
  point: {
    height: pixelSizeHorizontal(6),
    width: pixelSizeHorizontal(6),
    borderRadius: 100,
  },
});
