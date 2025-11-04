import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView style={styleSheet.container}>
      <View style={styleSheet.menuContainer}>
        <Pressable onPress={handleOpenMenu}>
          <MaterialIcons name="menu" size={36} color="white" />
        </Pressable>
      </View>
      <View style={styleSheet.logoContainer}>
        <Text style={styleSheet.logoText}>
          HAPPI
        </Text>
      </View>
      <View style={styleSheet.extraContainer}>
        {/* <Text>
          Logo
        </Text> */}
      </View>
    </SafeAreaView>
  );
};

const styleSheet = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    backgroundColor: "#25292e",
  },
  menuContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: 36,
  },
  logoContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  extraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "#fff",
    fontWeight: "bold",
  }
});