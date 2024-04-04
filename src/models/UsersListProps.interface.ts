import { UserEntity } from './UserEntity';

export interface UsersListProps {
  users: Array<UserEntity>;
  selectedUser?: UserEntity;
  onUserSelection: Function;
}
