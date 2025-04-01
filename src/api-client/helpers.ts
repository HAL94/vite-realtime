export type Post = '/auth/login' | '/auth/signup';
export type Get = '/auth/me';
export type ApiCall = Post | Get;

export const POST = (endpoint: Post) => endpoint
export const GET = (endpoint: Get) => endpoint;