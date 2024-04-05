import { useTranslation } from 'react-i18next';
import { UserEntity } from 'models/UserEntity';
import { UsersListProps } from 'models/UsersListProps.interface';
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
  const { t } = useTranslation();
  return (
    <>
      <div className='list-header'>
        <h2 className='title'>{t('USERS_IN_AUDIENCE')}</h2>
        <h3
          className='subtitle'
          data-testid='subtitle'
        >
          {t('TOTAL_USERS')} -{' '}
          {t('SHOWING_MATCHING_USERS', { usersLength: props.users.length })}
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
                {user.devices} {t('DEVICES')} - {user.sessions.length}{' '}
                {t('SESSIONS')} - {user.location}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
