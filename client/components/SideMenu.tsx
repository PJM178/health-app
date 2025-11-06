import { useEffect, useState } from "react";
import { Dimensions, View, StyleSheet, Text, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import PrimaryButton from "./PrimaryButton";
import SideMenuContent from "./SideMenuContent";

const SCREEN_WIDTH = Dimensions.get("window").width;
// This probably should be the actual content width which likely requires a hook to calculate the width 
const MENU_WIDTH = SCREEN_WIDTH * 0.75;
// This controls how close to the left edge your gesture needs to be for it to trigger opening the menu
const GESTURE_FAIL_DISTANCE = 5;
// px/s minimum velocity to start closing
const SWIPE_THRESHOLD_VELOCITY = 400;
const SWIPE_THRESHOLD_TRANSLATEX = 25;

interface SideMenuProps {
  side: "left" | "right";
  isOpen: boolean;
}

// TODO: calculate side menu content and concequently the width of the menu using View onLayout prop
export default function SideMenu(props: SideMenuProps) {
  const translateX = useSharedValue(-MENU_WIDTH);
  const fullyOpen = useSharedValue(false);
  const shouldStartClosing = useSharedValue(false);
  // const [innerOpen, setInnerOpen] = useState(props.isOpen);
  const innerOpen = useSharedValue(false);
  const [openingStarted, setOpeningStarted] = useState(false);
  console.log("opening started", openingStarted);
  const panGesture = Gesture.Pan()
    // Change to useSharedValue here since it runs on UI thread and no re-render is needed
    .hitSlop({ left: 0, width: innerOpen ? MENU_WIDTH : GESTURE_FAIL_DISTANCE })
    .onTouchesDown((e) => {
      console.log("touch start", e);
    })
    .onBegin((e) => {
      console.log("begin", e);
      scheduleOnRN(setOpeningStarted, true);
    })
    .onUpdate((e) => {
      // Add logic here for when menu is fully open so that swiping to interact with the menu
      // requires a certain distance before it registeres inputs
      console.log("update", e);
      const { translationX, velocityX } = e;
      console.log("translationX - movement", translationX);
      console.log("velocity", velocityX);
      if (fullyOpen.value && !shouldStartClosing.value) {
        if (Math.abs(velocityX) > SWIPE_THRESHOLD_VELOCITY && Math.abs(translationX) > SWIPE_THRESHOLD_TRANSLATEX) {
          shouldStartClosing.value = true;
        }
        console.log("here");
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
      console.log("end", e);
      const shouldOpen = translationX > MENU_WIDTH * (1 / 3) || velocityX > 500;
      console.log("shouldopen", shouldOpen);
      if (shouldOpen) {
        translateX.value = withTiming(0, { duration: 200 });
        fullyOpen.value = true;
        innerOpen.value = true;
        // scheduleOnRN(open)();
      } else {
        console.log("closes");
        translateX.value = withTiming(-MENU_WIDTH, { duration: 200 });
        fullyOpen.value = false;
        innerOpen.value = false;
        // setInnerOpen(false);
        shouldStartClosing.value = false;
        // scheduleOnRN(close)();
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

  const handleBackdropClick = () => {
    // setInnerOpen(false);
    fullyOpen.value = false;
    translateX.value = withTiming(-MENU_WIDTH, { duration: 200 });
  }
  console.log(openingStarted)
  return (
      // openingStarted state is updated when pan handling gesture starts so that the detection zone
      // covers the whole side menu now, otherwise only 
      <Animated.View style={!openingStarted ? styles.edgeZone : StyleSheet.absoluteFill}>
        {/* Edge gesture zone — only active when closed */}
        {!openingStarted && (
          <GestureDetector gesture={panGesture}>
            <View style={StyleSheet.absoluteFill} />
          </GestureDetector>
        )}

        {/* Full menu layer — visible when opening or open */}
        {openingStarted && (
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
              <Animated.View style={[styles.menu, menuAnimatedStyle]}>
                <SideMenuContent />
                <PrimaryButton onPress={() => console.log("TAP")}>
                  <Text>This is primary button</Text>
                </PrimaryButton>
              </Animated.View>
            </View>
          </GestureDetector>
        )}
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