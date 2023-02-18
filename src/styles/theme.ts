import {StyleSheet} from 'react-native';

export const COLORS = {
  white: '#FFFFFF',
  black: '#333333',
  red: '#FF7154',
  orange: '#FFB673',
  skyblue: '#7CCAE2',
  blue: '#5B9DFF',
  purple: '#7E85FF',
  fontHeadline: '#505050',
  fontBody: '#767676',
  fontDisabled: '#999999',
  gray: {
    0: '#F9F9F9',
    1: '#F2F3F5',
    2: '#E3E4E6',
    3: '#D5D5DB',
    4: '#B7BABF',
    5: '#979A9E',
  },
};

export const FONTS = StyleSheet.create({
  headline01: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 20 * 1.4,
    letterSpacing: 20 * -0.004,
  },
  headline02: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 14 * 1.4,
    letterSpacing: 14 * -0.004,
  },
  headline03: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 16 * 1.4,
    letterSpacing: 16 * -0.004,
  },
  headline04: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 14 * 1.3,
    letterSpacing: 14 * -0.004,
  },
  body01: {
    fontSize: 16,
    lineHeight: 16 * 1.4,
    letterSpacing: 16 * -0.004,
  },
  body02: {
    fontSize: 12,
    lineHeight: 12 * 1.3,
    letterSpacing: 12 * -0.004,
  },
});
