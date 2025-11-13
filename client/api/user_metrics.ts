import Constants from 'expo-constants'

const API_URL = Constants.expoConfig?.extra?.apiUrl;

interface UserMetrics {
  unit_category: string;
  unit_name: string;
  unit_symbol: string;
  value: string;
}

export async function fetchUserMetrics(userId: string) {
  const response = await fetch(`${API_URL || "http://localhost:8000"}/api/users/${userId}/metrics`);

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const data = await response.json();
  // return data;
  // Simulate delay here
  return new Promise<UserMetrics[]>((res) => {
    setTimeout(() => {
      return res(data);
    }, 2000);
  });
}
