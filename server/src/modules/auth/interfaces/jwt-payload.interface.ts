export interface IJwtPayload {
  user: {
    name: string;
    email: string;
    nickname: string;
  };
  sub: string;
}
