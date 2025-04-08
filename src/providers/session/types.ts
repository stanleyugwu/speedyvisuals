export interface UserSession {
  access_token: string;
  refresh_token: string;
  issued_at: number;
  expires_at: number;
  user: User;
}

export type UserSessionContextData = {
  session?: UserSession | null;
  actions: UserSessionActions;
};

export interface UserSessionActions {
  updateSession: (session: Partial<UserSession>) => void;
}

export interface User {
  first_name: string;
  last_name: string;
}
