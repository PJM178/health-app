import { Text, View, StyleSheet } from 'react-native';
 import { Link } from 'expo-router'; 
import { useEffect } from 'react';
import SideMenu from '@/components/SideMenu';

export default function Index() {
  useEffect(() => {
    console.log(Math.random());
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Link href="/users/profile" style={styles.button}>
        Go to About screen
      </Link>
      <Link href="./products" style={styles.button}>
        Go to Products screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
