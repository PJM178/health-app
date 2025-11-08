import { Pressable } from "react-native";
import { buttonStyles } from "@/styles/buttons";

interface GeneralButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
}

export const PrimaryButton = (props: GeneralButtonProps) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [
        buttonStyles.base, buttonStyles.primary,
        { backgroundColor: pressed ? buttonStyles.primaryPressed.backgroundColor :  buttonStyles.primary.backgroundColor },
      ]}
    >
      {props.children}
    </Pressable>
  );
};

export const TransparentButton = (props: GeneralButtonProps) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [
        buttonStyles.base, buttonStyles.primary,
        { backgroundColor: pressed ? buttonStyles.primaryPressed.backgroundColor :  buttonStyles.primary.backgroundColor },
      ]}
    >
      {props.children}
    </Pressable>
  );
};
