export type AppResponse<T = null> = {
  success: boolean;
  data: T | null;
  message?: string;
  statusCode?: number;
};

export type AppResponseFail = {
  success: false,
  data: null,
  message?: string;
  statusCode?: number;
}

export type AppResponseError = {
  response?: {
    data: AppResponseFail;
  };
}
