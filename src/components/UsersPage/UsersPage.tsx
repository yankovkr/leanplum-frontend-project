import { useState, useEffect } from 'react';
import UserDetails from '../UserDetails/UserDetails';
import UsersList from '../UsersList/UsersList';
import { UserEntity, generateSampleData } from '../../models/UserEntity';
import './UsersPage.scss';

/**
 *
 * UsersPage Component - Stateful component representing the users page
 * Responsible for fetching Users from the mock API and user selection and loading
 *
 * @return {React.ReactNode}
 * @remarks
 *  Example of usage
 * ```
 *   <UsersPage />
 * ```
 */
export default function UsersPage() {
  const [users, setUsers] = useState<Array<UserEntity>>([]);
  const [selectedUser, setSelectedUser] = useState<UserEntity>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUsers(generateSampleData());
    // Simulate delay of an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Pre-selecting the first user
    setSelectedUser(users[0]);
  }, [users]);

  /**
   * handleUserSelection
   *
   * @param {UserEntity} user - selected user
   * @returns {void}
   */
  function handleUserSelection(user: UserEntity) {
    setSelectedUser(user);
  }

  // Loading page state template
  if (isLoading) {
    /* The spinner can be extracted as a separete component */
    return (
      <div
        className='spinner-container'
        data-testid='spinner-container'
      >
        <div
          aria-busy='true'
          className='spinner'
        ></div>
      </div>
    );
  }

  return (
    <div
      className='master-detail-container'
      data-testid='master-detail-container'
    >
      <div className='users-list'>
        <UsersList
          users={users}
          selectedUser={selectedUser}
          onUserSelection={handleUserSelection}
        ></UsersList>
      </div>
      <div className='user-details'>
        {selectedUser && (
          <UserDetails
            key={selectedUser.id}
            user={selectedUser}
          />
        )}
      </div>
    </div>
  );
}
