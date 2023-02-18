import {Pressable, type PressableProps, StyleSheet} from 'react-native';

import {pixelSizeVertical} from 'styles/normalize';
import {COLORS} from 'styles/theme';

import TypoGraphy from 'components/Typography';

interface Props extends Omit<PressableProps, 'style'> {
  children: string;
}

export default function Button({children, ...props}: Props) {
  return (
    <Pressable {...props} style={[styles.container]}>
      <TypoGraphy level="headline03" style={styles.text}>
        {children}
      </TypoGraphy>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    backgroundColor: COLORS.black,
    paddingVertical: pixelSizeVertical(13),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: COLORS.white,
  },
});
