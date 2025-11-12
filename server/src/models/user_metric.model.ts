import { MetaData } from "./meta_data.model";
import { Unit } from "./unit.model";

export interface UserMetric extends MetaData {
  id: number;
  userId: number;
  metricId: number;
  value: number;
  metric?: Unit;
}