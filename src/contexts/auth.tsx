import { checkAuth, type GetUserSuccess } from "@/lib/check-auth";
import { AppResponse, AppResponseFail } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

export interface AuthContext {
  verifyAuth: () => Promise<AppResponse<GetUserSuccess> | AppResponseFail>;
  userData: GetUserSuccess | undefined;
  setUserData:
    | React.Dispatch<React.SetStateAction<GetUserSuccess | undefined>>
    | (() => void);
  isAuth: boolean;
}

const AuthContextMaker = createContext<undefined | AuthContext>(undefined);

export function useAuth() {
  const context = useContext(AuthContextMaker);
  if (typeof context === "undefined") {
    throw new Error(
      "An error occured: must use `useAuth` within an `AuthContextMaker`"
    );
  }
  return context;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [userData, setUserData] = useState<GetUserSuccess | undefined>(
    undefined
  );

  const getUser = useCallback(async () => {
    const userData = await checkAuth();
    if (userData.success && userData.data) {
      setUserData(userData.data);
    }
    return userData;
  }, []);

  const { isLoading, data } = useQuery({
    queryKey: ["GetUser"],
    queryFn: checkAuth,
  });

  if (data?.success && data.data && typeof userData === 'undefined') {
    setUserData(data.data);
  }

  return (
    <AuthContextMaker.Provider
      value={{
        verifyAuth: getUser,
        userData,
        setUserData,
        isAuth: Boolean(userData),
      }}
    >
      {isLoading ? null : children}
    </AuthContextMaker.Provider>
  );
}
