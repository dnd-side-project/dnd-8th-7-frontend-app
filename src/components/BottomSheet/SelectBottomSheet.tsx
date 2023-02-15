import {ReactNode} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

import {BottomSheetWVCallbacks} from '@/utils/webview-bridge/types/common.type';

import {COLORS, TYPOGRAPHY} from '@/styles/theme';
import {pixelSizeHorizontal, pixelSizeVertical} from '@/styles/normalize';

import BottomSheet, {BottomSheetProps} from '@/components/BottomSheet';

export type Item = {
  key: string;
  title: string | ReactNode;
};

export interface SelectBottomSheetProps
  extends BottomSheetProps,
    BottomSheetWVCallbacks {
  multiple?: boolean;
  defaultSelect?: string[];
  select?: string[];
  items?: Item[];
}

export default function SelectBottomSheet({
  items,
  multiple = false,
  defaultSelect = [],
  select = [],
  onItemClick,
  ...props
}: SelectBottomSheetProps) {
  return (
    <BottomSheet {...props}>
      {items?.map(item => (
        <TouchableHighlight
          key={item.key}
          underlayColor={COLORS.gray500}
          onPress={() => onItemClick?.(item.key)}>
          <View style={styles.elementContainer}>
            {typeof item.title === 'string' ? (
              <View style={styles.element}>
                <Text style={[TYPOGRAPHY.body02, {color: COLORS.text100}]}>
                  {item.title}
                </Text>
              </View>
            ) : (
              item.title
            )}
          </View>
        </TouchableHighlight>
      ))}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  elementContainer: {
    paddingHorizontal: pixelSizeVertical(20),
  },
  element: {
    width: '100%',
    backgroundColor: COLORS.white,
    paddingVertical: pixelSizeHorizontal(12),
  },
});
