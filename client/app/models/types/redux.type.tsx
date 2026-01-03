import { SchoolPreview } from "../school.model";
import { UserBasicInfo } from "../user.model";

export interface AppState {
  school: SchoolPreview | null;
  user: UserBasicInfo | null;
  permission: Record<string, boolean> | null;
  resetPasswordEmail: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}