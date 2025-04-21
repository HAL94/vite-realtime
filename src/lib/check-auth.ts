import API from "@/api-client";
import { GET } from "@/api-client/helpers";
import { AppResponse, AppResponseFail } from "@/types";
// import { AppResponse } from "@/types";
// import { AxiosError } from "axios";

export type GetUserSuccess = {
  id: number;
  name: string;
  email: string;
};


export async function checkAuth(): Promise<
  AppResponse<GetUserSuccess> | AppResponseFail
> {
  try {
    const response = await API.get<AppResponse<GetUserSuccess>>(
      GET("/auth/me")
    );    
    return response.data;
  } catch (error) {
    console.error(error);
    return {
      data: null,
      success: false,
      statusCode: undefined,
      message: undefined,
    }
  }
}
