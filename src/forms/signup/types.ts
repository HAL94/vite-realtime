export type SignupSuccess = {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
};
