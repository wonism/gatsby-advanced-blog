import fp from 'lodash/fp';

const getPage = index => fp.flow(
  fp.get('pathname'),
  fp.split('/'),
  fp.get(index),
  fp.defaultTo('1'),
  fp.toNumber
);

export default getPage;
