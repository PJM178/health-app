import { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";

const Users = () => {
  const [data, setData] = useState<[{ id: string, name: string }] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:8000/api/users");

      if (res.ok) {
        const users = await res.json();

        setData(users);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View>
      {isLoading ?
        <Text>Loading...</Text> :
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            console.log(index);

            return (
              <Text key={index} >
                {item.id}{item.name}
              </Text>
            );
          }}
        />}
    </View >
  );
}

export default Users;