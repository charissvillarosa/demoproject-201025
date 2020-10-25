import { User } from './User';

export interface AuthResponseData {
  access_token: string;
  token_type: string;
  expires_in: string;
  user: User;
}
