import { MetaData } from "./meta_data.model";

export interface Metric extends MetaData {
  id: number;
  name: string;
  unit: string;
  description?: string;
}