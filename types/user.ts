type User = {
  createdAt: string;
  email: string;
  name: string;
  updatedAt: string;
  _id: string;
};

type MeResponse = {
  success: boolean;
  user: User;
};
