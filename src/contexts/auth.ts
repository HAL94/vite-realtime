import { type GetUserSuccess } from "@/lib/check-auth";
import { AppResponse } from "@/types";

export interface AuthContext {
  verifyAuth: () => Promise<AppResponse<GetUserSuccess> | AppResponse<null>>;
}

