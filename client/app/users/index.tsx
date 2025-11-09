import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "../../api/users"

export default function UsersHome() {
  // useRefreshOnFocus();
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
    refetchOnMount: "always",
  });

  console.log(data, isLoading, error);

  if (isLoading) return <ActivityIndicator size="large" />;
  console.log(data);
  return (
    <View>
      <Text>
        what
      </Text>
      <FlatList
        data={data}
        keyExtractor={(user) => user.id.toString()}
        renderItem={({ item }) =>
          <View>
            <Text>First name: {item.first_name}</Text>
            <Text>Last name: {item.last_name}</Text>
            <Text>Username name: {item.username}</Text>
            <Text>Email name: {item.email}</Text>
          </View>
        }
      />
    </View>
  );
}