import {ReactNode} from 'react';
import {
  Pressable,
  type PressableProps,
  StyleSheet,
  ViewProps,
} from 'react-native';

import {pixelSizeHorizontal} from 'styles/normalize';
import {COLORS, TYPOGRAPHY} from 'styles/theme';

import TypoGraphy from 'components/Typography';

interface Props extends Omit<PressableProps, 'style'> {
  children: ReactNode;
  buttonStyle?: ViewProps['style'];
}

export default function Button({children, buttonStyle = [], ...props}: Props) {
  return (
    <Pressable
      {...props}
      style={[
        styles.container,
        props?.disabled && styles.disabled,
        buttonStyle,
      ]}>
      {typeof children === 'string' ? (
        <TypoGraphy
          level="headline03"
          style={[
            TYPOGRAPHY.headline03,
            styles.text,
            props?.disabled && styles.disabledText,
          ]}>
          {children}
        </TypoGraphy>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    backgroundColor: COLORS.black,
    paddingVertical: pixelSizeHorizontal(13),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: COLORS.gray100,
  },
  text: {
    textAlign: 'center',
    color: COLORS.white,
  },
  disabledText: {
    color: COLORS.text200,
  },
});
