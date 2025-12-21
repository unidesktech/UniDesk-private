import { SchoolPreview } from "../school.model";

export interface AppState {
  school: SchoolPreview | null;
  resetPasswordEmail: string | null;
  isAuthenticated: boolean;
}