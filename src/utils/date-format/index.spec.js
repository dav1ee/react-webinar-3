import dateFormat from './index';

describe('dateFormat', () => {
  test('test1', () => {
    const input = '2024-10-09T11:26:33.408Z';
    const output = '9 октября 2024 г. в 14:26';

    expect(dateFormat(input, 'ru')).toEqual(output);
  });

  test('test2', () => {
    const input = '2024-10-09T08:21:38.637Z';
    const output = 'October 9, 2024 at 11:21 AM';

    expect(dateFormat(input, 'en')).toEqual(output);
  });
});
