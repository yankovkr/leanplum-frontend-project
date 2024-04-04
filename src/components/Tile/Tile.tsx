import { TileProps } from '../../models/TileProps.interface';
import './Tile.scss';

/**
 *
 * Tile Component - Pure component representing a tile
 * @param {string} title - Tile title
 * @param {number} value - Tile value
 * @return {React.ReactNode}
 * @remarks
 *  Example of usage
 * ```
 *  <Tile
        title='Some Tile Title'
        value='50'
      />
 * ```
 */
export default function Tile(props: TileProps) {
  return (
    <div
      className='tile'
      role='listitem'
    >
      <div
        aria-label={props.title}
        className='subtitle'
      >
        {props.title}
      </div>
      <div className='tile-value'>{props.value}</div>
    </div>
  );
}
