export interface AuthResponse {
  success: boolean;
  data?: {
    user: any;
    session: any;
  };
  error?: {
    message: string;
    details?: string;
  };
  timestamp: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  nome: string;
  empresa: string;
}
