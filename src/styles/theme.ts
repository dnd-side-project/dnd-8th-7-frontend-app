import {StyleSheet} from 'react-native';
import {fontPixel} from './normalize';

export const COLORS = {
  white: '#FFFFFF',
  black: '#333333',
  red: '#FF7154',
  orange: '#FFB673',
  skyblue: '#7CCAE2',
  blue: '#5B9DFF',
  purple: '#7E85FF',
  text50: '#505050',
  text100: '#767676',
  text200: '#999999',
  gray50: '#F9F9F9',
  gray100: '#F2F3F5',
  gray200: '#E3E4E6',
  gray300: '#D5D5DB',
  gray400: '#B7BABF',
  gray500: '#979A9E',
};

export const TYPOGRAPHY = StyleSheet.create({
  headline01: {
    fontWeight: '700',
    fontSize: fontPixel(20),
    lineHeight: fontPixel(20) * 1.4,
    letterSpacing: fontPixel(20) * -0.004,
  },
  headline02: {
    fontWeight: '700',
    fontSize: fontPixel(14),
    lineHeight: fontPixel(14) * 1.4,
    letterSpacing: fontPixel(14) * -0.004,
  },
  headline03: {
    fontWeight: '700',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(16) * 1.4,
    letterSpacing: fontPixel(16) * -0.004,
  },
  headline04: {
    fontWeight: '700',
    fontSize: fontPixel(14),
    lineHeight: fontPixel(14) * 1.3,
    letterSpacing: fontPixel(14) * -0.004,
  },
  body01: {
    fontSize: fontPixel(16),
    lineHeight: fontPixel(16) * 1.4,
    letterSpacing: fontPixel(16) * -0.004,
  },
  body02: {
    fontSize: fontPixel(12),
    lineHeight: fontPixel(12) * 1.3,
    letterSpacing: fontPixel(12) * -0.004,
  },
});
