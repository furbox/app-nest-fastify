export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  createdAt: string;
}
