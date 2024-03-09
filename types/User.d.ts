declare module UserType {
  export type User = {
    name: string;
    password: string;
    email: string;
    sex: "male" | "female";
    birthday: string; // "YYYY-MM-DD"
  };

  export type UserCache = {
    email: string;
    code: string;
  };
}
