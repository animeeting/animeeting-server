export interface IRequestUser {
  user: {
    id: string;
    user: {
      name: string;
      nickname: string;
      email: string;
    };
  };
}
