import { fetchUserMetrics } from "@/api/user_metrics"; 
import { useQuery } from "@tanstack/react-query";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function ProfileHome() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["user-metrics"],
    queryFn: () => fetchUserMetrics("1"),
    refetchOnMount: "always",
  });
  console.log(data);

  if (isLoading) return <View style={styles.container}><ActivityIndicator size={"large"} /></View>;

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.text}>
            Physical attributes
          </Text>
        </View>
        <View>
          <Text style={styles.subHeader}>
            Height
          </Text>
          <View style={styles.attributeContainer}>
            <Text style={styles.text}>
              {data && data[1].value}
            </Text>
            <Text style={styles.subHeader}>
              {data && data[1].unit_symbol}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.subHeader}>
            Weight
          </Text>
          <View style={styles.attributeContainer}>
            <Text style={styles.text}>
              {data && data[0].value}
            </Text>
            <Text style={styles.subHeader}>
              {data && data[0].unit_symbol}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 16,
    paddingTop: 0,
    color: '#fff',
  },
  contentContainer: {
    gap: 12,
  },
  text: {
    color: '#fff',
  },
  subHeader: {
    color: '#e3ccccff',
  },
  attributeContainer: {
    flexDirection: "row",
    gap: 4,
  },
});