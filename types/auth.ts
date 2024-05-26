type RegisterBody = {
  name: string;
  email: string;
  password: string;
};
type LoginBody = {
  email: string;
  password: string;
};

type RegisterResponse = {
  success: boolean;
  user: User;
  token: string;
};
