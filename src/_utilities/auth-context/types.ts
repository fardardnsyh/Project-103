import { User } from "firebase/auth";
import { UserData } from "../../_types/userData";
import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  isLoading: boolean;
}

export type { AuthContextType, AuthProviderProps };
