import { useCallback, useEffect, useState } from "react";
import { Dimensions, View, StyleSheet, Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { PrimaryButton } from "./Buttons";
import SideMenuContent from "./SideMenuContent";

const SCREEN_WIDTH = Dimensions.get("window").width;
// This probably should be the actual content width which likely requires a hook to calculate the width 
const MENU_WIDTH = SCREEN_WIDTH * 0.75;
// This controls how close to the left edge your gesture needs to be for it to trigger opening the menu
const GESTURE_FAIL_DISTANCE = 5;
// px/s minimum velocity to start closing
const SWIPE_THRESHOLD_VELOCITY = 400;
// Minimum distance to travel to start closing
const SWIPE_THRESHOLD_TRANSLATEX = 25;

interface SideMenuProps {
  side: "left" | "right";
  isOpen: boolean;
  children: React.ReactNode;
  setIsOpen: (open: boolean) => void;
}

// TODO: calculate side menu content and concequently the width of the menu using View onLayout prop
export default function SideMenu(props: SideMenuProps) {
  const translateX = useSharedValue(-MENU_WIDTH);
  const fullyOpen = useSharedValue(false);
  const shouldStartClosing = useSharedValue(false);
  const innerOpen = useSharedValue(false);
  const [openingStarted, setOpeningStarted] = useState(false);

  const handleResetOpeningState = useCallback(() => {
    setOpeningStarted(false);
    props.setIsOpen(false);
  }, [props]);

  // Generally important thing is that useSharedValues run on UI thread and changes are recognized by
  // gesture handler in its flow
  const panGesture = Gesture.Pan()
    .hitSlop({ left: 0, width: innerOpen ? MENU_WIDTH : GESTURE_FAIL_DISTANCE })
    .onStart((e) => {
      scheduleOnRN(setOpeningStarted, true);
    })
    .onUpdate((e) => {
      const { translationX, velocityX } = e;

      // This is to not count minute finger movements for closing gesture since it's possible that
      // users on touch move their fingers slightly while pressing something, for example
      if (fullyOpen.value && !shouldStartClosing.value) {
        if (Math.abs(velocityX) > SWIPE_THRESHOLD_VELOCITY || Math.abs(translationX) > SWIPE_THRESHOLD_TRANSLATEX) {
          shouldStartClosing.value = true;
        }

        return;
      }

      if (!fullyOpen.value) {
        translateX.value = Math.min(0, Math.max(-MENU_WIDTH, translationX - MENU_WIDTH));
      } else {
        translateX.value = Math.max(-MENU_WIDTH, Math.min(0, translationX));
      }
    })
    .onEnd((e) => {
      const { translationX, velocityX } = e;
      const shouldOpen = translationX > MENU_WIDTH * (1 / 3) || velocityX > 500;
      const shouldClose = (translationX < MENU_WIDTH * (1 / 3) * -1 || velocityX < -500) && fullyOpen.value && shouldStartClosing.value;

      if (!fullyOpen.value && shouldOpen) {
        translateX.value = withTiming(0, { duration: 200 }, () => [fullyOpen.value = true, innerOpen.value = true, shouldStartClosing.value = false, scheduleOnRN(props.setIsOpen, true)]);
      } else if (!fullyOpen.value) {
        fullyOpen.value = false;
        innerOpen.value = false;
        translateX.value = withTiming(-MENU_WIDTH, { duration: 200 }, () => scheduleOnRN(handleResetOpeningState));
      }

      if (fullyOpen.value && shouldClose) {
        fullyOpen.value = false;
        innerOpen.value = false;
        translateX.value = withTiming(-MENU_WIDTH, { duration: 200 }, () => scheduleOnRN(handleResetOpeningState));
      } else if (fullyOpen.value) {
        translateX.value = withTiming(0, { duration: 200 }, () => [fullyOpen.value = true, innerOpen.value = true, shouldStartClosing.value = false]);
      }
    });

  const menuAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => {
    const progress = interpolate(
      translateX.value,
      [-MENU_WIDTH, 0],
      [0, 1],
      Extrapolation.CLAMP
    );

    const alpha = progress * 0.4;

    return {
      backgroundColor: `rgba(0,0,0,${alpha})`,
    };
  });

  const handleBackdropClick = useCallback(() => {
    fullyOpen.value = false;
    innerOpen.value = false;
    translateX.value = withTiming(-MENU_WIDTH, { duration: 200 }, () => scheduleOnRN(handleResetOpeningState));
  }, [fullyOpen, handleResetOpeningState, innerOpen, translateX]);

  const handleOpenMenu = useCallback(() => {
    setOpeningStarted(true);
    translateX.value = withTiming(0, { duration: 200 }, () => [fullyOpen.value = true, innerOpen.value = true, shouldStartClosing.value = false]);
  }, [fullyOpen, innerOpen, shouldStartClosing, translateX]);

  useEffect(() => {
    if (props.isOpen) {
      handleOpenMenu();
    } else {
      handleBackdropClick();
    }
  }, [handleBackdropClick, handleOpenMenu, props.isOpen])

  return (
    // openingStarted state is updated when pan handling gesture starts so that the detection zone
    // covers the whole side menu now, otherwise only the defined slice
    <Animated.View style={!openingStarted ? styles.edgeZone : StyleSheet.absoluteFill}>
      <GestureDetector gesture={panGesture}>
        <View style={StyleSheet.absoluteFill} pointerEvents="auto">
          {/* Backdrop */}
          <Pressable
            onPress={handleBackdropClick}
            style={StyleSheet.absoluteFill}
          >
            <Animated.View style={[StyleSheet.absoluteFill, backdropAnimatedStyle]} />
          </Pressable>
          {/* Menu */}
          {openingStarted &&
            <Animated.View style={[styles.menu, menuAnimatedStyle]}>
              {props.children}
              <PrimaryButton onPress={() => console.log("TAP")}>
                <Text>This is primary button</Text>
              </PrimaryButton>
            </Animated.View>}
        </View>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  edgeZone: {
    ...StyleSheet.absoluteFillObject,
    width: GESTURE_FAIL_DISTANCE, // small swipe trigger zone
    backgroundColor: 'transparent',
  },
  menu: {
    ...StyleSheet.absoluteFillObject,
    width: MENU_WIDTH,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});