import {ReactNode} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

import {BottomSheetWVCallbacks} from 'utils/webview-bridge/types/common.type';

import {COLORS, TYPOGRAPHY} from 'styles/theme';
import {pixelSizeHorizontal, pixelSizeVertical} from 'styles/normalize';

import BottomSheet, {BottomSheetProps} from 'components/BottomSheet';

export type Item = {
  key: string;
  title: ReactNode;
};

export interface ListBottomSheetProps
  extends BottomSheetProps,
    BottomSheetWVCallbacks {
  items?: Item[];
}

export default function ListBottomSheet({
  items,
  onItemClick,
  ...props
}: ListBottomSheetProps) {
  return (
    <BottomSheet {...props}>
      <View style={styles.contentContainer}>
        {items?.map(item => (
          <TouchableHighlight
            key={item.key}
            underlayColor={COLORS.gray500}
            onPress={() => onItemClick?.(item.key)}>
            {typeof item.title === 'string' ? (
              <View style={styles.element}>
                <Text style={[TYPOGRAPHY.body02, {color: COLORS.text100}]}>
                  {item.title}
                </Text>
              </View>
            ) : (
              item.title
            )}
          </TouchableHighlight>
        ))}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  element: {
    width: '100%',
    backgroundColor: COLORS.white,
    paddingHorizontal: pixelSizeVertical(20),
    paddingVertical: pixelSizeHorizontal(12),
  },
  contentContainer: {
    paddingTop: pixelSizeVertical(16),
    paddingBottom: pixelSizeVertical(50),
  },
});
