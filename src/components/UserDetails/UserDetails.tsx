import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UserEntity } from 'models/UserEntity';
import Tile from 'components/Tile/Tile';
import './UserDetails.scss';

/**
 *
 * UserDetails Component - Stateful component representing User details
 * (It is stateful only for the purpose of simulating an API call and loading state)
 *
 * @param {UserEntity | undefined} user
 * @return {React.ReactNode}
 * @remarks
 *  Example of usage
 * ```
 *  <UserDetails user={user} />
 * ```
 */
export default function UserDetails({
  user,
}: {
  user: UserEntity | undefined;
}) {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate delay of an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (!user) {
    return (
      <div data-testid='user-details'>
        <div className='details-header'>
          <h2 className='title'>
            {t('PLEASE_SELECT_A_USER_TO_PREVIEW_DETAILS')}
          </h2>
        </div>
      </div>
    );
  }

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

  // Constructing User details subtitle date/location format
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const userCreated = new Date(user.created);
  const userSubtitle = `
    ${userCreated.toLocaleDateString(i18n.language, options)},
    ${userCreated.toLocaleTimeString(i18n.language, { timeStyle: 'short' })} -
    ${user.location}
  `;

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
            <th id='attribute'>{t('ATTRIBUTE')}</th>
            <th id='value'>{t('VALUE')}</th>
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
