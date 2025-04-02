import API from "@/api-client";
import { GET } from "@/api-client/helpers";
import { AppResponse } from "@/types";

type GetUserSuccess = {
  id: number;
  name: string;
  email: string;
};
export async function checkAuth() {
  try {
    const response = await API.get<AppResponse<GetUserSuccess>>(GET("/auth/me"));
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
