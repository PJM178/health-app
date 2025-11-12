export interface MetaData {
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  created_by?: string;
  updated_by?: string;
}