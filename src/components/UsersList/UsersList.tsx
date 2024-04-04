import { UserEntity } from '../../models/UserEntity';
import { UsersListProps } from '../../models/UsersListProps.interface';
import './UsersList.scss';

/**
 *
 * UsersList Component - Pure component representing the users list
 * 
 * @param {Array<UserEntity>} users - Array of users
 * @param {UserEntity} selectedUser - Current selected user
 * @param {Function} onUserSelection - Handler function for user selection
 * @return {React.ReactNode}
 * @remarks
 *  Example of usage
 * ```
 *   <UsersList
        users={[{} as UserEntity]}
        selectedUser={users[0]}
        onUserSelection={onUserSelection}
      />
 * ```
 */
export default function UsersList(props: UsersListProps) {
  return (
    <>
      <div className='list-header'>
        <h2 className='title'>Users in Audience</h2>
        <h3
          className='subtitle'
          data-testid='subtitle'
        >
          Total Users - Showing {props.users.length} matching users
        </h3>
      </div>
      <ul data-testid='users-list'>
        {props.users.map((user: UserEntity) => (
          <li
            aria-details={user.id}
            key={user.id}
            onClick={() => props.onUserSelection(user)}
          >
            <div
              className={`user ${
                props.selectedUser?.id === user.id ? 'selected-user' : ''
              }`}
            >
              <div
                className='user-id'
                aria-label={user.id}
              >
                {user.id}
              </div>
              <div
                className='subtitle'
                aria-label={`${user.devices} Devices - ${user.sessions.length} Sessions -{' '}
                ${user.location}`}
              >
                {user.devices} Devices - {user.sessions.length} Sessions -{' '}
                {user.location}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
