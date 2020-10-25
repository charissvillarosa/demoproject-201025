import { Avatar } from './Avatar';

export interface User {
  id: number;
  full_name: string;
  email: string;
  phone_number?: any;
  created_at: Date;
  updated_at: Date;
  email_verified: boolean;
  phone_number_verified: boolean;
  verified: boolean;
  avatar_permanent_url: string;
  avatar_permanent_thumb_url: string;
  mine: boolean;
  avatar?: Avatar;
}

