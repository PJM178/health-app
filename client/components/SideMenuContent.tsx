import { Link } from "expo-router";
import { Text, View } from "react-native";
import { TransparentButton } from "./Buttons";

interface SideMenuContentProps {
  closeSideMenu: (open: boolean) => void;
}

const SideMenuContent = (props: SideMenuContentProps) => {
  return (
    <View>
      <View>
        <Text>
          Section
        </Text>
      </View>
      <View>
        <Text>
          Section
        </Text>
      </View>
      <View>
        <Link href="/users/profile" asChild>
          <TransparentButton
            onPress={() => props.closeSideMenu(false)}
          >
            <Text>
              Profile
            </Text>
          </TransparentButton>
        </Link>
      </View>
    </View>
  );
};

export default SideMenuContent;