import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactElement,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { UserData } from "../../_types/userData";
import { doc, getDoc } from "firebase/firestore";
import { AuthContextType, AuthProviderProps } from "./types";
import { auth, firestore } from "../../firebaseConfig";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const userDocRef = doc(firestore, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        } else {
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
