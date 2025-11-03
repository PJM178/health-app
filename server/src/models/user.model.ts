// TODO: Change to password hash in future when not simply testing the system
// TODO: This should probably only have user credentials info, and stuff like
// user measurements should be in a separate table
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;

  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: Gender;

  heightCm?: number;
  weightKg?: number;
  activityLevel?: ActivityLevel;

  totalCalorieGoal?: number;
  dailyCalorieGoal?: number;
}

type Gender = "male" | "female" | "other" | "unknown";
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';