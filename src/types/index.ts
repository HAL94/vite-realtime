export type AppResponse<T = null> = {
  success: boolean;
  data: T | null;
  message?: string;
  statusCode?: number;
};

export type AppResponseError<T = null> = {
  response?: {
    data: AppResponse<T>;
  };
}