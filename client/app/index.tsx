import { Text, View } from "react-native";
import Users from "@/components/Users";
import DiaryEntryForm from "@/components/DiaryEntryForm";

export default function Index() {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Edit app/index.tsx to edit this screen.</Text>
        <Users />

      </View>
      <DiaryEntryForm />
    </>
  );
}
