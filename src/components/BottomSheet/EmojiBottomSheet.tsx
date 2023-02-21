import {ReactNode} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  FlatList,
} from 'react-native';

import {BottomSheetWVCallbacks} from 'utils/webview-bridge/types/common.type';

import {COLORS} from 'styles/theme';
import {
  fontPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from 'styles/normalize';

import BottomSheet, {BottomSheetProps} from 'components/BottomSheet';
import {EMOJI} from 'utils/constants/emoji';

export type Item = {
  key: string;
  title: ReactNode;
};

export interface EmojiBottomSheetProps
  extends BottomSheetProps,
    BottomSheetWVCallbacks {}

export default function EmojiBottomSheet({
  onItemClick,
  title = '이모티콘 선택',
  ...props
}: EmojiBottomSheetProps) {
  return (
    <BottomSheet title={title} {...props}>
      <FlatList
        columnWrapperStyle={styles.wrapper}
        contentContainerStyle={styles.container}
        data={EMOJI.map(emoji => ({title: emoji, id: emoji}))}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        renderItem={({item}) => (
          <TouchableHighlight
            style={styles.element}
            underlayColor={COLORS.gray500}
            onPress={() => onItemClick?.(item.title)}>
            <Text style={styles.emojiText}>{item.title}</Text>
          </TouchableHighlight>
        )}
        keyExtractor={item => item.id}
        numColumns={5}
      />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: pixelSizeVertical(16),
    paddingBottom: pixelSizeVertical(20),
    paddingHorizontal: pixelSizeHorizontal(30),
  },
  wrapper: {
    justifyContent: 'space-between',
    gap: widthPixel(10),
  },
  seperator: {
    height: widthPixel(22),
  },
  element: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPixel(36),
    height: widthPixel(36),
    backgroundColor: COLORS.white,
    textAlign: 'center',
    borderRadius: 12,
  },
  emojiText: {
    fontSize: fontPixel(26),
  },
});
