import { MetaData } from "./meta_data.model";
import { Metric } from "./metric.model";

export interface UserMetric extends MetaData {
  id: number;
  userId: number;
  metricId: number;
  value: number;
  metric?: Metric;
}