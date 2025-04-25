export type AppResponse<T> = {
  success: boolean;
  data: T;
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
