import { render, screen, waitFor, within } from '@testing-library/react';
import UsersPage from './UsersPage';

describe('UsersPage Component', () => {
  beforeEach(() => {
    render(<UsersPage />);
  });

  it('renders loading state spinner', () => {
    const spinnerContainerElement = screen.getByTestId('spinner-container');
    expect(spinnerContainerElement).toBeInTheDocument();
  });

  it('renders UsersPage correctly', async () => {
    await waitFor(
      () => {
        const masterDetailContainerElement = screen.getByTestId(
          'master-detail-container'
        );
        const usersListContainerElement = within(
          masterDetailContainerElement
        ).getByTestId('users-list');
        const usersDetailsContainerElement = within(
          masterDetailContainerElement
        ).getByTestId('user-details');
        expect(masterDetailContainerElement).toBeInTheDocument();
        expect(usersListContainerElement).toBeInTheDocument();
        expect(usersDetailsContainerElement).toBeInTheDocument();
      },
      {
        timeout: 2200,
      }
    );
  });
});
