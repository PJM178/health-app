import Constants from 'expo-constants'

const API_URL = Constants.expoConfig?.extra?.apiUrl;

interface User {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

export async function fetchAllUsers() {
  const response = await fetch(`${API_URL || "http://localhost:8000"}/api/users`);

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const data = await response.json();
  // return data;
  // Simulate delay here
  return new Promise<User[]>((res) => {
    setTimeout(() => {
      return res(data);
    }, 2000);
  });
}