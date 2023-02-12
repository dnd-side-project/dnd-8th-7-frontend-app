import {COLORS, FONTS} from '@/styles/theme';
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

interface Props {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  title?: string;
}

const BottomSheet = ({
  modalVisible,
  setModalVisible,
  title,
  children,
}: PropsWithChildren<Props>) => {
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
      setModalVisible(false);
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
          <SafeAreaView>
            <View style={styles.titleContainer}>
              <Text style={FONTS.headline03}>{title}</Text>
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
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  handlingBarContainer: {
    position: 'absolute',
    top: -24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  handlingBar: {
    width: 70,
    height: 4,
    backgroundColor: COLORS.gray[3],
    borderRadius: 8,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 17,
    textAlign: 'center',
  },
  contentContainer: {
    width: '100%',
    paddingTop: 16,
    paddingBottom: 50,
  },
});

export default BottomSheet;
