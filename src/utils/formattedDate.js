import { flow, split, slice, join } from 'lodash/fp';

export default (str) => {
  const [date, time] = split('T')(str);

  return `${date} ${flow(slice(0, 5), join(''))(time)}`;
};
