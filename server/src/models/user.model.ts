// TODO: Change to password hash in future when not simply testing the system
// TODO: This should probably only have user credentials info, and stuff like

import { MetaData } from "./meta_data.model";

// user measurements should be in a separate table
export interface User extends MetaData {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: Gender;
}

type Gender = "male" | "female" | "other" | "unknown";
