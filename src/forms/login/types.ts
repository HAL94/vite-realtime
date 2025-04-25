export type LoginSuccess = {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
};

