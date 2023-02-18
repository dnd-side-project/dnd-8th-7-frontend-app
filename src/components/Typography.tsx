import {Text, type TextProps} from 'react-native';

import {TYPOGRAPHY, TypographyType} from 'styles/theme';

interface Props extends TextProps {
  level?: TypographyType;
}

export default function TypoGraphy({
  children,
  level = 'body02',
  style,
  ...props
}: Props) {
  return (
    <Text {...props} style={[TYPOGRAPHY[level], style]}>
      {children}
    </Text>
  );
}
