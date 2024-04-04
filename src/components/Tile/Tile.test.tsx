import { render, screen } from '@testing-library/react';
import Tile from './Tile';

describe('Tile Component', () => {
  const title = 'Tile Title';
  const value = 0;

  it('renders Tile correctly', () => {
    render(
      <Tile
        title={title}
        value={value}
      />
    );
    const tileTitleElement = screen.getByText(/Tile Title/i);
    const tileValueElement = screen.getByText(/0/i);

    expect(tileTitleElement).toBeInTheDocument();
    expect(tileValueElement).toBeInTheDocument();
  });
});
