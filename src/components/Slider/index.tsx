import {heightPixel, pixelSizeHorizontal} from 'styles/normalize';
import {COLORS} from 'styles/theme';
import {StyleSheet, View} from 'react-native';

export default function Slider() {
  return (
    <View>
      <View style={styles.viewer}></View>
      <View style={styles.points}>
        {Array.from({length: 4}).map((_, idx) => (
          <Point active={idx === 1} />
        ))}
      </View>
    </View>
  );
}

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
  viewer: {
    height: heightPixel(400),
    backgroundColor: COLORS.gray50,
    borderRadius: 14,
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
