// @types.user.ts
export interface IUser {
    id: number;
    email: any;
    name: string;
    phone: string;
  }
  export type UserContextType = {
    user: IUser[];
    saveUser: (user: IUser) => void;
    // updateUser: (id: IUser) => void;
  };