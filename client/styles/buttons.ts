import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  primary: {
    backgroundColor: "#1E88E5",
  },
  primaryPressed: {
    backgroundColor: "#1565C0",
  },
});