import { render, screen, act, within, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { UserEntity } from 'models/UserEntity';
import UsersList from './UsersList';

describe('UsersList Component', () => {
  const users = [
    {
      id: 'usr_0',
      isDeveloper: true,
      devices: 1,
      sessions: [{}, {}],
      location: 'Sofia',
      created: 1712148567291,
      events: 0,
      bucket: 0,
      channels: {
        push: false,
        email: true,
        webhook: true,
        appInbox: true,
      },
      attributes: {
        email: 'usr_0@example.com',
      },
    } as UserEntity,
    {
      id: 'usr_1',
      isDeveloper: false,
      devices: 2,
      sessions: [{}, {}, {}, {}, {}],
      location: 'San Francisco',
      created: 1680618697363,
      events: 3,
      bucket: 1,
      channels: {
        push: false,
        email: true,
        webhook: true,
        appInbox: true,
      },
      attributes: {
        email: 'usr_1@example.com',
      },
    } as UserEntity,
  ];

  const onUserSelection = jest.fn();

  beforeEach(() => {
    render(
      <UsersList
        users={users}
        selectedUser={users[0]}
        onUserSelection={onUserSelection}
      />
    );
  });

  it('renders UsersList correctly', () => {
    // Header elements
    const titleElement = screen.getByRole('heading', { level: 2 });
    const subtitleElement = screen.getByTestId('subtitle');
    // List elements
    const listElement = screen.getByRole('list');
    const listItems = within(listElement).getAllByRole('listitem');
    // Header assertions
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(/Users in Audience/i);
    expect(subtitleElement).toBeInTheDocument();
    expect(subtitleElement).toHaveTextContent(
      /Total Users - Showing 2 matching users/i
    );

    // List assertions
    expect(listElement).toBeInTheDocument();
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent(/usr_0/i);
    expect(listItems[0]).toHaveTextContent(/1 Devices - 2 Sessions - Sofia/i);
  });

  it('should invoke onUserSelection', () => {
    const listElement = screen.getByRole('list');
    const listItems = within(listElement).getAllByRole('listitem');
    // Asserting that the first element of the list is selected
    expect(listItems[0].firstChild).toHaveClass('selected-user');
    act(() => {
      // Selecting the second item of the list
      user.click(listItems[1]);
    });
    // Asserting that the onUserSelection handler is called with the user
    expect(onUserSelection).toHaveBeenCalledWith(users[1]);
    waitFor(() => {
      // Asserting that selected-user class is properly set
      expect(listItems[0].firstChild).toHaveClass('user');
      expect(listItems[1].firstChild).toHaveClass('selected-user');
    });
  });
});
