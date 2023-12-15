import {AppUserInterface} from '~/shared/utils/types/user';

export interface AuthenticateUserProps {
  token: string | null;
  user: AppUserInterface | null;
  limitUpload: number;
  totalBytesUsed: number | null;
  roundedAvatar: boolean;
  uploading: boolean;
  error: boolean;
  loading: boolean;
  errorMessage: string;
}
