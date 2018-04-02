import fp from 'lodash/fp';

export default (str) => {
  const [date, time] = fp.split('T')(str);

  return `${date} ${fp.flow(fp.slice(0, 5), fp.join(''))(time)}`;
};
