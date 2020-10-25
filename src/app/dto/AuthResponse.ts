import { AuthResponseData } from './AuthResponseData';

export interface AuthResponse {
  data: AuthResponseData;
  http_status: number;
  success: boolean;
}

