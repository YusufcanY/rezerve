export type User = {
  id: string;
  name: string;
  avatar: string;
  avatarLarge: string;
  email?: string;
  createdAt: number;
  isRegistered: boolean;
  room?: {
    id: string;
    role: 'player' | 'spectator';
  };
};
