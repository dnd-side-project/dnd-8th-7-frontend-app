import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@/styles/normalize';
import {COLORS, TYPOGRAPHY} from '@/styles/theme';
import React, {PropsWithChildren, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  SafeAreaView,
  Text,
} from 'react-native';

export interface BottomSheetProps {
  modalVisible?: boolean;
  title?: string;
  onClose?: () => void;
}

const BottomSheetContainer = ({
  modalVisible = false,
  title,
  children,
  onClose,
}: PropsWithChildren<BottomSheetProps>) => {
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (_, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  const closeModal = () => {
    closeBottomSheet.start(() => {
      onClose?.();
    });
  };

  useEffect(() => {
    if (modalVisible) {
      resetBottomSheet.start();
    }
  }, [modalVisible]);

  return (
    <Modal
      visible={modalVisible}
      animationType={'fade'}
      transparent
      statusBarTranslucent>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            transform: [{translateY}],
          }}
          {...panResponders.panHandlers}>
          <View style={styles.handlingBarContainer}>
            <View style={styles.handlingBar} />
          </View>
          <SafeAreaView style={styles.bodyContainer}>
            <View style={styles.titleContainer}>
              <Text style={TYPOGRAPHY.headline03}>{title}</Text>
            </View>
            <View style={styles.contentContainer}>{children}</View>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  handlingBarContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: pixelSizeVertical(-16),
    height: pixelSizeVertical(16),
    paddingHorizontal: pixelSizeHorizontal(10),
  },
  handlingBar: {
    width: widthPixel(60),
    height: heightPixel(4),
    backgroundColor: COLORS.gray300,
    borderRadius: 8,
  },
  bodyContainer: {
    width: '100%',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: pixelSizeVertical(17),
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: pixelSizeVertical(16),
    paddingBottom: pixelSizeVertical(50),
  },
});

export default BottomSheetContainer;
