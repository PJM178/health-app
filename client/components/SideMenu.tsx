import { useEffect, useState } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const SCREEN_WIDTH = Dimensions.get("window").width;
const MENU_WIDTH = SCREEN_WIDTH * 0.75;
// This controls how close to the left edge your gesture needs to be for it to trigger opening the menu
const GESTURE_FAIL_DISTANCE = SCREEN_WIDTH * 0.05;

interface SideMenuProps {
  side: "left" | "right";
  isOpen: boolean;
}

// TODO: perhaps control the rgba value of the backdrop 
export default function SideMenu(props: SideMenuProps) {
  const onLeft = useSharedValue(false);
  const translateX = useSharedValue(-MENU_WIDTH);
  const fullyOpen = useSharedValue(false);
  const [innerOpen, setInnerOpen] = useState(props.isOpen);

  const panGesture = Gesture.Pan()
    .hitSlop({ left: 0, width: GESTURE_FAIL_DISTANCE })
    .onTouchesDown((e) => {
      console.log("touch start", e);
      // const startX = e.allTouches[0].x;
      // if (startX > GESTURE_FAIL_DISTANCE) {
      //   return;
      // }
    })
    .onUpdate((e) => {
      console.log("update", e);
      // const { translationX, velocityX } = e;
      // const startX = e.absoluteX;
      // console.log(startX)
      // if (startX > GESTURE_FAIL_DISTANCE && !onLeft.value) {
      //   return;
      // } else {
      //   onLeft.value = true;
      // }

      // if (!fullyOpen.value) {
      //   translateX.value = Math.min(0, Math.max(-MENU_WIDTH, translationX - MENU_WIDTH));
      // } else {
      //   translateX.value = Math.max(-MENU_WIDTH, Math.min(0, translationX));
      // }
    })
    .onEnd((e) => {
      console.log("end", e);
      // const { translationX, velocityX } = e;
      // console.log("end", e);
      // const shouldOpen = translationX > MENU_WIDTH * (1 / 3) || velocityX > 500;
      // console.log("onleft", onLeft.value);
      // console.log("shouldopen", shouldOpen);
      // if (shouldOpen && onLeft.value) {
      //   translateX.value = withTiming(0, { duration: 200 });
      //   fullyOpen.value = true;
      //   setInnerOpen(true);
      //   // scheduleOnRN(open)();
      // } else {
      //   console.log("closes");
      //   translateX.value = withTiming(-MENU_WIDTH, { duration: 200 });
      //   onLeft.value = false;
      //   fullyOpen.value = false;
      //   setInnerOpen(false);
      //   // scheduleOnRN(close)();
      // }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleBackdropClick = () => {
    setInnerOpen(false);
    onLeft.value = false;
    fullyOpen.value = false;
    translateX.value = withTiming(-MENU_WIDTH, { duration: 200 });
  }

  return (
    <GestureDetector 
    gesture={panGesture}
    
    >
      <View
        style={StyleSheet.absoluteFill}
        pointerEvents={"auto"}
      >
        {innerOpen &&
          <Animated.View
            onTouchStart={handleBackdropClick}
            style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,0.4)" }]}
          />}
        <Animated.View style={[styles.box, animatedStyle]} />
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  box: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: MENU_WIDTH,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});