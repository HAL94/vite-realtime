export type AppResponse<T> = {
  success: boolean;
  data: T | null;
  message: string;
  statusCode?: number;
};

export type AppResponseError<T> = {
  response?: {
    data: AppResponse<T>;
  };
}