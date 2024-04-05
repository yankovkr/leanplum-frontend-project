// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// i18n tests mock
jest.mock('react-i18next', () => {
  const mockTranslations: { [key: string]: any } = {
    ATTRIBUTE: 'Attribute',
    VALUE: 'Value',
    DEVICES: 'Devices',
    SESSIONS: 'Sessions',
    USERS_IN_AUDIENCE: 'Users in Audience',
    TOTAL_USERS: 'Total Users',
    SHOWING_MATCHING_USERS: 'Showing 2 matching users',
    PLEASE_SELECT_A_USER_TO_PREVIEW_DETAILS:
      'Please select a user to preview details',
  };
  return {
    useTranslation: () => {
      return {
        t: (str: string) => mockTranslations[str],
        i18n: {
          changeLanguage: () => new Promise(() => {}),
          language: 'en',
        },
      };
    },
    initReactI18next: {
      type: '3rdParty',
      init: () => {},
    },
  };
});
