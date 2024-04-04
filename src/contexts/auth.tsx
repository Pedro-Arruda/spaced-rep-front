import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export const LOCAL_STORAGE_AUTH_KEY = "auth";

export interface IAuth {
  accessToken: string;
  refreshToken: string;
  user: {
    user_id: number;
    email: string;
    username: string;
  };
}

export interface AuthContextData {
  auth: IAuth | null;
  updateAuth: (auth: IAuth | null) => void;
}

export const AuthContext = createContext<AuthContextData>({
  auth: null,
  updateAuth: () => {},
});

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [auth, setAuth] = useState<IAuth | null>(null);

  const updateAuth = async (auth: IAuth | null) => {
    if (!auth) {
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    } else {
      try {
        localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(auth));
      } catch (error) {
        localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
      }
    }

    setAuth(auth);
  };

  const fetchAuthData = async () => {
    try {
      const authStr = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

      if (!authStr) {
        updateAuth(null);
        return;
      }

      try {
        const value: IAuth = JSON.parse(authStr);

        if (value) {
          updateAuth(value);
        } else {
          updateAuth(null);
        }
      } catch (err) {
        console.error(err);
        updateAuth(null);
      }
    } catch (err) {
      console.error(err);
      updateAuth(null);
    }
  };

  useEffect(() => {
    fetchAuthData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        updateAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
