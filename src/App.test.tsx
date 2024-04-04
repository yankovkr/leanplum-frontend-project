import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('waits for master details container to be rendered inside App', async () => {
    const app = screen.getByTestId('app');
    const spinnerContainerElement = screen.getByTestId('spinner-container');
    const masterDetailContainerElement = await screen.findByTestId(
      'master-detail-container'
    );

    expect(app).toBeInTheDocument();
    expect(app).toContainElement(spinnerContainerElement);
    await waitFor(
      () => {
        expect(app).toContainElement(masterDetailContainerElement);
      },
      {
        timeout: 1500,
      }
    );
  });
});
