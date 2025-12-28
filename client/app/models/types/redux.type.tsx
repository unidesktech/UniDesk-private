import { SchoolPreview } from "../school.model";
import { UserBasicInfo } from "../user.model";

export interface AppState {
  school: SchoolPreview | null;
  user: UserBasicInfo | null;
  resetPasswordEmail: string | null;
  isAuthenticated: boolean;
}