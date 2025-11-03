import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header(props: HeaderProps) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsSideMenuOpen(true);
    console.log("click");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView  style={{ height: 16 }}>
        <View style={styleSheet.container}>
          <View style={styleSheet.menu}>
            <Pressable onPress={handleOpenMenu}>
              <MaterialIcons name="menu" size={36} color="black" />
            </Pressable>
          </View>
          <View style={styleSheet.logo}>
            <Text>
              HAPPI
            </Text>
          </View>
          <View style={styleSheet.extra}>
            {/* <Text>
          Logo
        </Text> */}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styleSheet = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
  },
  menu: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: 36,
  },
  logo: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  extra: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});