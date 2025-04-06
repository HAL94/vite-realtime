/**
 * Type-safe urls
 */

type ApiEndpoints = {
  '/auth/login': { method: 'POST' };
  '/auth/signout': { method: 'POST' };
  '/auth/signup': { method: 'POST' };
  '/auth/me': { method: 'GET' };
  '/games': { method: 'GET' }
};

type PostEndpoints = keyof {
  [K in keyof ApiEndpoints as ApiEndpoints[K]['method'] extends 'POST' ? K : never]: K;
}


type GetEndpoints = keyof {
  [K in keyof ApiEndpoints as ApiEndpoints[K]['method'] extends 'GET' ? K : never]: K;
}

export const POST = (endpoint: PostEndpoints) => endpoint as string;
export const GET = (endpoint: GetEndpoints) => endpoint as string;
export const GET_USER = (id:string) => `/users/${id}` as GetEndpoints;
