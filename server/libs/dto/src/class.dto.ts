export interface SaveClassDTO {
  class_id?: string;
  name: string;
  year_id: string;

  sections: string[];

  is_active: boolean;
  comments?: string;
}
