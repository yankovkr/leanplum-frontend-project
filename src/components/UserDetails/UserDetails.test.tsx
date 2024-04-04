import { render, screen, waitFor, within } from '@testing-library/react';
import { UserEntity } from '../../models/UserEntity';
import UserDetails from './UserDetails';

describe('UserDetails Component', () => {
  const user = {
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
  } as UserEntity;

  beforeEach(() => {
    render(<UserDetails user={user} />);
  });

  it('renders loading state spinner', () => {
    const spinnerContainerElement = screen.getByTestId('spinner-container');
    expect(spinnerContainerElement).toBeInTheDocument();
  });

  it('renders UserDetails correctly', async () => {
    await waitFor(
      () => {
        // Header elements
        const titleElement = screen.getByRole('heading', { level: 2 });
        const subtitleElement = screen.getByTestId('subtitle');

        // Tiles elements
        const tileContainerElement = screen.getByTestId('tile-container');
        const devicesTile = within(tileContainerElement).getByText(/Devices/i);
        const devicesValue = within(tileContainerElement).getByText(/1/i);
        const sessionsTile =
          within(tileContainerElement).getByText(/Sessions/i);
        const sessionsValue = within(tileContainerElement).getByText(/2/i);
        const eventsTile = within(tileContainerElement).getByText(/Events/i);
        const eventsValue = within(tileContainerElement).getByText(/0/i);

        // Table elements
        const table = screen.getByRole('table');
        const tbody = within(table).getAllByRole('rowgroup')[1];
        const rows = within(tbody).getAllByRole('row');
        const columns = within(rows[0]).getAllByRole('cell');

        // Header assertions
        expect(titleElement).toBeInTheDocument();
        expect(subtitleElement).toHaveTextContent(
          /April 3, 2024, 3:49 PM - Sofia/i
        );

        // Tiles assertions
        expect(tileContainerElement).toBeInTheDocument();
        expect(devicesTile).toBeInTheDocument();
        expect(devicesValue).toBeInTheDocument();
        expect(sessionsTile).toBeInTheDocument();
        expect(sessionsValue).toBeInTheDocument();
        expect(eventsTile).toBeInTheDocument();
        expect(eventsValue).toBeInTheDocument();

        // Table assertions
        expect(columns).toHaveLength(2);
        expect(columns[0]).toHaveTextContent(/email/i);
        expect(columns[1]).toHaveTextContent(user.attributes.email);
      },
      {
        timeout: 1200,
      }
    );
  });
});
