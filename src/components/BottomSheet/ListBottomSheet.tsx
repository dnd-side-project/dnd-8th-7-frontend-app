import {Text} from 'react-native';
import BottomSheet, {BottomSheetProps} from '@/components/BottomSheet';
import {BottomSheetWVCallbacks} from '@/utils/webview-bridge/types/common.type';

export type Item = {
  key: string;
  title: string;
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
      {items?.map(item => (
        <Text key={item.key} onPress={() => onItemClick?.(item.key)}>
          {item.title}
        </Text>
      ))}
    </BottomSheet>
  );
}
