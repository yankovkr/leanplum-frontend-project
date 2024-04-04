import { useState, useEffect } from 'react';
import Tile from '../Tile/Tile';
import './UserDetails.scss';
import { UserEntity } from '../../models/UserEntity';

/**
 *
 * UserDetails Component - Stateful component representing User details
 * (It is stateful only for the purpose of simulating an API call and loading state)
 *
 * @param {UserEntity} user
 * @return {React.ReactNode}
 * @remarks
 *  Example of usage
 * ```
 *  <UserDetails user={user} />
 * ```
 */
export default function UserDetails({ user }: { user: UserEntity }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate delay of an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Date format options
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const userCreated = new Date(user.created);
  // Constructing User details subtitle date/location format
  const userSubtitle = `
    ${userCreated.toLocaleDateString('en-US', options)},
    ${userCreated.toLocaleTimeString('en-US', { timeStyle: 'short' })} -
    ${user.location}
  `;

  // Loading details state template
  if (isLoading) {
    return (
      /* The spinner can be extracted as a separete component */
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
      data-testid='user-details'
      id={user.id}
    >
      <div className='details-header'>
        <h2 className='title'>{user.id}</h2>
        <h3
          className='subtitle'
          data-testid='subtitle'
        >
          {userSubtitle}
        </h3>
      </div>
      <div
        className='tile-container'
        data-testid='tile-container'
        role='list'
      >
        <Tile
          title='Devices'
          value={user.devices}
        ></Tile>
        <Tile
          title='Sessions'
          value={user.sessions.length}
        ></Tile>
        <Tile
          title='Events'
          value={user.events}
        ></Tile>
      </div>

      {/* This table can be extracted as a separate component */}
      <table aria-label='Attributes Table'>
        <thead>
          <tr>
            <th id='attribute'>Attribute</th>
            <th id='value'>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(user.attributes).map((key: string) => (
            <tr key={key}>
              <td aria-labelledby='attribute'>{key}</td>
              <td aria-labelledby='value'>{user.attributes[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
