import { MetaData } from "./meta_data.model";

export interface Unit extends MetaData {
  id: number;
  name: string;
  symbol: string;
  category: string;
  conversion_factor: number;
}